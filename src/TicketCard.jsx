import React from 'react';
import './TicketCard.css';

const Ticket = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        <img
          src="images.png"
          alt="User Avatar"
          className="ticket-avatar"
        />
      </div>
      <h3 className="ticket-title">{ticket.title}</h3>
      <div className="ticket-footer">
        <div>{ticket.userId}</div>
        
        <div className="ticket-icon">!</div>
        <div className="ticket-label">{ticket.tag || 'Feature Request'}</div>
      </div>
      <div>{ticket.status}</div>
    </div>
  );
};

export default Ticket;