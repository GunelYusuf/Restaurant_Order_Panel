import  axios  from "axios";


const sleep = () => new Promise(resolve => setTimeout(resolve, 500));
axios.defaults.baseURL = 'http://localhost:3004/';
const responseBody = (response) => response.data;


const  requests ={
    get:(url)=>axios.get(url).then(responseBody),
    post:(url,body)=>axios.post(url,body).then(responseBody),
    put:(url,body)=>axios.put(url,body).then(responseBody),
    delete:(url)=>axios.delete(url).then(responseBody)
}

const Order = {
    list: () => requests.get('orders'),
    ById:(id) => requests.get(`orders/${id}`),
    create:(values) => requests.post('orders',values),
    update:(id,value) => requests.put(`orders/${id}`,value),
    delete:(id) => requests.delete(`orders/${id}`)
}

const Waiters = {
    list : () => requests.get('waiters'),
    ById:(id) => requests.get(`waiters/${id}`),
    create:(values) => requests.post('waiters',values),
}

const Tables = {
    list : () => requests.get('tables'),
    ById:(id) => requests.get(`tables/${id}`),
    create:(values) => requests.post('tables',values),
}
const Meals = {
    list :() => requests.get('meals'),
    ById:(id) => requests.get(`meals/${id}`),
    create:(values) => requests.post('meals',values),
}

const httpAgent = {
    Order,
    Waiters,
    Meals,
    Tables
}

export default httpAgent;


