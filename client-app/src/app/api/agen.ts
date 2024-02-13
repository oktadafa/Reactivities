import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activities";

axios.defaults.baseURL = "http://localhost:5000/api/"

const responseBody =<T>(response : AxiosResponse<T>) => response.data;

const sleep = (delay:number) =>{
  return new Promise(resolve => {
    setTimeout(resolve,delay)
  })
}

axios.interceptors.response.use(async response => {
  try {
    await  sleep(1000);
    return response;
  } catch (error) {
    console.log(error); 
    return await Promise.reject(error)
  }

  })

const request = {
    get : <T>(url:string) => axios.get<T>(url).then(responseBody),
    post : <T>(url:string,body:{}) => axios.post<T>(url,body).then(responseBody),
    put : <T>(url:string, body :{}) => axios.put<T>(url,body).then(responseBody),
    del: <T>(url:string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
  list: () => request.get<Activity[]>("activities"),
  details: (id: string) => request.get<Activity>(`activities/${id}`),
  create: (activity: Activity) =>
    request.post<void>("activities/tambah", activity),
  update: (activity: Activity) =>
    request.put<void>(`Activities/edit/${activity.id}`, activity),
  delete: (id: string) => request.del<void>(`activities/delete/${id}`),
};

export const agent = {
    Activities
}