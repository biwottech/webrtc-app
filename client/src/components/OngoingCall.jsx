import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createPeer } from '../utils/webrtc/webrtc';

const OngoingCall = ({ contact, callType, peer, onEndCall }) => {
  const videoRef = useRef();

  useEffect(() => {
    peer.on('stream', (remoteStream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = remoteStream;
      }
    });
  }, [peer]);

  const handleEndCall = () => {
    peer.destroy();
    onEndCall();
  };

  return (
    <div className="flex flex-col h-full justify-center items-center p-4">
      <div className="text-center">
        <div className="font-semibold text-lg">{contact.name}</div>
        <div className="text-sm text-gray-500">{callType} call ongoing...</div>
      </div>
      {callType === 'video' && (
        <video ref={videoRef} autoPlay playsInline className="mt-4" />
      )}
      <div className="flex space-x-4 mt-4">
        <button className="p-2 bg-red-500 text-white rounded-full" onClick={handleEndCall}>
          <i className="fas fa-phone-slash"></i> End Call
        </button>
      </div>
    </div>
  );
};

OngoingCall.propTypes = {
  contact: PropTypes.object.isRequired,
  callType: PropTypes.string.isRequired,
  peer: PropTypes.object.isRequired,
  onEndCall: PropTypes.func.isRequired,
};

export default OngoingCall;
