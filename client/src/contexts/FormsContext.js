import { createContext,useReducer,useState } from "react";
import axios from "axios";
import { formsReducer } from "../reducers/formsReducer";
import { schemaReducer } from "../reducers/schemaReducer";

import {SET_ADD_FORM,SET_SCHEMA_DATA,GET_LIST_SCHEMA_DATA, GET_FORM,apiUrl,FIND_FORM,SET_ADD_DATA_SCHEMA} from '../contexts/constants'
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

export const FormsContext = createContext()

const FormsContextProvider = ({children}) => {
    const [formsState, dispatch] = useReducer(formsReducer,{
        form:{},
        forms: [],
        schemaData:{},
        listSchemaData:[]
    })
    const [showPreForm, setShowPreForm] = useState(false)
    const [schemaTmp, setSchemaTmp]= useState({})
    const [newForm, setNewForm] = useState({
        name: '',
        desc:'',
        listschema: []
    })
    const [newDataForm, setNewDataForm] = useState({
        id:'',
        listschemas: []
    })


    // const [schemaUpdate,dispatch1] = useReducer(schemaReducer,{
    //     schemaFind:{},
    //     listSchemaFind:[],
    // })

    // const [schemaFind,setSchemaFind] = useState('')
    // const [listSchemaFind,setListSchemaFind] = useState([])

    
    // const [newFormUpdate, setNewFormUpdate] = useState({
    //     name: '',
    //     desc:'',
    //     listschema: [{
    //         id:uuidv4(),
    //         nameOfSchema: '',
    //         typeOfWidget: '',
    //         valueOfWidget:[],
    //         dataOfWidget:'',
    //     },]
    // })

    const saveform = async (newForm) => {
        try {
            const response =await axios.post(`${apiUrl}/createform`,newForm)
            console.log(response.data)
            if(response.data.code === 0) {
              console.log(response)
              
            }
        } catch (error) {
            console.log(error)
        }
    }
    const savevalueform = async (newForm,formId) => {
        try {
            const response = await axios.post(`${apiUrl}/savevalueform/${formId}`, newForm)
            console.log(response.data)
            if(response.data.code === 0) {
              console.log(response)
              
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getForm = async () => {
        try {
            const response = await axios.get(`${apiUrl}/listform`)
            console.log(response);
            if(response.data.code === 0) {
                dispatch({
                    type:GET_FORM,
                    payload: response.data.data
                })            
            } 
        } catch (error) {
            console.log(error);
        }
    }

    const findForm = formId => {
        const form = formsState.forms.find(form => form.id === formId)
        // console.log(form)
        dispatch({type: FIND_FORM, payload: form})
    }
    

    const findSchema = (formId,schemID) => {
        const form = formsState.forms.find(form => form.id === formId)
        const schemaUpdate = form.listschema.find(schema => schema.id === schemID)
        // setSchemaFind(schemaUpdate)
        // dispatch({
        //     type:SET_SCHEMA_DATA,
        //     payload:schemaUpdate
        // })
        return schemaUpdate
        // return schemaUpdate
    }


    const formsContextData = {
        newForm,setNewForm,
        formsState, dispatch,
        saveform,getForm,
        showPreForm, setShowPreForm, 
        findForm,findSchema,savevalueform,newDataForm, setNewDataForm,
        schemaTmp, setSchemaTmp
        
        // schemaFind,setSchemaFind,
        // listSchemaFind,setListSchemaFind
    }
    return (
        <FormsContext.Provider value={formsContextData}>
            {children}
        </FormsContext.Provider>
    );
}
export default FormsContextProvider