
// Form Blur event listeners
document.querySelector('#name').addEventListener('blur', validateName);
document.querySelector('#zip').addEventListener('blur', validateZip);
document.querySelector('#email').addEventListener('blur', validateEmail);
document.querySelector('#phone').addEventListener('blur', validatePhone);

function validateName() {
    const name = document.querySelector('#name');
    // Regular Expression to check input
    const re = /^[a-z][A-Z]{2,10}$/;
    if(!re.test(name.value)){
        name.classList.add('is-invalid'); 
    }
    else{
        name.classList.remove('is-invalid');
    }
}

function validateZip() {
    const zip = document.querySelector('#zip');
    // Regular Expression to check input
    const re = /^[0-9]{5}(-[0-9]{4})?$/;
    if(!re.test(zip.value)){
        zip.classList.add('is-invalid'); 
    }
    else{
        zip.classList.remove('is-invalid');
    }    
}

function validateEmail() {
    const email = document.querySelector('#email');
    // Regular Expression to check input
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(!re.test(email.value)){
        email.classList.add('is-invalid'); 
    }
    else{
        email.classList.remove('is-invalid');
    }    
}

function validatePhone() {
    const phone = document.querySelector('#phone');
    // Regular Expression to check input
    const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
    if(!re.test(phone.value)){
        phone.classList.add('is-invalid'); 
    }
    else{
        phone.classList.remove('is-invalid');
    }  
}