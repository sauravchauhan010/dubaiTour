// Open Booking Modal
function openBookingForm() {
    document.getElementById("BookingForm").style.display = "block";
}

// Close Booking Modal
function closeBookingForm() {
    document.getElementById("BookingForm").style.display = "none";
}

// Fade In Element
function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = "block";
    let op = 0;
    let timer = setInterval(() => {
        if (op >= 1) clearInterval(timer);
        element.style.opacity = op;
        op += 0.05;
    }, 20);
}

// Fade Out Element
function fadeOut(element) {
    let op = 1;
    let timer = setInterval(() => {
        if (op <= 0) {
            clearInterval(timer);
            element.style.display = "none";
        }
        element.style.opacity = op;
        op -= 0.05;
    }, 20);
}

// Show/Hide Loading Overlay
function showLoading() {
    const overlay = document.getElementById("loadingOverlay");
    if (overlay) overlay.style.display = "flex";
}

function hideLoading() {
    const overlay = document.getElementById("loadingOverlay");
    if (overlay) overlay.style.display = "none";
}

// Handle Booking Form Submission (single listener)
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookingFormForm");
    const thankYou = document.getElementById("thankYouMessage");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();  // ✅ prevent default submission

        // Show loading overlay
        showLoading();

        fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => response.json())
        .then(() => {
            // Hide loading overlay
            hideLoading();

            // Show thank-you popup
            if (thankYou) {
                fadeIn(thankYou);
                setTimeout(() => fadeOut(thankYou), 5000);
            }

            // Close modal shortly after
            setTimeout(() => closeBookingForm(), 300);

            // Reset form
            form.reset();
        })
        .catch(error => {
            hideLoading();
            alert("Something went wrong. Please try again.");
            console.error("Booking Error:", error);
        });
    });
});
