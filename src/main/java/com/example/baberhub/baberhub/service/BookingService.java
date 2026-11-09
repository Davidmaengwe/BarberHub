
package com.example.baberhub.baberhub.service;

import com.example.baberhub.baberhub.entity.Booking;
import com.example.baberhub.baberhub.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    // Constructor
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // Create a new booking
    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    // Get all bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get booking by ID
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    // Update an existing booking
    public Optional<Booking> updateBooking(Long id, Booking updatedBooking) {
        return bookingRepository.findById(id).map(booking -> {

            booking.setCustomerName(updatedBooking.getCustomerName());
            booking.setPhone(updatedBooking.getPhone());
            booking.setService(updatedBooking.getService());
            booking.setBarber(updatedBooking.getBarber());
            booking.setAppointmentDate(updatedBooking.getAppointmentDate());
            booking.setAppointmentTime(updatedBooking.getAppointmentTime());
            booking.setPrice(updatedBooking.getPrice());
            booking.setStatus(updatedBooking.getStatus());

            return bookingRepository.save(booking);
        });
    }

    // Delete a booking
    public boolean deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            return false;
        }

        bookingRepository.deleteById(id);
        return true;
    }
}
