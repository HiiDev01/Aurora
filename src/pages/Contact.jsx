import React from "react";
import "../styles/Contact.css";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Contact Modern Luxury Furniture</h1>
        <p>Your comfort and elegance, our priority.</p>
      </header>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Information</h2>

          <div className="info-item">
            <strong>Phone Number:</strong>
            <p>+234 810 456 7890</p>
          </div>

          <div className="info-item">
            <strong>Email Address:</strong>
            <p>support@modernluxfurniture.com</p>
          </div>

          <div className="info-item">
            <strong>Showroom Address:</strong>
            <p>12 Elegance Street, Victoria Island, Lagos, Nigeria.</p>
          </div>

          <div className="info-item">
            <strong>Working Hours:</strong>
            <p>
              Mon - Fri: 9am - 6pm
              <br />
              Saturday: 10am - 4pm
            </p>
          </div>

          <div className="info-item">
            <strong>Social Media:</strong>
            <p>
              Instagram: @modernluxfurniture
              <br />
              Facebook: Modern Lux Furniture
            </p>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message" rows="6" required></textarea>
            <button type="submit">Submit Message</button>
          </form>
        </div>
      </div>

      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.809791135722!2d3.4172753142910644!3d6.428055026521397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b0d2c0e15d9%3A0x6e6a9e0e57f2b28!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
