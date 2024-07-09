import SimplePeer from 'simple-peer';

export const createPeer = (initiator, stream, onSignal, onStream) => {
  const peer = new SimplePeer({
    initiator,
    stream,
    trickle: false,
  });

  peer.on('signal', (data) => {
    onSignal(data);
  });

  peer.on('stream', (stream) => {
    onStream(stream);
  });

  return peer;
}; 
