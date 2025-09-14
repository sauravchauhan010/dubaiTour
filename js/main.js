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
