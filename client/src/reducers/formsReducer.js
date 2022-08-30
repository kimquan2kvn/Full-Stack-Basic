import {SET_ADD_FORM, GET_FORM,GET_LIST_SCHEMA_DATA, FIND_FORM,SET_SCHEMA_DATA,SET_ADD_DATA_SCHEMA} from '../contexts/constants'

export const formsReducer =  (state,action) => {
    const {type,payload} = action
    switch(type) {
        case SET_ADD_FORM:
            return{
                ...state,
                form: action.payload
            }
        case GET_FORM:
            return{
                ...state,
                forms: payload
            }
        case FIND_FORM:
            return{
                ...state, form:action.payload
            }


        case SET_SCHEMA_DATA:
            return{
                ...state, schemaData:action.payload
            }
        
        case GET_LIST_SCHEMA_DATA:
            return{
                ...state, 
                listSchemaData:[...state.listSchemaData, action.payload]
            }

        default:
            return state
    }
}