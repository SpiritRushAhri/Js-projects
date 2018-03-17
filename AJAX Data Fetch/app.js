// Andrew Fancett 3-6-2018
// Simple joke generator using ajax to fetch data from an external api
document.querySelector('.get-jokes').addEventListener('click', getJokes);

//
function getJokes(e) {
    const number = document.querySelector('input[type="number"]').value;
    // instantiate new xhr object
    const xhr = new XMLHttpRequest();
    // fetching the jokes from api
    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

    xhr.onload = function() {
        if(this.status === 200){
            // Given json string, need to parse 
            const response = JSON.parse(this.responseText);
            console.log(response);

            let output = '';
            if(response.type === 'success'){
                response.value.forEach(function(joke){
                    output += `<li>${joke.joke}</li>`;
                })
            }
            else{
                output += '<li>Something went wrong. T-T</li>';
            }
            document.querySelector('.jokes').innerHTML = output;
        }
    }
    xhr.send();

    e.preventDefault();
}