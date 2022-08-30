import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'


const SingleStudent = ({ student: { id, village, name, city, district, role, birthday, file }}) => {
	
	return(
	<>
		<Card
			className='shadow'
			border='danger'
		>
			<Card.Body>
				<Card.Title>
					<Row>
						<Col className='col-4 col-sm-2'>
							<Image height={90} roundedCircle={true} width={90} src={file} alt="avatar"/>							
						</Col>
						<Col className='col-8 col-sm-10'>
							<p className='post-title'> Thông tin sinh viên: </p>
							<p className='post-title'> {name}, {birthday}, {village}, {district}, {city}</p>
							<Badge
								pill
								variant='success'
							>
								{role}
							</Badge>
						</Col>
					</Row>
					<Col className='text-right'>
						<ActionButtons id={id} />
					</Col>
				</Card.Title>
				{/* <Card.Text className='font-weight-bolder font-size-16	 ' >Giáo viên: {lastName} {firstName}  </Card.Text> */}

			</Card.Body>
		</Card>
	</>
	)
}

export default SingleStudent