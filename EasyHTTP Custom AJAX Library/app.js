// Andrew Fancett 3-6-2018
// Test various functions of the easy http api that was created
const http = new easyHTTP;

// GET posts
http.get('https://jsonplaceholder.typicode.com/posts', function(error, posts){
    if(error){
        console.log(error);
    }
    else{
        console.log(posts);    
    }
});
// GET single post
http.get('https://jsonplaceholder.typicode.com/posts/1', function(error, posts){
    if(error){
        console.log(error);
    }
    else{
        console.log(posts);    
    }
});
// Create Data
const data = {
    title: 'Ahri is the best champ',
    body: 'Ahri Ahri Ahri Ahri Ahri Ahri...'
};
// Create POST request
http.post('https://jsonplaceholder.typicode.com/posts', data, function(error, posts){
    if(error){
        console.log(error);
    }
    else{
        console.log(posts);    
    }
});
// Update post with PUT request
http.put('https://jsonplaceholder.typicode.com/posts/1', data, function(error, posts){
    if(error){
        console.log(error);
    }
    else{
        console.log(posts);    
    }
});
// DELETE post
http.delete('https://jsonplaceholder.typicode.com/posts/1', function(error, response){
    if(error){
        console.log(error);
    }
    else{
        console.log(response);    
    }
});