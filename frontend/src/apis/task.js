import axiosService from '../AxiosService/axiosService';
import {baseURL} from './baseURL';
export const getListTask =()=>{
    return axiosService.get(`${baseURL}/tasks`) 
}
export const filterTask =(keyword)=>{
    return axiosService.get(`/tasks/${keyword}`)
}

export const addTask = (data)=>{
    return axiosService.post('/task', data)
}

export const deleteTask=(data)=>{
return axiosService.delete(`/task/${data}`)
}
export const editTask =(data, taskId)=>{
    return  axiosService.put(`/task/${taskId}`, data)
}