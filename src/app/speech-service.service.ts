
import { Injectable, signal } from '@angular/core';
import { DiscreteResult, DiscreteTranscript } from './interfaces/voice';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  recognition: any;
  private logListing: any[] = [];
  allLogsSignal = signal<any[]>(this.logListing);
  voiceResultSignal = signal<DiscreteResult[]>([]);
  audioStartSignal =  signal<any>(undefined);
  audioEndSignal =  signal<any>(undefined);

  discreteLanguage = 'en-us';
  maxAlternatives = 21;

  discreteLanguageSignal = signal(this.discreteLanguage);
  maxAlternativesSignal = signal(this.maxAlternatives);

  private supportedLanguages: string[] = ['en-US', 'es-ES', 'es-MX'];

  

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

      this.recognition.onspeechstart = (result: any) => {
        this.updateLogListings(result);
       }

      this.recognition.onspeechend = (result: any) => {
        this.updateLogListings(result);
       }

      this.recognition.onaudioend = (result: any) => {
        this.updateLogListings(result);
      }

      this.recognition.onsoundend = (result: any) => {
        this.updateLogListings(result);
      }

      this.recognition.onresult = (result: any) => {
        const resultTranscript: DiscreteResult[] = [];
        const firstTranscript = result.results[0][0].transcript as string;
        const firstConfidence = result.results[0][0].confidence;
        const totalCount = result.results[0].length;
        const allTranscripts: DiscreteTranscript[] = [];

        const resultArray = Array.from(result.results[0]);

        resultArray.forEach(
          (result: any) => {
            allTranscripts.push(
              {
                transcript: result.transcript,
                confidence: result.confidence
              }
            );
          }
        );


        resultTranscript.push({
          language: this.discreteLanguage,
          transcript: firstTranscript,
          confidence: firstConfidence,
          count: totalCount,
          maxAlternatives: this.maxAlternatives,
          allTranscripts
        });
        this.voiceResultSignal.set(resultTranscript);
        this.updateLogListings(result);
      }

      this.recognition.onend = (result: any) => {
       this.audioEndSignal.set(result);
       this.updateLogListings(result);
      }

      this.recognition.onnomatch = (result: any) => {
        this.audioEndSignal.set(result);
        this.updateLogListings(result);
      }

      this.recognition.onerror = (result: any) => {
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

   discreteRecord() {
    if(this.recognition) {
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = this.discreteLanguage;
      this.recognition.maxAlternatives = this.maxAlternatives;
      this.recognition.start();
    }
  }

  updateDiscreteLanguage(lang: string): void
  {
    this.discreteLanguage = lang;
    this.discreteLanguageSignal.set(lang);
  }

  updateMaxAlternatives(alts: number): void
  {
    this.maxAlternatives = alts;
    this.maxAlternativesSignal.set(alts);
  }

  getSupportedLanguages(): string[]
  {
    return this.supportedLanguages;
  }
}
