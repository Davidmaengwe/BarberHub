
// ===============================
// BARBERHUB - BOOKING SYSTEM
// ===============================

// Get the booking form and message area
const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

// Connect to our Spring Boot backend
const API_URL = "http://localhost:8080/api/bookings";


// ===============================
// SET MINIMUM APPOINTMENT DATE
// ===============================

const dateInput = document.getElementById("appointmentDate");

if (dateInput) {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const todayDate = `${year}-${month}-${day}`;

    dateInput.min = todayDate;
}


// ===============================
// SUBMIT BOOKING
// ===============================

bookingForm.addEventListener("submit", async function (event) {

    // Stop the page from refreshing
    event.preventDefault();

    // Get values from the form
    const customerName = document.getElementById("customerName").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const serviceSelect = document.getElementById("service");

    const service = serviceSelect.value;

    const barber = document.getElementById("barber").value;

    const appointmentDate = document.getElementById("appointmentDate").value;

    const appointmentTime = document.getElementById("appointmentTime").value;


    // Get the selected service price
    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];

    const price = Number(selectedOption.dataset.price);


    // ===============================
    // BASIC VALIDATION
    // ===============================

    if (
        !customerName ||
        !phone ||
        !service ||
        !barber ||
        !appointmentDate ||
        !appointmentTime
    ) {
        bookingMessage.textContent = "Please fill in all fields.";
        return;
    }

    if (!Number.isFinite(price) || price <= 0) {
        bookingMessage.textContent = "Please select a valid service.";
        return;
    }


    // ===============================
    // CREATE BOOKING OBJECT
    // ===============================

    const bookingData = {

        customerName: customerName,

        phone: phone,

        service: service,

        barber: barber,

        appointmentDate: appointmentDate,

        appointmentTime: appointmentTime + ":00",

        price: price,

        status: "PENDING"

    };


    // ===============================
    // SEND BOOKING TO BACKEND
    // ===============================

    try {

        bookingMessage.textContent = "Submitting your booking...";

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(bookingData)

        });


        // Check whether the request succeeded
        if (!response.ok) {

            const errorText = await response.text();

            throw new Error(errorText || "Booking could not be completed.");

        }


        // Get the saved booking from the backend
        const savedBooking = await response.json();


        // Display success message
        bookingMessage.textContent =
            `Booking successful! Your booking ID is ${savedBooking.id}.`;

        bookingMessage.style.color = "#4CAF50";


        // Clear the form
        bookingForm.reset();


    } catch (error) {

        console.error("Booking error:", error);

        bookingMessage.textContent =
            "Unable to submit booking. Please check your connection and try again.";

        bookingMessage.style.color = "#ff5555";

    }

});
