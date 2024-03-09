document.addEventListener("DOMContentLoaded", function() {
    // Simulate loading time
    setTimeout(function() {
      // Hide preloader
      document.querySelector('.preloader').style.display = 'none';
      // Show content
      document.querySelector('.content').style.display = 'block';
    }, 1000); // Adjust time as needed
  });

// Declare qrcode as a global constant
const qrcode = new QRCodeStyling();


// Function to reset all input fields and QR code
function resetFields() {
    // Reset input fields to their default values
    document.getElementById('qr-text').value = '';
    document.getElementById('sizes').value = '100';
    document.getElementById('image').value = '';
    document.getElementById('dot-color').value = '#000000';
    document.getElementById('bg-color').value = '#FFFFFF';
    document.getElementById('margin').value = '0';
    document.getElementById('dot-type').value = 'square';
    document.getElementById('corner-square-type').value = 'square';
    document.getElementById('corner-dot-type').value = 'square';
    document.getElementById('corners-dot-color').value = '#000000';
    document.getElementById('corners-square-color').value = '#000000';

    // Clear QR code from display
    const qrbody = document.querySelector('.qr-body');
    qrbody.innerHTML = '';

    // Create a new instance of QRCodeStyling
    qrcode = new QRCodeStyling();

    // Generate QR code with default settings
    generateQR();
}

// Add event listener to reset button
document.getElementById('resetbtn').addEventListener('click', resetFields);

// Function to generate QR code
function generateQR() {

    //TEXT / URL
    var text = document.getElementById('qr-text').value;
    var size = document.getElementById('sizes').value;
    var imageUrlInput = document.getElementById('image');
    var dotColor = document.getElementById('dot-color').value;
    var bgColor = document.getElementById('bg-color').value;
    var margin = document.getElementById('margin').value;
    var dotType = document.getElementById('dot-type').value;
    var cornerSquareType = document.getElementById('corner-square-type').value;
    var cornerDotType = document.getElementById('corner-dot-type').value;
    var cornersDotColor = document.getElementById('corners-dot-color').value;
    var cornersSquareColor = document.getElementById('corners-square-color').value;

    // Check if an image file is selected
    var imageUrl;
    if (imageUrlInput.files.length > 0) {
        var file = imageUrlInput.files[0];
        imageUrl = URL.createObjectURL(file);
    } else {
        // If no image file is selected, set imageUrl to null
        imageUrl = null;
    }

    // Update QR code styling
    qrcode.update({
        width: size,
        height: size,
        type: "svg",
        data: text,
        image: imageUrl,
        dotsOptions: {
            color: dotColor,
            type: dotType
        },
        backgroundOptions: {
            color: bgColor,
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: margin
        },
        cornersSquareOptions: {
            type: cornerSquareType,
            color: cornersSquareColor
        },
        cornersDotOptions: {
            type: cornerDotType,
            color: cornersDotColor
        }
    });

    // Clear any existing QR code
    const qrbody = document.querySelector('.qr-body');
    qrbody.innerHTML = '';

    // Append the updated QR code to the container
    qrcode.append(qrbody);
}

// Add event listeners to input fields to automatically update QR code
document.getElementById('qr-text').addEventListener('input', generateQR);
document.getElementById('sizes').addEventListener('input', generateQR);
document.getElementById('image').addEventListener('change', generateQR);
document.getElementById('dot-color').addEventListener('input', generateQR);
document.getElementById('bg-color').addEventListener('input', generateQR);
document.getElementById('margin').addEventListener('input', generateQR);
document.getElementById('dot-type').addEventListener('input', generateQR); // Listen for changes in dot type
document.getElementById('corner-square-type').addEventListener('input', generateQR); // Listen for changes in corner square type
document.getElementById('corner-dot-type').addEventListener('input', generateQR); // Listen for changes in corner dot type
document.getElementById('corners-dot-color').addEventListener('input', generateQR);
document.getElementById('corners-square-color').addEventListener('input', generateQR);



// Function to handle QR code download
document.getElementById('downbtn').addEventListener('click', function() {
    qrcode.download({ name: "qr", extension: "png" });
});


// Generate QR code initially
generateQR();
