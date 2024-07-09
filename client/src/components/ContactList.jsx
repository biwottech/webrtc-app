import React, { useState } from "react";
import PropTypes from "prop-types";

const contacts = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Melissa James",
    email: "melissa.james@example.com",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Jeff Groves",
    email: "jeff.groves@example.com",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Casey Stoner",
    email: "casey.stoner@example.com",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Catherine Stone",
    email: "catherine.stone@example.com",
    avatar: "https://via.placeholder.com/150",
  },
  // Add more contacts as needed
];

const incomingCalls = [
  {
    id: 1,
    name: "Andrea Stella",
    email: "andrea.stella@example.com",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Marco Minneman",
    email: "marco.minneman@example.com",
    avatar: "https://via.placeholder.com/150",
  },
  // Add more incoming calls as needed
];

const ongoingCalls = [
  {
    id: 1,
    name: "Jeff Higgins",
    email: "jeff.higgins@example.com",
    avatar: "https://via.placeholder.com/150",
  },
  // Add more ongoing calls as needed
];

const ContactList = ({ onContactClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-1/4 bg-gray-100 p-4 border-r overflow-y-auto">
      <h2 className="font-semibold text-lg mb-4">Contacts</h2>
      <input
        type="text"
        placeholder="Search contacts..."
        className="w-full p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <h3 className="font-semibold text-md mb-2">Incoming Calls</h3>
      <ul className="mb-4">
        {incomingCalls.map((call) => (
          <li
            key={call.id}
            className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
          >
            <img
              src={call.avatar}
              alt={call.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <div className="font-semibold">{call.name}</div>
              <div className="text-sm text-gray-500">{call.email}</div>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="font-semibold text-md mb-2">Ongoing Calls</h3>
      <ul className="mb-4">
        {ongoingCalls.map((call) => (
          <li
            key={call.id}
            className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
          >
            <img
              src={call.avatar}
              alt={call.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <div className="font-semibold">{call.name}</div>
              <div className="text-sm text-gray-500">{call.email}</div>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="font-semibold text-md mb-2">All Contacts</h3>
      <ul>
        {filteredContacts.map((contact) => (
          <li
            key={contact.id}
            className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
            onClick={() => onContactClick(contact)}
          >
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <div className="font-semibold">{contact.name}</div>
              <div className="text-sm text-gray-500">{contact.email}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  onContactClick: PropTypes.func.isRequired,
};

export default ContactList;
