// Open the booking form modal
function openBookingForm() {
    document.getElementById('bookingForm').style.display = 'flex';
}

// Close the booking form modal
function closeBookingForm() {
    document.getElementById('bookingForm').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('bookingForm');
    if(event.target == modal) {
        modal.style.display = 'none';
    }
}

// Free translation function
async function translateTextFree(text, targetLang = 'hi') {
    const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await response.json();
    return data[0].map(item => item[0]).join('');
}

// Toggle translate / original
let translated = false;
document.getElementById('translateBtn').addEventListener('click', async () => {
    const elements = document.querySelectorAll('[data-translate]');
    
    if (!translated) {
        // Translate to Hindi
        for (let el of elements) {
            if (!el.dataset.original) el.dataset.original = el.innerText;
            el.innerText = await translateTextFree(el.innerText, 'hi');
        }
        translated = true;
        document.getElementById('translateBtn').innerText = 'Show Original';
    } else {
        // Restore original text
        elements.forEach(el => {
            if (el.dataset.original) el.innerText = el.dataset.original;
        });
        translated = false;
        document.getElementById('translateBtn').innerText = 'Translate to Hindi';
    }
});
