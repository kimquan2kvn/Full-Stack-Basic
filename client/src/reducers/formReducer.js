import {SET_ADD_SCHEMA, ADD_SCHEMA,SET_ADD_DATA_SCHEMA} from '../contexts/constants'
export const formReducer =  (state,action) => {
    const {type,payload} = action
    switch(type) {
        case SET_ADD_SCHEMA:
            return{
                ...state,
                schema: action.payload
            }
        case SET_ADD_DATA_SCHEMA:
            return{
                ...state,
                schema: [...state.schema,action.payload]
            }
        case ADD_SCHEMA:
            return{
                ...state,
                schemas: [...state.schemas, action.payload]
            }
        default:
            return state
    }
}