import {STUDENT_LOADED_SUCCESS, STUDENT_LOADED_FAIL, ADD_STUDENT, DELETE_STUDENT, FIND_STUDENT, UPDATE_STUDENT,UPLOAD_AVATAR, apiUrl} from '../contexts/constants'

export const studentReducer = (state,action) => {
    const {type,payload} = action
    switch(type) {
        case STUDENT_LOADED_SUCCESS:
            return {
                ...state,
                students: payload,
                studentsLoading: false
            }

        case STUDENT_LOADED_FAIL:
            return {
                ...state,
                students: [],
				studentsLoading: false
            }
        
        case ADD_STUDENT: 
            return {
                ...state,
                students: [...state.students,action.payload]
            }
        
        case DELETE_STUDENT:
            return {
                ...state,
                students: state.students.filter(student => student.id !== action.payload)
            }
        
        case FIND_STUDENT:
            return{
                ...state, student:action.payload
            }

    
        case UPDATE_STUDENT:


            const newStudents = state.students.map(student =>
                student.id === action.payload.id ? (action.payload) : (student) 

            )
            return {
                ...state,
                students: newStudents
            }

        
        default:
            return state
        
    }
}