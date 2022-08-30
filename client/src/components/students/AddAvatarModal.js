import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import {useContext,useState,useEffect} from 'react'
import { StudentContext } from '../../contexts/StudentContext';
import axios from 'axios';

function AddAvatarModal() {
    const {showAvatarStudentModal, 
        setShowAvatarStudentModal, 
        uploadAvatar,
        studentState:{student}

    }= useContext(StudentContext)
    
    const [updatedAvatarStudent, setUpdatedAvatarStudent] = useState(student)


    const closeDialog =() =>{
        setShowAvatarStudentModal(false)
    }

    const handleChangeFile = (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        axios.post(`http://localhost:1337/student/uploadAvatar/${student.id}`, formData).then((res) => {
            console.log(res)
        })
    }


    return ( 
        <>
            <Modal show={showAvatarStudentModal} animation={false} onHide={closeDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Avatar cho sinh viên</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control type="file" name='file' onChange={(e) => handleChangeFile(e)} />
                    </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={closeDialog}>Close</Button>
                        <Button variant='primary' type='submit' >Save</Button>
                    </Modal.Footer>
                </Form>
        </Modal>
        </>
    );
}

export default AddAvatarModal;