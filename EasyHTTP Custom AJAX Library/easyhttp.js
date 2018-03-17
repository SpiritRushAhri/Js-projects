// Andrew Fancett 3-6-2018
// Custom api 
// This example will use ES5 will do ES6 as well
function easyHTTP() {
    this.http = new XMLHttpRequest();
}

// GET = Make an HTTP GET request
easyHTTP.prototype.get = function(url, callback) {
    this.http.open('GET', url, true);

    let self = this;
    this.http.onload = function() {
        if(self.http.status === 200){
            callback(null, self.http.responseText);
        }
        else{
            callback('Error: ' + self.http.status);
        }
    }
    this.http.send();
}

// POST = Make an HTTP POST request
easyHTTP.prototype.post = function(url, data, callback) {
    this.http.open('POST', url, true);
    this.http.setRequestHeader('Content-type', 'application/json');

    let self = this;
    this.http.onload = function() {
        callback(null, self.http.responseText);
    }
    // Data is json string
    this.http.send(JSON.stringify(data));
}
// PUT = Make an HTTP PUT request
easyHTTP.prototype.put = function(url, data, callback) {
    this.http.open('PUT', url, true);
    this.http.setRequestHeader('Content-type', 'application/json');

    let self = this;
    this.http.onload = function() {
        callback(null, self.http.responseText);
    }
    // Data is json string
    this.http.send(JSON.stringify(data));
}
// DELETE = Make an HTTP DELETE request
easyHTTP.prototype.delete = function(url, callback) {
    this.http.open('DELETE', url, true);

    let self = this;
    this.http.onload = function() {
        if(self.http.status === 200){
            callback(null, 'This post has been deleted');
        }
        else{
            callback('Error: ' + self.http.status);
        }
    }
    this.http.send();
}