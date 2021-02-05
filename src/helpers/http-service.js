const BASE_URL = "https://reqres.in/api";


const request = (url, options) => {
    url = `${BASE_URL}/${url}`;
    let authToken = sessionStorage.getItem('token');
    options.headers = {
        "Content-Type": "application/json"
    }
    if (authToken) {
        authToken = JSON.parse(authToken)
        options.headers["access_token"] = `${authToken.token}`;
    }
    if (options.body) {
        options.body = JSON.stringify(options.body)
    }
    if (options.method === "DELETE") {
        return fetch(url, options);
    }
    return fetch(url, options).then(response => response.json());
}

const getRequest = (url) => {
    const options = {
        method: "GET",
        headers: {}
    };
    return request(url, options);
}
const postRequest = (url, body) => {
    const options = {
        method: "POST",
        headers: {},
        body
    };
    return request(url, options);
}
const putRequest = (url, body) => {
    const options = {
        method: "PUT",
        headers: {},
        body
    };
    return request(url, options);
}
const deleteRequest = (url, body) => {
    const options = {
        method: "DELETE",
        headers: {}
    };
    return request(url, options);
}
export const httpService = {
    getRequest, postRequest, putRequest, deleteRequest
}