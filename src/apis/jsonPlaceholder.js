import axios from 'axios'

export default axios.create({
    // base url only. /posts endpoint will be sent during the api call.
    baseURL:'https://jsonplaceholder.typicode.com',

}
)