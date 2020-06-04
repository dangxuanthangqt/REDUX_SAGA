import axiosService from '../AxiosService/axiosService';
export const registerRequest =(data)=>{
    return axiosService.post('/auth/signUp', data);
}
export const registerRequestCheck =(email)=>{
    return axiosService.post('/register/check-exist-account', {email:email})
}