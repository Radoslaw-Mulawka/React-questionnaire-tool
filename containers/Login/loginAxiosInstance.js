import axiosOriginal from 'axios';
import {instance} from './../../conf/axios-conf';




let axios = axiosOriginal.create({
    timeout:3000
})

axios.defaults.headers.common["Authorization"] = "Bearer " + window.localStorage.getItem("client-token");
axios.defaults.headers.common["Authorization"] = "Bearer " + window.localStorage.getItem("token");





  
export default axios;