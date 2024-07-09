import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import ContactList from './components/ContactList';
import Chat from './components/Chat';
import IncomingCall from './components/IncomingCall';
import OutgoingCall from './components/OutgoingCall';
import OngoingCall from './components/OngoingCall';

const socket = io.connect('http://localhost:3000');

const App = () => {
  const [activeComponent, setActiveComponent] = useState('chat');
  const [activeContact, setActiveContact] = useState(null);
  const [callStatus, setCallStatus] = useState(null); // null, 'incoming', 'calling', 'ongoing'
  const [callType, setCallType] = useState(null); // 'audio' or 'video'
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState();
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [peer, setPeer] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('incomingCall', (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  const handleContactClick = (contact) => {
    setActiveContact(contact);
    setActiveComponent('chat');
  };

  const handleIncomingCall = (contact, type) => {
    setActiveContact(contact);
    setCallType(type);
    setCallStatus('incoming');
  };

  const handleCallAction = (action) => {
    if (action === 'answer') {
      setCallStatus('ongoing');
      setCallAccepted(true);
      acceptCall();
    } else {
      setCallStatus(null);
      setActiveComponent('chat');
    }
  };

  const handleOutgoingCall = (contact, type) => {
    setActiveContact(contact);
    setCallType(type);
    setCallStatus('calling');
    callUser(contact.id);
  };

  const handleEndCall = () => {
    setCallStatus(null);
    setActiveComponent('chat');
    if (peer) {
      peer.destroy();
    }
  };

  const callUser = (id) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream,
      });
      peer.on('signal', (data) => {
        socket.emit('callUser', { userToCall: id, signal: data, from: socket.id });
      });
      peer.on('stream', (stream) => {
        setStream(stream);
      });
      socket.on('callAccepted', (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });
      setPeer(peer);
    });
  };

  const acceptCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream,
      });
      peer.on('signal', (data) => {
        socket.emit('acceptCall', { signal: data, to: caller });
      });
      peer.on('stream', (stream) => {
        setStream(stream);
      });
      peer.signal(callerSignal);
      setPeer(peer);
    });
  };

  const handleSendMessage = (contact, text) => {
    const newMessage = { sender: 'You', text, contactId: contact.id };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex h-screen">
      <ContactList onContactClick={handleContactClick} />
      <div className="flex-1">
        {callStatus === 'incoming' && (
          <IncomingCall contact={activeContact} callType={callType} onCallAction={handleCallAction} signal={null} />
        )}
        {callStatus === 'calling' && (
          <OutgoingCall contact={activeContact} callType={callType} onCancel={handleEndCall} />
        )}
        {callStatus === 'ongoing' && (
          <OngoingCall contact={activeContact} callType={callType} onEndCall={handleEndCall} stream={stream} />
        )}
        {activeComponent === 'chat' && (
          <Chat contact={activeContact} onCallInitiate={handleOutgoingCall} messages={messages} onSendMessage={handleSendMessage} />
        )}
      </div>
    </div>
  );
};

export default App;
