import { useMutation } from '@apollo/client'
import React from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { ActionsContainer, Button, Text, Text2 } from '../../components/GlobalStyles/TableStyles'
import { CANCEL_BOOKING } from '../../graphql/mutations/bookingMutation'
import { GET_USER_BOOKINGS } from '../../graphql/queries/bookingQueries'
import { getDate } from '../../utils/utilFunctions'
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const CardContainer = styled.div`
    background: white;
    box-shadow: 2px 3px 7px 0px #66666682;
    padding: 14px;
    border-radius: 6px;
    max-width: 100%;

    .details {
        margin-top: 16px;
        
        p {
            text-align: start;
            font-size: 14px;
            color: grey
        }
    }

    .payment-status {
        padding: 6px;
        border-radius: 4px;
        background: #FF0000;
        text-align: start;
        font-size: 14px;
        width: fit-content;
        margin-top: 6px !important;
        color: #fff;

        &.paid{
            background: #1E90FF;
            color: #fff
        }
    }
    
    
`

const BookingCard = (props) => {

    const {
        hotel,
        room,
        from,
        to,
        bookedOn,
        amount,
        paid,
    } = props.data

    const [cancelBooking] = useMutation(CANCEL_BOOKING)

    const handleCancel = () => {
        props.setLoading(true)
        cancelBooking({
            variables: {
                id: props.data.id
            },
            refetchQueries: [
                GET_USER_BOOKINGS,
                { variables: { id: props.data.bookedBy.id } }
            ]
        }).then(res => {
            props.setLoading(false)
            toast.success("Canceled booking.", {
                autoClose: 5500,
                pauseOnHover: true
            })
        }).catch(err => {
            props.setLoading(false)
            toast.error(err.message, {
                autoClose: 5500,
                pauseOnHover: true
            })
        })
    }


    return (
        <CardContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <Text2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{hotel.name},<br/> {hotel.location}</Text2>
                    <Text className={`payment-status ${paid ? 'paid' : ''}`}>{paid ? 'Paid' : 'Not Paid'}</Text>
                </div>
                <ActionsContainer style={{ justifyContent: 'flex-end' }}>
                    <Button style={{ background: '#1E90FF' }}
                        onClick={() => props.setModal({ state: true, param: props.data, title: 'Booking Details' })}>
                        <MoreHorizIcon style={{ color: '#fff' }} />
                    </Button>
                    {!props.isOld && <Button style={{ background: '#1E90FF' }} onClick={handleCancel}><AutoDeleteIcon style={{ color: '#fff' }} /></Button>}
                </ActionsContainer>
            </div>
            <div className='details'>
                <Text>{room.name}</Text>
                <Text>From {getDate(from)} - To {getDate(to)}</Text>
                <Text>Booked On: {getDate(bookedOn)}</Text>
                <Text>Amount:  £{amount}</Text>
            </div>
        </CardContainer>
    )
}

export default BookingCard