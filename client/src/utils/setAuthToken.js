import axios from "axios";


const setAuthToken = token =>{
    // if(token) {
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    // } else {
    //     delete axios.defaults.headers.common['Authorization']
    // }
    if(token) {
        axios.defaults.headers.common['Basic'] = `${token}`
    } else {
        delete axios.defaults.headers.common['Basic']
    }
}

export default setAuthToken