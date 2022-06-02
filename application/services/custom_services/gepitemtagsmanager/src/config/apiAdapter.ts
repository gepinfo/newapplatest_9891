import * as fetch from 'node-fetch';

export class ApiAdapter {

    post = (url, data) => {
        return new Promise((resolve, reject) => {
            let res;
            fetch(url, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then((response) => {
                res = response;
                response.json().then((data) => {
                    this.sendResponse(resolve, reject, res, data, null);
                })
            }).catch(error => {
                this.sendResponse(resolve, reject, null, null, error);
            })
        });
    }

    get = (url) => {
        return new Promise((resolve, reject) => {
            let res;
            fetch(url).then(response => {
                res = response;
                response.json().then((data) => {
                    this.sendResponse(resolve, reject, res, data, null);
                })
            }).catch(error => {
                this.sendResponse(resolve, reject, null, null, error);
            })
        });
    }

    put = (url, data) => {
        return new Promise((resolve, reject) => {
            let res;
            fetch(url, { method: 'PUT', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then( response => {
                res = response;
                response.json().then((data) => {
                    this.sendResponse(resolve, reject, res, data, null);
                })
            }).catch(error => {
                this.sendResponse(resolve, reject, null, null, error);
            })
        });
    }

    delete = (url) => {
        return new Promise((resolve, reject) => {
            let res;
            fetch(url, {method: 'DELETE'}).then((response) => {
                res = response;
                response.json().then(data => {
                    this.sendResponse(resolve, reject, res, data, null);
                })
            }).catch(error => {
                this.sendResponse(resolve, reject, null, null, error);
            })
        });
    }

    private sendResponse = (resolve, reject, response, body, error) => {
        if (response !== null) {
            if (response.status === 200) {
                resolve({
                    body,
                    code: response.status,
                    message: " request has succeeded"
                });
            } else if (response.status === 201) {
                resolve({
                    response,
                    code: response.status,
                    message: "request has succeeded and a new resource has been created"
                });
            } else if (response.status === 202) {
                resolve({
                    response,
                    code: response.status,
                    message: "request has been received but not yet acted upon"
                });
            } else if (response.statusCode === 203) {
                resolve({
                    response,
                    code: response.status,
                    message: "non authoritative info"
                });
            } else if (response.status === 204) {
                resolve({
                    response,
                    code: response.status,
                    message: "no conent"
                });
            } else if (response.status === 205) {
                resolve({
                    response,
                    code: response.status,
                    message: "reset content"
                });
            } else if (response.status === 206) {
                resolve({
                    response,
                    code: response.status,
                    message: "partial content"
                });
            } else if (response.status === 400) {
                reject({
                    code: response.status,
                    message: "bad request"
                });
            } else if (response.status === 401) {
                reject({
                    code: response.status,
                    message: "unauthorized"
                });
            } else if (response.status === 402) {
                reject({
                    code: response.status,
                    message: "Payment Required"
                });
            } else if (response.status === 403) {
                reject({
                    code: response.status,
                    message: "forbidden"
                });
            } else if (response.status === 404) {
                reject({
                    code: response.status,
                    message: "not found"
                });
            } else if (response.status === 405) {
                reject({
                    code: response.status,
                    message: "method not allowed"
                });
            } else if (response.status === 406) {
                reject({
                    code: response.status,
                    message: "not acceptable"
                });
            } else if (response.status === 407) {
                reject({
                    code: response.status,
                    message: "proxy authentication required"
                });
            } else if (response.status === 408) {
                reject({
                    code: response.status,
                    message: "request timeout"
                });
            } else if (response.status === 500) {
                reject({
                    code: response.status,
                    message: "internal server error"
                });
            } else if (response.status === 501) {
                reject({
                    code: response.status,
                    message: "request method is not supported by the server and cannot be handled"
                });
            } else if (response.status === 502) {
                reject({
                    code: response.status,
                    message: "bad request"
                });
            } else if (response.status === 503) {
                reject({
                    code: response.status,
                    message: "service available"
                });
            } else if (response.status === 504) {
                reject({
                    code: response.status,
                    message: "gateway timeout"
                });
            } else if (response.status === 505) {
                reject({
                    code: response.status,
                    message: "HTTP version used in the request is not supported by the server"
                });
            } else {
                reject(error);
            }
        } else {
            if (error.port !== undefined && response.port !== null) {

                let errormsg = {
                    error: "Microservice Down",
                    service_port: error.port,
                };
                console.error(errormsg)
                reject(errormsg);
            }
        }
    }

}
