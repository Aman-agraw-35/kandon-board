import React from 'react';

const TicketList = ({ tickets = [], users = [], groupBy = 'status', orderBy = 'priority' }) => {
  
  // Helper function to sort tickets
  const sortTickets = (ticketArray) => {
    if (!ticketArray) return []; // Ensure the array is valid
    if (orderBy === 'priority') {
      return ticketArray.sort((a, b) => b.priority - a.priority); // Descending order by priority
    } else if (orderBy === 'title') {
      return ticketArray.sort((a, b) => a.title.localeCompare(b.title)); // Ascending order by title
    }
    return ticketArray;
  };

  // Group tickets by status
  const groupByStatus = () => {
    const statusGroups = {
      Todo: [],
      'In Progress': [],
      Done: [],
    };

    tickets.forEach((ticket) => {
      if (ticket.status === 'Todo') statusGroups.Todo.push(ticket);
      if (ticket.status === 'In progress') statusGroups['In Progress'].push(ticket);
      if (ticket.status === 'Backlog') statusGroups.Done.push(ticket);
    });

    return statusGroups;
  };

  // Group tickets by priority
  const groupByPriority = () => {
    const priorityGroups = {
      4: [], // Urgent
      3: [], // High
      2: [], // Medium
      1: [], // Low
      0: [], // No priority
    };

    tickets.forEach((ticket) => {
      if (priorityGroups[ticket.priority] !== undefined) {
        priorityGroups[ticket.priority].push(ticket);
      }
    });

    return priorityGroups;
  };

  // Group tickets by user
  const groupByUser = () => {
    const userGroups = users.reduce((acc, user) => {
      acc[user.name] = [];
      return acc;
    }, {});

    tickets.forEach((ticket) => {
      const user = users.find((u) => u.id === ticket.userId);
      if (user) {
        userGroups[user.name].push(ticket);
      }
    });

    return userGroups;
  };

  // Mapping priority numbers to readable names
  const priorityLabels = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority'
  };

  // Determine how to group the tickets
  let groupedTickets = {};
  let columns = [];

  if (groupBy === 'status') {
    groupedTickets = groupByStatus();
    columns = ['Todo', 'In Progress', 'Done'];
  } else if (groupBy === 'priority') {
    groupedTickets = groupByPriority();
    columns = ['Urgent', 'High', 'Medium', 'Low', 'No priority'];
  } else if (groupBy === 'user') {
    groupedTickets = groupByUser();
    columns = users.map((user) => user.name);
  }

  // Render tickets by group and sorting them
  return (
    <div className="ticket-list">
      <div className="columns">
        {columns.map((column, index) => (
          <div key={index} className="column">
            <h3>{column}</h3>
            {groupBy === 'priority'
              ? sortTickets(groupedTickets[Object.keys(priorityLabels).find(key => priorityLabels[key] === column)] || []).map((ticket) => (
                  <div key={ticket.id} className="ticket">
                    <h4>{ticket.title}</h4>
                    <p>{`Priority: ${ticket.priority}`}</p>
                  </div>
                ))
              : sortTickets(groupedTickets[column] || []).map((ticket) => (
                  <div key={ticket.id} className="ticket">
                    <h4>{ticket.title}</h4>
                    <p>{`Priority: ${ticket.priority}`}</p>
                  </div>
                ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;
