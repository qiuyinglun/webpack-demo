import axios from 'axios';

// axios.get('https://jsonplaceholder.typicode.com/todos/1')
//     .then(res => {
//         console.log(res.data)
//     })

// axios.get('/todos/1')
//     .then(res => {
//         console.log(res.data)
//     })

axios.get('/api/todos/1')
    .then(res => {
        console.log(res.data)
    })