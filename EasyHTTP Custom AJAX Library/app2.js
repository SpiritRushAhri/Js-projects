const http = new EasyHTTP;
// user data
const data = {
    name: 'ahri',
    username: 'superstarfox',
    email: 'foxy1@gmail.com'
}

// Get Users
//http.get('https://jsonplaceholder.typicode.com/users')
    //.then(data => console.log(data))
    //.catch(error => console.log(error));

// Create user
//http.post('https://jsonplaceholder.typicode.com/users', data)
    //.then(data => console.log(data))
    //.catch(error => console.log(error));

// Update user
//http.put('https://jsonplaceholder.typicode.com/users/2', data)
    //.then(data => console.log(data))
    //.catch(error => console.log(error));

// Delete user
//http.delete('https://jsonplaceholder.typicode.com/users/2')
    //.then(data => console.log(data))
    //.catch(error => console.log(error));