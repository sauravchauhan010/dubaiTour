// Existing modal code
function openBookingForm() {
    document.getElementById('bookingForm').style.display = 'flex';
}

function closeBookingForm() {
    document.getElementById('bookingForm').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('bookingForm');
    if(event.target == modal) {
        modal.style.display = "none";
    }
}

// ---------------------------
// New translation function
async function translatePage(targetLang = 'hi') {
    const elements = document.querySelectorAll('[data-translate]');

    for (let el of elements) {
        const text = el.innerText;
        const translated = await fetchTranslation(text, targetLang);
        el.innerText = translated;
    }
}

async function fetchTranslation(text, targetLang) {
    const apiKey = "YOUR_API_KEY"; // Replace with your Google Translate API key
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text, target: targetLang })
    });

    const data = await response.json();
    return data.data.translations[0].translatedText;
}

// Example: translate page to Hindi when user clicks a button
document.getElementById('translateBtn').addEventListener('click', () => {
    translatePage('hi'); // 'hi' = Hindi
});
