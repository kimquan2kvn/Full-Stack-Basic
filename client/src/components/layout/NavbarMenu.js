import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { Link, NavLink, Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import learnItLogo from '../../assets/logo.svg'
import { useContext,useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { StudentContext } from '../../contexts/StudentContext'
import Dashboard from '../../view/Dashboard'

const NavbarMenu = () => {
	
	const {	authState: {
		user: { lastName }
	},logoutUser} = useContext(AuthContext)

	const logout = () => {
		console.log('Dang xuat')
		logoutUser()
		
	}


	const home = () => {
		console.log('Ve trang tru')
		return(
			<>
				<Route path='/dashboard' component={Dashboard}/>
			</>
			
		)
	}
    return ( 
        <>
        <Navbar expand='lg' bg='success' variant='dark' className='shadow'>

			<Navbar.Brand className='font-weight-bolder text-white'>
				<img
					src={learnItLogo}
					alt='learnItLogo'
					width='32'
					height='32'
					className='mr-2'
					onClick={home}
				/>
				Student System
			</Navbar.Brand>

			<Navbar.Toggle aria-controls='basic-navbar-nav' />

			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>

					{/* <Nav.Link
						className='font-weight-bold text-white'
						to='/class'
						as={Link}
					>
						Class

					</Nav.Link> */}
					{/* <Nav.Link
						className='font-weight-bold text-white'
						to='/form'
						as={Link}
						
					>
						Form
					</Nav.Link> */}
				</Nav>

				<Nav>

					<Nav.Link className='font-weight-bolder text-white' disabled>
						Welcome {lastName}
					</Nav.Link>
					<Button
						variant='danger'
						className='font-weight-bolder text-white'
						
					>
						<img
							src={logoutIcon}
							alt='logoutIcon'
							width='32'
							height='32'
							className='mr-2'
							onClick={logout}
						/>
						Logout
					</Button>
					
				</Nav>
			</Navbar.Collapse>
		</Navbar>
        
        </>
    );
}

export default NavbarMenu;