import axios from "axios";

export function get(url, params) {
    return axios.get(url, {
        method: "get",
        baseURL: "http://127.0.0.1:8000",
        params: params,
        timeout: 1000,
        timeoutErrorMessage: "请求超时",
    });
}