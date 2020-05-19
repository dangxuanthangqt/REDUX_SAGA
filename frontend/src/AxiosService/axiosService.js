
import axios from 'axios';
import * as LocalStorageService from '../Helpers/LocalStorageService';
//import History from '../Helpers/History';
import History from '../Helpers/HistoryVersion2';
import store from '../index';
class axiosService {
    constructor() {
        const instance = axios.create();
        //instance.defaults.headers.common['Authorization'] = "Default";
        instance.interceptors.response.use(this.handlesuccess, this.handleError)
        instance.interceptors.request.use((config)=>{

            try{
                const token = LocalStorageService.getAccessToken();
                console.log("11111111");
                config.headers.Authorization = token ? token : '';
            }catch(e){
                History.push('/login')
            }
            
            return config;

        },
        (err)=>{
            return Promise.reject(err);
        }
        
        )
        this.instance = instance;
    }
    handlesuccess =(res)=>{
            return res
    }
    handleError =async (error)=>{
        const status = error.response ? error.response.status : null;
        const originalRequest = error.config;
        if(status === 401 ){
            let refreshToken = LocalStorageService.getRefreshToken();

            try{
                const accessToken = await this.post('/refresh-token',{refreshToken : refreshToken});
                LocalStorageService.setAccessToken(accessToken.data);
                this.instance.defaults.headers.common['Authorization'] = accessToken;
                console.log("goi lai request")
                return this.instance(originalRequest);
            }
            catch(ERROR){
                console.log("chuyen ve login neu refresh token invalid het han , satus code tra ve 401");
                History.push("/login");
                return Promise.reject(ERROR);
            }
        }
        if(status ===403){
            LocalStorageService.clearAllToken();
             History.push('/login');
             return Promise.reject(error);

        }
        if(status ===500){
            LocalStorageService.clearAllToken();
            History.push('/login');
            return Promise.reject(error.response)
        }
        //    await this.post('/refresh-token',{refreshToken : refreshToken}).then(
        //        (accessToken)=>{
        //         console.log("Get accesstoken successfully !");
        //            LocalStorageService.setAccessToken(accessToken.data)
        //            //store.dispatch({type: "FETCH_LIST_TASK"})
        //             this.instance.defaults.headers.common['Authorization'] = accessToken;
        //            console.log("Da luu accesstoken moi :", accessToken);
                  

        //        }
        //    )
        //    console.log("goi lai request")
        //    return this.instance(originalRequest);
       

        return Promise.reject(error.response)
    }
    get =(url)=>{
        return this.instance.get(url)
    }
    post =(url, data)=>{
        return this.instance.post(url, data);
    }
    delete=(url,id)=>{
        return this.instance.delete(url, id)
    }
    put=(url, data)=>{
        return this.instance.put(url, data)
    }
}
export default new axiosService();