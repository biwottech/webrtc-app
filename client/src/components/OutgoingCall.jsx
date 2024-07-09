import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createPeer } from '../utils/webrtc/webrtc';

const OutgoingCall = ({ contact, callType, onCancel }) => {
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const videoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: callType === 'video', audio: true })
      .then(stream => {
        setStream(stream);
        const newPeer = createPeer(true, stream, handleSignal, handleStream);
        setPeer(newPeer);
      });
  }, []);

  const handleSignal = (data) => {
    // Send the signal to the other peer (through signaling server)
  };

  const handleStream = (remoteStream) => {
    if (videoRef.current) {
      videoRef.current.srcObject = remoteStream;
    }
  };

  const handleCancel = () => {
    peer.destroy();
    onCancel();
  };

  return (
    <div className="flex flex-col h-full justify-center items-center p-4">
      <div className="text-center">
        <div className="font-semibold text-lg">{contact.name}</div>
        <div className="text-sm text-gray-500">{callType} call outgoing...</div>
      </div>
      {callType === 'video' && (
        <video ref={videoRef} autoPlay playsInline className="mt-4" />
      )}
      <div className="flex space-x-4 mt-4">
        <button className="p-2 bg-red-500 text-white rounded-full" onClick={handleCancel}>
          <i className="fas fa-phone-slash"></i> Cancel
        </button>
      </div>
    </div>
  );
};

OutgoingCall.propTypes = {
  contact: PropTypes.object.isRequired,
  callType: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default OutgoingCall;
