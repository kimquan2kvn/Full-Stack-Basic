import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, Route, useHistory, Redirect } from 'react-router-dom';
import React, { useState, useContext,useEffect} from 'react';
import {AuthContext} from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage';

function LoginForm() {
    // Context
    const {authState,loginUser} = useContext(AuthContext);
    let history = useHistory();
    //Local State
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
    const [alert, setAlert] = useState(null)

    const {email,password} = loginForm
    const onChangeLoginForm = event => 
    setLoginForm({...loginForm, [event.target.name]:event.target.value})


    const login = async event =>{
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            console.log(loginData)
            if(loginData.code !== 0){
                setAlert({type: 'danger', message: loginData.data})
                setTimeout(()=> setAlert(null),5000)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return ( 
        <>
            <Form className='my-4' onSubmit={login}>
                <AlertMessage info={alert}/>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='text-light'>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required value={email} onChange={onChangeLoginForm}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='text-light'>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required value={password} onChange={onChangeLoginForm}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Đăng nhập
                </Button>
            </Form>

            <p> Bạn chưa có tài khoản?
                <Link to='/register'>
                <Button variant="link" size='sm' className='ml-2'>Đăng kí</Button>{' '}
                </Link>
            </p>
        </>


     );
}

export default LoginForm;