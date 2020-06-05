import axios from 'axios'

const RequestMethod =  {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT'
}

export class BaseApi {

    static host = 'https://livedemo.xsolla.com/fe/test-task/baev'

    static url(methodPath) {
        const path = [this.host];
        if (methodPath) {
            path.push(methodPath);
        }
        return path.join("/");
    }

    static Request(methodType, methodPath, args) {
        return new Promise((resolve, reject) => {
        if (methodType === RequestMethod.GET) {
            axios.get(this.url(methodPath))
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        }
        if (methodType === RequestMethod.POST) {
            axios.post(this.url(methodPath), {...args})
                .then(response => {
                    resolve(response)}
                    )
                .catch(error => reject(error))
        }
        if (methodType === RequestMethod.PUT) {
            axios.put(this.url(methodPath), {...args})
                .then(response => {
                    resolve(response)}
                    )
                .catch(error => reject(error))
        }
    })
}

    static Get(methodPath) {
        return this.Request(RequestMethod.GET, methodPath)
    }

    static Post(methodPath, args) {
        return this.Request(RequestMethod.POST, methodPath, args)
    }

    static Put(methodPath, args) {
        return this.Request(RequestMethod.PUT, methodPath, args)
    }

    static createQueryString(obj) {
        if (Object.keys(obj)) {
            let strArr = []
            for (const prop in obj) {
                strArr.push(`${prop}=${obj[prop]}`)
            }
            if (strArr.length) {
                return '?' + strArr.join('&')
            }
        }
        return ''
    }
}