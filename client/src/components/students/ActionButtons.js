import Button from 'react-bootstrap/Button'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import userIcon from '../../assets/person-circle.svg'
import { StudentContext } from '../../contexts/StudentContext'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios'


function ActionButtons({id}) {
    const {deleteStudent, findStudent,setShowUpdateStudentModal,showAvatarStudentModal, uploadAvatar,setShowAvatarStudentModal } = useContext(StudentContext)

    const chooseStudent = studentId => {
        setShowUpdateStudentModal(true)
        findStudent(studentId)
    }
    
    const chooseAvatarStudent = studentId => {
        setShowAvatarStudentModal(true)
        findStudent(studentId)
    }

    const {	authState: {
		user: { lastName,firstName }
	}} = useContext(AuthContext)

    return ( 
        <>
        <p className='ml-3'>Giáo viên: {lastName} {firstName}  </p>
        <Button className='post-button'>
        <img src={userIcon} alt='edit' width='24' height='24' onClick={chooseAvatarStudent.bind(this,id)}/>
        </Button>
        
        <Button className='post-button'>
        <img src={editIcon} alt='edit' width='24' height='24' onClick={chooseStudent.bind(this,id)}/>
        </Button>
        
        <Button className='post-button' onClick={deleteStudent.bind(this,id)}>
            <img src={deleteIcon} alt='delete' width='24' height='24' />
        </Button>
        </>
    );
}

export default ActionButtons;