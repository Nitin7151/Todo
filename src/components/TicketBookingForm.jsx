import React, { useState } from 'react';
import React from 'react';
import './TicketBookingForm.css';

const TicketBookingForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tickets, setTickets] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    if (!tickets) {
      newErrors.tickets = 'Number of tickets is required';
    } else if (isNaN(tickets) || tickets <= 0) {
      newErrors.tickets = 'Enter a valid number of tickets';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted');
    }
  };

  return (
<div className="container">
  <h2>Ticket Booking Form</h2>
  <label>
    Name
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </label>
  {errors.name && <span className="error">{errors.name}</span>}
  <label>
    Email
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </label>
  {errors.email && <span className="error">{errors.email}</span>}
  <label>
    Phone Number
    <input
      type="tel"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
    />
  </label>
  {errors.phone && <span className="error">{errors.phone}</span>}
  <label>
    Number of Tickets
    <input
      type="number"
      value={tickets}
      onChange={(e) => setTickets(e.target.value)}
    />
  </label>
  {errors.tickets && <span className="error">{errors.tickets}</span>}
  <button onClick={handleSubmit}>Submit</button>
</div>
  );
};


export default TicketBookingForm;
