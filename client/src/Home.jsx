import React, { useState } from "react";
import ContactList from "./components/ContactList";
import Chat from "./components/Chat";
import IncomingCall from "./components/IncomingCall";
import OutgoingCall from "./components/OutgoingCall";
import OngoingCall from "./components/OngoingCall";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("chat");
  const [activeContact, setActiveContact] = useState(null);
  const [callStatus, setCallStatus] = useState(null); // null, 'incoming', 'calling', 'ongoing'
  const [callType, setCallType] = useState(null); // 'audio' or 'video'

  const handleContactClick = (contact) => {
    setActiveContact(contact);
    setActiveComponent("chat");
  };

  const handleIncomingCall = (contact, type) => {
    setActiveContact(contact);
    setCallType(type);
    setCallStatus("incoming");
  };

  const handleCallAction = (action) => {
    if (action === "answer") {
      setCallStatus("ongoing");
    } else {
      setCallStatus(null);
      setActiveComponent("chat");
    }
  };

  const handleOutgoingCall = (contact, type) => {
    setActiveContact(contact);
    setCallType(type);
    setCallStatus("calling");
  };

  const handleEndCall = () => {
    setCallStatus(null);
    setActiveComponent("chat");
  };

  return (
    <div className="flex h-screen">
      <ContactList onContactClick={handleContactClick} />
      <div className="flex-1">
        {callStatus === "incoming" && (
          <IncomingCall
            contact={activeContact}
            callType={callType}
            onCallAction={handleCallAction}
          />
        )}
        {callStatus === "calling" && (
          <OutgoingCall
            contact={activeContact}
            callType={callType}
            onCancel={handleEndCall}
          />
        )}
        {callStatus === "ongoing" && (
          <OngoingCall
            contact={activeContact}
            callType={callType}
            onEndCall={handleEndCall}
          />
        )}
        {activeComponent === "chat" && (
          <Chat
            contact={activeContact}
            onCallInitiate={handleOutgoingCall}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
