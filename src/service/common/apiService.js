import axiosInstance from '@/service/common/axiosInstance';

// 通用的 GET 请求方法
export async function get(url, params){
    const response = await axiosInstance.get(url, { params });
    return response.data;
}

// 通用的 POST 请求方法
export async function post(url, data){
    const response = await axiosInstance.post(url, data);
    return response.data;
}

// 通用的 PUT 请求方法
export async function put(url, data){
    const response = await axiosInstance.put(url, data);
    return response.data;
}

// 通用的 DELETE 请求方法
export async function del(url){
    const response = await axiosInstance.delete(url);
    return response.data;
}