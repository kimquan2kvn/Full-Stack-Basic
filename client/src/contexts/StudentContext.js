import {createContext, useReducer, useState} from 'react'
import { studentReducer } from '../reducers/studentReducer'
import {STUDENT_LOADED_SUCCESS, STUDENT_LOADED_FAIL, ADD_STUDENT, DELETE_STUDENT, FIND_STUDENT, UPDATE_STUDENT,UPLOAD_AVATAR, apiUrl} from './constants'
import axios from 'axios'

export const StudentContext = createContext()

const StudentContextProvider = ({children}) => {
    const [studentState, dispatch] = useReducer(studentReducer,{
        student:null,
        students: [],
        studentsLoading: true
    })

const [showAddStudentModal, setShowAddStudentModal] = useState(false)
const [showUpdateStudentModal, setShowUpdateStudentModal] = useState(false)
const [showAvatarStudentModal, setShowAvatarStudentModal] = useState(false)
const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null
})

// get all students
const getStudents = async () => {
    try {
        const response = await axios.get(`${apiUrl}/listStudent`)
        console.log(response);
        if(response.data.code === 0) {
            dispatch({
                type:STUDENT_LOADED_SUCCESS,
                payload: response.data.data
            })            
        } 
    } catch (error) {
        dispatch({ type: STUDENT_LOADED_FAIL })
    }
}
// add student

const addStudent = async newStudent => {
    try {
        const response = await axios.post(`${apiUrl}/createStudent/`,newStudent)

        if(response.data.code === 0){
            console.log(response)
            dispatch({
                type:ADD_STUDENT,
                payload: response.data.data
            })
            return response.data
        }
        console.log(response)        
    } catch (error) {
        return error.response.data ? error.response.data: {success: false, message: 'Server error'}
    }
}

// delete student

const deleteStudent = async studenId=> {
    try {
        const response = await axios.delete(`${apiUrl}/student/${studenId}`)
        if(response.data.code === 0 ){
            dispatch({
                type: DELETE_STUDENT,
                payload: studenId
            })
        }
    } catch (error) {
        console.log(error);
    }

    
}


// Find student when user is updating post
const findStudent = studentId => {
    const student = studentState.students.find(student => student.id === studentId)
    dispatch({ type: FIND_STUDENT, payload: student })
}


const updateStudent = async (updatedStudent)=>{
    try {
        const response = await axios.post(`${apiUrl}/editStudent/${updatedStudent.id}`, updatedStudent)
        if(response.data.code === 0) {
            dispatch({
                type: UPDATE_STUDENT,
                payload: response.data.data
            })
            return response.data
        }

    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error' }
    }
}

const studentContextData = {
    studentState, 
    updateStudent,
    deleteStudent,
    getStudents,
    addStudent,
    showAddStudentModal,
    setShowAddStudentModal,
    showUpdateStudentModal,
    findStudent,
    setShowUpdateStudentModal,
    showAvatarStudentModal,
    setShowAvatarStudentModal,
    
    showToast,
    setShowToast
}

return ( 
    <StudentContext.Provider value={studentContextData}>
        {children}
    </StudentContext.Provider>
)
}
export default StudentContextProvider