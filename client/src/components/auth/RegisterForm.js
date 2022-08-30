import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Route, useHistory } from 'react-router-dom';
import React, { useState, useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage';

function RegisterForm() {
    const {registerUser} = useContext(AuthContext);
    
    const [registerForm, setRegisterForm] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        passwordConfirm:''
    })
    
    const [alert,setAlert] = useState(null)

    const {firstName,lastName,email,password,passwordConfirm} = registerForm

    const onChangeRegisterForm = event => {
        setRegisterForm({
            ...registerForm, [event.target.name]: event.target.value
        })
    }

    const register = async event =>{
        event.preventDefault() 

        if(password !== passwordConfirm) {
            setAlert({type:'danger', message: 'Passwords do not match'})
            setTimeout(()=>setAlert(null), 5000)
            return
        }   

        try {
            const registerData = await registerUser(registerForm)
            
            if(!(registerData.code === 0)) {
                setAlert({ type: 'danger', message: 'Error' })
				setTimeout(() => setAlert(null), 5000)
            } else {
          
                setAlert({ type: 'success', message: 'Đăng ký thành công' })
				setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log(error)
        }

    }


    return( 
        <>  
            <Form className='my-4' onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label></Form.Label>
                    <Form.Control type="text" name='firstName' placeholder="Enter First Name" onChange={onChangeRegisterForm}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label></Form.Label>
                    <Form.Control type="text" name='lastName' placeholder="Enter Last Name" onChange={onChangeRegisterForm}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label></Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" onChange={onChangeRegisterForm}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label></Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" onChange={onChangeRegisterForm}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label></Form.Label>
                    <Form.Control type="password" name='passwordConfirm' placeholder="Confirm Password" onChange={onChangeRegisterForm}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Đăng kí
                </Button>
            </Form>

            <p> Bạn đã có tài khoản?
                <Link to='/login'>
                <Button variant="link" size='sm' className='ml-2'>Đăng nhập</Button>{' '}
                </Link>
            </p>
        </>
     );
}
export default RegisterForm;
