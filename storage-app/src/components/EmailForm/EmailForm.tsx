import React, { useState } from 'react';
import './EmailForm.css'
import axios from 'axios';

interface EmailFormProps {
  emailEndpoint: string; // Server-side API endpoint to send the email
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const EmailForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();

    // Send the form data to the server-side endpoint
    axios.post( `http://localhost:${process.env.REACT_APP_URL}/user/sendEmail`, 
    formData)
      .then(response => {
        if (response) {
          // Email sent successfully, perform any desired actions (e.g., show a success message)
          console.log('Email sent successfully');
        } else {
          // Handle the error case (e.g., show an error message)
          console.error('Failed to send email');
        }
      })
      .catch(error => {
        // Handle any network or server errors
        console.error('Error occurred while sending the email:', error);
      });
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className='mainForm'>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} required></textarea>

        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default EmailForm;