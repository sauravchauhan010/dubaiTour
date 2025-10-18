// Open the booking form modal
function openBookingForm() {
    document.getElementById('bookingForm').style.display = 'flex';
}

// Close the booking form modal
function closeBookingForm() {
    document.getElementById('bookingForm').style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('bookingForm');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// ---------------------------
// Free translation function using Google Translate web endpoint
async function translateTextFree(text, targetLang = 'hi') {
    const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await response.json();
    return data[0].map(item => item[0]).join('');
}

// Example usage: translate a sample text
translateTextFree("Hello, how are you?", "hi").then(translated => {
    console.log(translated); // Outputs Hindi translation
});
