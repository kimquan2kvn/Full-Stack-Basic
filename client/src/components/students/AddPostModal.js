import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useState } from 'react';
import { StudentContext } from '../../contexts/StudentContext';

function AddPostModal() {
    // context
    const {showAddStudentModal, 
        setShowAddStudentModal,
        addStudent,
        showToast,setShowToast }= useContext(StudentContext)


    // State
    const [newStudent, setNewStudent] = useState({
        name:'',
        birthday:'',
        city:'',
        district:'',
        village:'',
        role:'student',
    })
        
    const closeDialog = () => {
        resetAddStudentData()
    }
    
    const resetAddStudentData = () => {
        setNewStudent({
            name:'',
            birthday:'',
            city:'',
            district:'',
            village:'',
            role:'student',
            file:''
        })
        setShowAddStudentModal(false)
    }


    const {name,birthday,city,district,village} = newStudent

    const onChangeNewStudentForm = event => setNewStudent({...newStudent, [event.target.name]: event.target.value})
    
    const onSubmit = async event => {
        event.preventDefault()
        console.log(newStudent)
        const {code, message} = await addStudent(newStudent)
        resetAddStudentData()
        setShowToast({show: true, message:'Thêm sinh viên thành công', type: 'success'})
        window.location.reload(false)
    }

    return (
        <Modal show={showAddStudentModal} animation={false} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Nhập thông tin sinh viên</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Tên Sinh Viên</Form.Label>
                        <Form.Control type="text" placeholder=" Nhập Tên Sinh Viên" name='name' required aria-describedby='title-help' 
                        value={name} onChange={onChangeNewStudentForm}/>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Năm Sinh</Form.Label>
                        <Form.Control type="text" placeholder="Nhập Năm Sinh" name='birthday' required 
                        value={birthday} onChange={onChangeNewStudentForm}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Tỉnh</Form.Label>
                        <Form.Control type="text" placeholder="Nhập Tỉnh" name='city' required 
                        value={city} onChange={onChangeNewStudentForm}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Huyện</Form.Label>
                        <Form.Control type="text" placeholder="Nhập Huyện" name='district' required 
                        value={district} onChange={onChangeNewStudentForm}

                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Xã</Form.Label>
                        <Form.Control type="text" placeholder="Nhập Xã" name='village' required 
                        value={village} onChange={onChangeNewStudentForm}
                        />
                    </Form.Group>


                </Modal.Body>
            

            <Modal.Footer>
                <Button variant='secondary' onClick={closeDialog}>Close</Button>
                <Button variant='primary' type='submit' >Save</Button>
            </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddPostModal;