import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createPeer } from '../utils/webrtc/webrtc';

const IncomingCall = ({ contact, callType, onCallAction, signal }) => {
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const videoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: callType === 'video', audio: true })
      .then(stream => {
        setStream(stream);
        const newPeer = createPeer(false, stream, handleSignal, handleStream);
        newPeer.signal(signal);
        setPeer(newPeer);
      });
  }, []);

  const handleSignal = (data) => {
    onCallAction('signal', data);
  };

  const handleStream = (remoteStream) => {
    if (videoRef.current) {
      videoRef.current.srcObject = remoteStream;
    }
  };

  const handleAnswer = () => {
    onCallAction('answer', peer);
  };

  const handleReject = () => {
    onCallAction('reject');
  };

  return (
    <div className="flex flex-col h-full justify-center items-center p-4">
      <div className="text-center">
        <div className="font-semibold text-lg">{contact.name}</div>
        <div className="text-sm text-gray-500">{callType} call incoming...</div>
      </div>
      {callType === 'video' && (
        <video ref={videoRef} autoPlay playsInline className="mt-4" />
      )}
      <div className="flex space-x-4 mt-4">
        <button className="p-2 bg-green-500 text-white rounded-full" onClick={handleAnswer}>
          <i className="fas fa-phone"></i> Answer
        </button>
        <button className="p-2 bg-red-500 text-white rounded-full" onClick={handleReject}>
          <i className="fas fa-phone-slash"></i> Reject
        </button>
      </div>
    </div>
  );
};

IncomingCall.propTypes = {
  contact: PropTypes.object.isRequired,
  callType: PropTypes.string.isRequired,
  onCallAction: PropTypes.func.isRequired,
  signal: PropTypes.object.isRequired,
};

export default IncomingCall;
