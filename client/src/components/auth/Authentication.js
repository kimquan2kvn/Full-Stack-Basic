import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, Route, useHistory, Redirect,useParams } from 'react-router-dom';
import React, { useState, useLocation,useEffect} from 'react';
import {AuthContext} from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage';
import axios from 'axios';
import { apiUrl } from '../../contexts/constants';
import success from "../../assets/success.png";
import Image from 'react-bootstrap/Image';
    
// class Authentication extends React.Component {
//     let userId = this.props.match.params.id;
//     console.log(userId)
//     render() {
//         <h1 className='landing'></h1>
//     }
//    }

const Authentication = () => {
    let { id } = useParams();
    const [verified, setVerified] = useState(false)
    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const response = await axios.get(`${apiUrl}/authentication/user/active/${id}`)
                console.log(response)
                setVerified(true)
            } catch (error) {
                console.log(error)
                setVerified(false)
            }
        }
        verifyEmailUrl()}, [id]);

    return (
		<>
			{verified ? (
                <div class='landing'>
                    <div className="dark-overlay">
                        <div className="landing-inner">
                            <img src={success} alt="success_img"/>
                            <h1>Email verified successfully</h1>
                            <Link to="/login">
                                <Button variant='success'>Login</Button>
                            </Link>
                    </div>
                </div>
            </div>


			) : (
				<h1>404 Not Found</h1>
			)}
		</>
	);
}

export default Authentication;