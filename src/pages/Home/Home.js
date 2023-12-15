import React, { useContext, useEffect } from 'react'
import HomeBG from "../../assets/home.jpg"
import styled from "styled-components"
import { GlobalContext } from '../../utils/Context'
import { PageContainer, Text } from '../../components/GlobalStyles/PageStyles'
import SearchBox from '../../components/SearchBox/SearchBox'
import TravelImg from "../../assets/travel.png"

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 999;
    background-image: url('https://res.cloudinary.com/dsnontai6/image/upload/v1702557500/pexels-donald-tong-189296_szyhvd.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    position: relative;
    border-radius: 0 0;

    @media(max-width: 700px) {
        padding: 16px
    }
`
const ImgContainer = styled.div`
    margin: auto;
    display: flex;
    align-items: center;
    justify-conent: center;
    margin-top: 0px;

    img{
        width: 100%
    }
`

const Home = () => {
    const { setPage } = useContext(GlobalContext)

    useEffect(() => {
        setPage("Home")
    }, [])

    return (
        <PageContainer style={{
            minHeight: '100vh',
            marginTop: '0px',
            padding: '0px',
            background: '#faebd7'
        }}>
            <HomeContainer>
                <SearchBox styles={{
                    position: 'absolute',
                    top: '250px',
                    background: '#fff',
                    margin: '0 16px'
                }} />
            </HomeContainer>

            {/* <ImgContainer>
                <img src="https://res.cloudinary.com/dsnontai6/image/upload/v1702560801/pexels-pixabay-261169_plv8gb.jpg" alt="/" loading='lazy'></img>
            </ImgContainer> */}

        </PageContainer>
    )
}

export default Home
