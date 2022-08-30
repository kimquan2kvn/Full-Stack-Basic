import { createContext,useReducer,useEffect,useState } from "react";
import axios from 'axios'
import { authReducer } from "../reducers/authReducer";
import {LOCAL_STORAGE_TOKEN_NAME, apiUrl} from './constants';
import setAuthToken from "../utils/setAuthToken";
import { Redirect,Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext()
/*
 Context
 1. Create context
 2. Provider(ở component cha)
 3. Consumer(ở component con)

*/


const AuthContextProvider = ({children}) =>{
    let history = useHistory()
    const initialState = {
        authLoading: true,
        isAuthenticated: false,
        user:null,
    };
    const [authState, dispatch] = useReducer(authReducer, initialState)
    const [verified, setVerified] = useState(false)


// //Resgister Verify  
// const verifyUser = async() =>{
//     try {
//         const response = await axios.get(`${apiUrl}/authentication/user/active/${param.id}`)
//         console.log(response)
//         setVerified(true)
//     } catch (error) {
//         console.log(error)
//         setVerified(false)
//     }
// }

//Authenticate 
const loadUser = async () => {

    if(localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
         setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
         try {
        
            const response = await axios.get(`${apiUrl}/checkAuth`)
            if(response.data.code === 0) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: response.data.data
                    }
                })
            }
            
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null }
            })
        }
    }       


    console.log(authState); 
}

useEffect(() => loadUser(), [])
const loginUser = async useForms => {
    try {
        const response = await axios.post(`${apiUrl}/users/login`, useForms)
        if(response.data.code === 0) {
            console.log('login');

            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.token.token);

            await loadUser()
            return response.data

        }
        return response.data

    } catch (error) {
        if(error.response.data) return error.response.data
        return {success:false, message: error.message}
    }
}

// register
const registerUser = async useForm => {
    try {
        const response = await axios.post(`${apiUrl}/users/register`, useForm)
        console.log(response);
        if(response.data.code === 0) {
            console.log(response.data);
            return response.data
        }
    } catch (error) {
        if(error.response.data) return error.response.data
        else return {success:false, message: error.message}
    }
}
 
const logoutUser = () =>{
    // const response = await axios.get(`${apiUrl}/users/logout`)
    // if(response.data.code === 0){
    //     return response.data
    // }
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
    dispatch({
        type:'SET_AUTH',
        payload: { isAuthenticated: false, user: null }
    })
    console.log('logout')
    window.location.replace("http://localhost:3000/login");

    return (
        <>  
            <Route>
                <Redirect to='/login' />
            </Route>
            
        </>
    )
    
    // <Route>
    //     <Redirect to='/login' />
    // </Route>
}

// Context data
const authContextData = {loginUser, registerUser, logoutUser, authState};

// Return provider
return (
    <AuthContext.Provider value={authContextData}>
        {children}
    </AuthContext.Provider>
);

}
export default AuthContextProvider