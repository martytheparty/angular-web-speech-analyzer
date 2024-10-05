import { Injectable, signal } from '@angular/core';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechServiceService {

  recognition: any;
  private logListing: any[] = [];
  allLogsSignal = signal<any[]>(this.logListing);
  voiceResultSignal = signal<any>(undefined);
  audioStartSignal =  signal<any>(undefined);
  audioEndSignal =  signal<any>(undefined);

  

  constructor() {

    console.log('creating speech service');

    if ('SpeechRecongition' in window) {
      this.recognition =  new SpeechRecognition();
    }  else if ('webkitSpeechRecognition' in window) {
      this.recognition =  new webkitSpeechRecognition();
    }

    if(this.recognition) {
      console.log("SETUP HANDLERS");

      this.recognition.onresult = (result: any) => {
        console.log('1: Publish result', result.results[0][0].transcript)
        this.voiceResultSignal.set(result.results[0][0].transcript);
        this.updateLogListings(result);
      }

      this.recognition.onend = (result: any) => {
        console.log("2: Publish End")
       this.audioEndSignal.set(result);
       this.updateLogListings(result);
      }

      this.recognition.onaudiostart = (result: any) => {
        this.audioStartSignal.set(result);
        this.updateLogListings(result);
      }
    }
   }

   updateLogListings(listItem: any): void
   {
    this.logListing.push(listItem);
    // publish list update
    console.log("LOGLISTING", this.logListing);
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
