import { createContext,useReducer,useState } from "react";
import axios from "axios";
import { formReducer } from "../reducers/formReducer";
import {SET_ADD_SCHEMA, ADD_SCHEMA} from '../contexts/constants'
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

export const FormContext = createContext()

const FormContextProvider = ({children}) => {
    const [schemaState, dispatch] = useReducer(formReducer,{
        schema:{},
        schemas: [],
    })
 

    const [nameForm, setNameForm] = useState('')
    const [description, setDescription] = useState("");
    const [nameSchema, setNameShema]  = useState();
    const [showAddSchema, setShowAddSchema]= useState(false)
    const [ouputOptions, setOuputOptions] = useState();
    const [typeOfInput, setTypeOfInput] = useState("");
    const [addSelect, setaddSelect] = useState([{ name: "" }]);
    // const [addCheckBox, setAddCheckBox] = useState([{ name: "" }])

    const [newSchema,setNewSchema] = useState([{
        id:uuidv4(),
        nameOfSchema: '',
        typeOfWidget: '',
        valueOfWidget:[],

    },])
    

    const { schema, schemas } = schemaState;

    


    
    // const addSchema = () => {
    //     dispatch({
    //         type: ADD_SCHEMA,
    //         payload: newSchema
    //     })
    // }
      
    console.log(schemas)
    
    const formContextData = {
        showAddSchema, setShowAddSchema, 
        nameForm, setNameForm,
        description,setDescription,
        ouputOptions,setOuputOptions,
        schemaState,dispatch,

        nameSchema,setNameShema,
        typeOfInput,setTypeOfInput,
        addSelect, setaddSelect,
        // addCheckBox, setAddCheckBox,
        newSchema,setNewSchema
        
        
    };


    return (
        <FormContext.Provider value={ formContextData }>
            {children}
        </FormContext.Provider>
    );
}

export default FormContextProvider