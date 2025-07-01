import React, { useState } from "react";

// TelegramForm component: handles a contact form and sends the message to a secure backend
export default function TelegramForm() {
  // State for form fields (name, email, message)
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  // State for status message (feedback to user)
  const [status, setStatus] = useState("");

  // Handle input changes and update form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setStatus("Sending..."); // Show sending status
    // Format the message to be sent
    const text = `New portfolio contact\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`;
    try {
      // Use relative URL so the frontend proxy can route to backend
      const resp = await fetch("/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (resp.ok) {
        // If successful, reset form and show success message
        setStatus("Message sent!");
        setForm({ name: "", email: "", message: "" });
      } else {
        // If backend returns error
        setStatus("Error while sending.");
      }
    } catch (err) {
      // If network error occurs
      setStatus("Network error.");
    }
  };

  // Render the contact form
  return (
    <form className="telegram-form" onSubmit={handleSubmit} style={{marginTop: 32}}>
      {/* Name input field */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      {/* Email input field */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <br />
      {/* Message textarea */}
      <textarea
        name="message"
        placeholder="Your message"
        value={form.message}
        onChange={handleChange}
        required
        rows={4}
      />
      {/* Submit button */}
      <button type="submit">Send</button>
      {/* Status message (success, error, etc.) */}
      {status && <div className="telegram-form-status">{status}</div>}
    </form>
  );
}
