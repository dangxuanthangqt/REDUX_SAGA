import AxiosService from '../AxiosService/axiosService';

export const login=(data)=>{
    return AxiosService.post('/login',data)
}