import axiosService from '../AxiosService/axiosService';
import {baseURL} from './baseURL';
export const getListTask =()=>{
    return axiosService.get(`${baseURL}/tasks`) 
}
export const filterTask =(keyword)=>{
    return axiosService.get(`/tasks/${keyword}`)
}

export const addTask = (data)=>{
    return axiosService.post('/tasks', data)
}

export const deleteTask=(data)=>{
return axiosService.delete(`/tasks/${data}`)
}
export const editTask =(data)=>{
    return  axiosService.put('/tasks/', data)
}