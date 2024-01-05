// script.js

document.addEventListener('DOMContentLoaded', function () {
    const spinnerItems = document.querySelectorAll('.spinnerItem');
    let currentIndex = 0;
  
    function changePhoto() {
      spinnerItems.forEach(item => item.classList.remove('active'));
      currentIndex = (currentIndex + 1) % spinnerItems.length;
      spinnerItems[currentIndex].classList.add('active');
    }
  
    // Change the active photo every 2 seconds (adjust the time as needed)
    setInterval(changePhoto, 3500);
  });

  document.getElementById('showDirections').addEventListener('click', function() {
    // Check if Geolocation is supported
    if (navigator.geolocation) {
        // Get user's current location
        navigator.geolocation.getCurrentPosition(function(position) {
            var userLocation = position.coords.latitude + ',' + position.coords.longitude;

            // Get the destination coordinates from the iframe src
            var destination = "-34.90650559571809, -58.51483858929742"; // Replace with actual values

            // Open Google Maps with directions
            window.open('https://www.google.com/maps/dir/?api=1&origin=' + userLocation + '&destination=' + destination, '_blank');
        }, function(error) {
            console.error('Error getting user location:', error);
            alert('Error getting your location. Please try again or enter it manually.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});

  var countDownDate = new Date("Nov 22, 2024 00:00:00").getTime();

  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown").style.display = "none";
      document.getElementById("expired-message").innerHTML = "EXPIRED";
    }
  }, 1000);

  /* document.addEventListener("DOMContentLoaded", function () {
    // Show the pop-up after a delay (e.g., 5 seconds)
    setTimeout( */function openPopup() {
        document.getElementById("popupContainer").style.display = "block";
    }/* , 5000);
}); */

function closePopup() {
    document.getElementById("popupContainer").style.display = "none";
}

document.getElementById("confirmationForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Collect form data
  const formData = new FormData(event.target);

  console.log('FormData:',formData)

  // Make an asynchronous request to the Flask endpoint
  fetch('/submit', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      // Handle the response data as needed
      console.log('ResponseData:',data);
      alert(data.message);  // You can customize this based on your needs
  })
  .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
  
  });
  
  document.getElementById("confirmationForm").reset();
});

