import { Injectable, signal } from '@angular/core';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechServiceService {

  recognition: any;
  voiceResult = signal<any>(undefined);
  audioStart =  signal<any>(undefined);
  audioEnd =  signal<any>(undefined);

  constructor() {

    if ('SpeechRecongition' in window) {
      this.recognition =  new SpeechRecognition();
    }  else if ('webkitSpeechRecognition' in window) {
      this.recognition =  new webkitSpeechRecognition();
    }
   }

   record() {
    if(this.recognition) {
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      this.recognition.maxAlternatives = 1;
      this.recognition.start();

      this.recognition.onresult = (result: any) => {
        console.log('1: Publish result', result.results[0][0].transcript)
        this.voiceResult.set(result.results[0][0].transcript);
      }

      this.recognition.onend = (result: any) => {
        console.log("1: Publish End")
       this.audioEnd.set(result);
      }

      this.recognition.onaudiostart = (result: any) => {
        this.audioStart.set(result);
       
      }
    }
  }
}
