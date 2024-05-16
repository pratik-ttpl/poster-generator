import axios from 'axios'
axios.defaults.withCredentials = true

class DataService {

    constructor() {
        this._baseUrl = process.env.REACT_APP_BACKEND_LOCAL_URL
    }

    get(relativeUrl, config = {}) {
        try {
            return axios.get(this._generateUrl(relativeUrl), config)
        }
        catch (error) {
            console.error(error)
            throw error
        }
    }

    post(relativeUrl, data = null, config = {}) {
        const headers = {
            Authorization: `Bearer AQVD0IsXdPov8NrRWIL1sX62Hv9ls7v756JZO_cyWsYBFAHCX8pEUpbQwiVL661hwAitwwluHhSvIh8xnBwRNs5YrZZHvVWt1UUiO4x98hy9nLiUULRNusrF4m7-_tgjwZK-AXm0on_Oe98jzRRBESMeQbvCmVuuahCwYQ7X-O-RN_U6taOlmpY9LQEdz-vF15CKsuoqxU9FAIajZt3UK58_M8KgdNsheDRmTBNCbBrzoeUyeuZp-FBY5jqnwpmjrE-X6194769ctT1ak-kZczLgIfTlPQH0lVnP18-snvYDsVjQc6ZIXca7peJgPrtmxlizq_8ZVtsOSUnp31oXey5UNYr3lQ`,
        };
        const updatedConfig = {
            ...config,
            headers,
        };
        try {
            return axios.post(this._generateUrl(relativeUrl), data, updatedConfig)
        }
        catch (error) {
            console.error(error)
            throw error
        }
    }

    put(relativeUrl, data = null, config = {}) {
        try {
            return axios.put(this._generateUrl(relativeUrl), data, config)
        }
        catch (error) {
            console.error(error)
            throw error
        }
    }

    patch(relativeUrl, data = null, config = {}) {
        try {
            return axios.patch(this._generateUrl(relativeUrl), data, config)
        }
        catch (error) {
            console.error(error)
            throw error
        }
    }

    delete(relativeUrl, data = null, config = {}) {
        try {
            if (data)
                return axios.delete(this._generateUrl(relativeUrl), { data: data }, config)
            else return axios.delete(this._generateUrl(relativeUrl), config)
        }
        catch (error) {
            console.error(error)
            throw error
        }
    }

    setCommonHeader(key, value) {
        axios.defaults.headers.common[key] = value
    }

    setBaseUrl(baseUrl) {
        this._baseUrl = baseUrl
    }

    _generateUrl(relativeUrl) {
        return `${this._baseUrl}/${relativeUrl}`
    }

}

export default DataService