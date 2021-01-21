import axios, { AxiosPromise } from 'axios'

abstract class APIService {
    getAxiosHeaders(): any {
        return {
            Authorization: '',
            'Content-Type': 'application/json',
        }
    }

    // Axios get method
    get(url: string): AxiosPromise<any> {
        return axios({ method: 'GET', url, headers: this.getAxiosHeaders() })
    }

    post(url: string, data = {}): AxiosPromise<any> {
        return axios({
            method: 'POST',
            url,
            data,
            headers: this.getAxiosHeaders(),
        })
    }

    put(url: string, data = {}): AxiosPromise<any> {
        return axios({
            method: 'PUT',
            url,
            data,
            headers: this.getAxiosHeaders(),
        })
    }

    delete(url: string): AxiosPromise<any> {
        return axios({
            method: 'DELETE',
            url,
            headers: this.getAxiosHeaders(),
        })
    }
}

export default APIService
