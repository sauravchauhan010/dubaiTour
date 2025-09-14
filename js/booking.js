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

// Handle Booking Form Submission
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookingFormForm");
    const thankYou = document.getElementById("thankYouMessage");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => response.json())  // Works if Google Script returns JSON
        .then(() => {
            // Close the booking modal
            closeBookingForm();

            // Show thank-you popup with fade-in
            if (thankYou) {
                fadeIn(thankYou);

                // Fade out after 5 seconds
                setTimeout(() => {
                    fadeOut(thankYou);
                }, 5000);
            }

            // Reset the form
            form.reset();
        })
        .catch(error => console.error("Booking Error:", error));
    });
});
function showLoading() {
    const overlay = document.getElementById("loadingOverlay");
    if (overlay) overlay.style.display = "flex";
}

function hideLoading() {
    const overlay = document.getElementById("loadingOverlay");
    if (overlay) overlay.style.display = "none";
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookingFormForm");
    const thankYou = document.getElementById("thankYouMessage");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // ✅ Add loading overlay **here, BEFORE fetch()**
        showLoading();

        fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => response.json())
        .then(() => {
            // ✅ Hide loading overlay after submission succeeds
            hideLoading();

            // Show thank-you popup
            if (thankYou) {
                fadeIn(thankYou);
                setTimeout(() => fadeOut(thankYou), 5000);
            }

            // Close modal
            setTimeout(() => closeBookingForm(), 300);

            // Reset form
            form.reset();
        })
        .catch(error => {
            hideLoading(); // hide loading even if error
            alert("Something went wrong. Please try again.");
            console.error("Booking Error:", error);
        });
    });
});
