import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRtcService {

  private peerConnection?: RTCPeerConnection;
  private localStream?: MediaStream;
  private remoteStream?: MediaStream;

  constructor() { }

  async initializePeerConnection() {
    this.peerConnection = new RTCPeerConnection();

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('New ICE candidate:', event.candidate);
        // Send ICE candidate to remote peer through signaling server
      }
    };

    this.peerConnection.ontrack = (event) => {
      if (this.remoteStream) {
        this.remoteStream.addTrack(event.track);
      } else {
        this.remoteStream = new MediaStream([event.track]);
      }
    };

    return this.peerConnection;
  }

  async startLocalStream(videoElement: HTMLVideoElement) {
    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.localStream.getTracks().forEach(track => {
      this.peerConnection?.addTrack(track, this.localStream!);
    });
    videoElement.srcObject = this.localStream;
  }

  async createOffer() {
    const offer = await this.peerConnection?.createOffer();
    await this.peerConnection?.setLocalDescription(offer);
    return offer;
  }

  async handleOffer(offer: RTCSessionDescriptionInit) {
    await this.peerConnection?.setRemoteDescription(offer);
    const answer = await this.peerConnection?.createAnswer();
    await this.peerConnection?.setLocalDescription(answer);
    return answer;
  }

  async handleAnswer(answer: RTCSessionDescriptionInit) {
    await this.peerConnection?.setRemoteDescription(answer);
  }

  async handleICECandidate(candidate: RTCIceCandidate) {
    await this.peerConnection?.addIceCandidate(candidate);
  }

  getRemoteStream(): any {
    return this.remoteStream;
  }

  closeConnection() {
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = undefined;
    }

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = undefined;
    }

    if (this.remoteStream) {
      this.remoteStream.getTracks().forEach(track => track.stop());
      this.remoteStream = undefined;
    }
  }
}
