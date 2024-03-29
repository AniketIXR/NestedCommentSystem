import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:3000/api/v1",
    withCredentials: true, // this field is required for cookies to be sent with requests
});

export const makeRequest = async (url: string,options: any) => {
    return api(url, options).then(res => res.data.data).catch(
        err =>{
            return Promise.reject(err?.response?.data?.message || err?.message || "Something went wrong");
        });
};

