import { useParams } from "react-router-dom";
import { makeRequest } from "./makeRequest";

export const getPosts = async () => {
    // console.log("getPosts");
    return makeRequest("/posts", { method: "GET" });
};

export const getPost=(id: String)=>{
    return makeRequest(`/posts/${id}`,{method:"GET"});
}