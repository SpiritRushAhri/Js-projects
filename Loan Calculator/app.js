// Andrew Fancett 2-26-2018

// listen for submit button
document.querySelector('#loan-form').addEventListener('submit',function(e){
  // Hide results
  document.querySelector('#results').style.display = 'none';
  // Show loader gif as soon as clicked
  document.querySelector('#loading').style.display = 'block';
  // show loading for 1.5 seconds
  setTimeout(calculateResults, 1500);

  // prevent form submit behavior
  e.preventDefault();
});

// Calculate results function
function calculateResults(){
  // Define UI variables
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  // Calculation
  const principal = parseFloat(amount.value); // parse float because we need decimal value
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);
  // check if monthly is finite
  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(4);
    totalPayment.value = (monthly * calculatedPayments).toFixed(4);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(4);
    // Set the results to visible
    document.querySelector('#results').style.display = 'block';
    // Hide loading gif
    document.querySelector('#loading').style.display = 'none';
  }
  else{
    // Error, check numbers
    // Build show error alert
    showError('Please check your number inputs.');
  }
}

// Show error function
function showError(error){
  // Hide results
  document.querySelector('#results').style.display = 'none';
  // Hide loading gif
  document.querySelector('#loading').style.display = 'none';
  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // Create div
  const errorDiv = document.createElement('div');
  // Add class
  errorDiv.className = 'alert alert-danger';
  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 2 seconds
  setTimeout(clearError, 2000);
}
// Clear error function
function clearError(){
  document.querySelector('.alert').remove();
}
