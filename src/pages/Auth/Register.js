import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../graphql/mutations/userMutations';
import { GlobalContext } from '../../utils/Context';
import { AuthContainer, ButtonsContainer, FormContainer } from './ModuleStyles';
import { FormButton, FormTitle, Input, InputContainer } from '../../components/GlobalStyles/FormStyles';
import { useNavigate } from 'react-router-dom';
import { PageContainer3 } from '../../components/GlobalStyles/PageStyles';
import Loader from "../../components/Loaders/Loader.js"
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const { setPage } = useContext(GlobalContext)

    useEffect(() => {
        setPage('Register')
    }, [])

    const navigate = useNavigate()

    const [createUser] = useMutation(REGISTER_USER)

    const [info, setInfo] = useState({
        name: '',
        username: '',
        email: '',
        dob: new Date(),
        password: ''
    })

    const [loading, setLoading] = useState(false)

    const register = (e) => {
        e.preventDefault()
        setLoading(true)
        createUser({
            variables: {
                name: info.name,
                username: info.username,
                email: info.email,
                password: info.password,
                dob: info.dob
            }
        })
            .then(res => {
                const user = res.data.createUser
                localStorage.setItem('user', JSON.stringify(user))
                setTimeout(() => {
                    user.isManager ?
                        window.location.href = '/' :
                        window.location.href = '/'
                }, 1000);
            })
            .catch(err => {
                setLoading(false)
                toast.error(err.message, {
                    autoClose: 5500,
                    pauseOnHover: true
                })
            })
    }

    return (
        <PageContainer3>
            <AuthContainer>
                {!loading ? (
                    <FormContainer>
                        <form className="form-box" onSubmit={register}>
                            <FormTitle style={{ marginBottom: '20px', textAlign: 'center' }}>Register</FormTitle>
                            <label>Full Name</label>
                            <Input style={{ margin: '10px 0' }}
                                placeholder="Name"
                                value={info.name}
                                onChange={(e) => setInfo({ ...info, name: e.target.value })}></Input>
                            <label>Username</label>
                            <Input style={{ margin: '10px 0' }}
                                placeholder="Username"
                                value={info.username}
                                onChange={(e) => setInfo({ ...info, username: e.target.value })}></Input>
                            <label>Email</label>
                            <Input style={{ margin: '10px 0' }}
                                placeholder="Email"
                                value={info.email}
                                onChange={(e) => setInfo({ ...info, email: e.target.value })}></Input>
                            <label>Date of Birth</label>
                            <InputContainer style={{ marginRight: '16px', marginTop: '10px', marginBottom: '10px' }}>
                                <DatePicker selected={info.dob}
                                    onChange={(date) => setInfo({ ...info, dob: date })} />
                            </InputContainer>
                            <label>Password</label>
                            <Input style={{ margin: '10px 0' }}
                                placeholder="Password"
                                type="password"
                                value={info.password}
                                onChange={(e) => setInfo({ ...info, password: e.target.value })}></Input>
                            <ButtonsContainer>
                                <FormButton style={{ border: '2px solid #1E90FF', background: "#fff", color: "#1E90FF" }}
                                    onClick={() => navigate('/login')}
                                >Log In</FormButton>
                                <FormButton type="submit">Register</FormButton>
                            </ButtonsContainer>
                        </form>
                    </FormContainer>
                ) : <Loader />}
            </AuthContainer>
        </PageContainer3>
    )
}

export default Register
