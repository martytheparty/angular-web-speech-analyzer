import { Injectable, signal } from '@angular/core';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  recognition: any;
  private logListing: any[] = [];
  allLogsSignal = signal<any[]>(this.logListing);
  voiceResultSignal = signal<any>(undefined);
  audioStartSignal =  signal<any>(undefined);
  audioEndSignal =  signal<any>(undefined);

  

  constructor() {

    if ('SpeechRecongition' in window) {
      this.recognition =  new SpeechRecognition();
    }  else if ('webkitSpeechRecognition' in window) {
      this.recognition =  new webkitSpeechRecognition();
    }

    if(this.recognition) {

      this.recognition.onstart = (result: any) => {
       this.updateLogListings(result);
      }

      this.recognition.onaudiostart = (result: any) => {
        this.audioStartSignal.set(result);
        this.updateLogListings(result);
      }

      this.recognition.onsoundstart = (result: any) => {
       this.updateLogListings(result);
      }

      this.recognition.onresult = (result: any) => {
        this.voiceResultSignal.set(result.results[0][0].transcript);
        this.updateLogListings(result);
      }

      this.recognition.onend = (result: any) => {
       this.audioEndSignal.set(result);
       this.updateLogListings(result);
      }
    }
   }

   updateLogListings(listItem: any): void
   {
    this.logListing.push(listItem);
    // publish list update
    this.allLogsSignal.set(this.logListing);
   }

   clearLogListings() {
    this.logListing = [];
    this.allLogsSignal.set(this.logListing);
   }

   record() {
    if(this.recognition) {
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      this.recognition.maxAlternatives = 1;
      this.recognition.start();
    }
  }
}
