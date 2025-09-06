
import { Injectable, signal } from '@angular/core';
import { DiscreteResult, DiscreteTranscript, ContinuousResult, ContinuousTranscript, ContinuousTranscripts } from './interfaces/voice';
import { LanguageItem } from './interfaces/language';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  recognition: any;
  private logListing: any[] = [];
  allLogsSignal = signal<any[]>(this.logListing);
  discreteVoiceResultSignal = signal<DiscreteResult[]>([]);
  continuousVoiceResultSignal = signal<ContinuousResult[]>([]);
  audioStartSignal =  signal<any>(undefined);
  audioEndSignal =  signal<any>(undefined);

  discreteLanguage = 'en-US';
  maxAlternatives = 21;
  speechGrammars = "";

  discreteLanguageSignal = signal(this.discreteLanguage);
  maxAlternativesSignal = signal(this.maxAlternatives);
  speechGrammarsSignal = signal(this.speechGrammars);

  foundApiChange = false;

  private supportedLanguageMap = new Map<string, LanguageItem>();
  
  private supportedLanguages: string[] = [];
  // private langMap: {key: string, }

  propertyMap: Record<string, any> = {};

  foundProperties: string[] = [];

  continousRecording: boolean = false;

  constructor() {

    this.supportedLanguageMap.set("en-US", {locale: "en-US", name: "English (US)"});
    this.supportedLanguageMap.set("en-GB", {locale: "en-GB", name: "English (British)"});
    this.supportedLanguageMap.set("de-DE", {locale: "de-DE", name: "German (Germany)"});
    this.supportedLanguageMap.set("ja-JP", {locale: "ja-JP", name: "Japanese (Japan)"});
    this.supportedLanguageMap.set("ja-US", {locale: "ja-US", name: "Japanese (US)"});
    this.supportedLanguageMap.set("ko-KR", {locale: "ko-KR", name: "Korean (Korea)"});
    this.supportedLanguageMap.set("es-ES", {locale: "es-ES", name: "Spanish (Spain)"});
    this.supportedLanguageMap.set("es-MX", {locale: "es-MX", name: "Spanish (Mexico)"});
    this.supportedLanguageMap.set("ru-RU", {locale: "ru-RU", name: "Russian (Russia)"});
    this.supportedLanguageMap.set("cy-GB", {locale: "cy-GB", name: "Welsh (Great Britain)"});
    this.supportedLanguages = Array.from(this.supportedLanguageMap.keys());
  
    if ('SpeechRecongition' in window) {
      this.recognition =  new SpeechRecognition();
    }  else if ('webkitSpeechRecognition' in window) {
      this.recognition =  new webkitSpeechRecognition();
    }

    if(this.recognition) {

      const properties = this.getAllProperties(this.recognition);
      this.foundProperties = Array.from(properties).sort();

      this.setPropertyMap(properties);

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

        if (this.recognition.continuous) {
          const continuousResultTranscriptItem: ContinuousResult[] = this.processContinuous(result);
          this.continuousVoiceResultSignal.set(continuousResultTranscriptItem);
        } else {
          const discreteResultTranscript = this.processDiscrete(result);
          this.discreteVoiceResultSignal.set(discreteResultTranscript);
        }
        
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

   processContinuous(result: any): ContinuousResult[]
   {
    const continuousResultTranscript: ContinuousResult[] = [];
          const totalCount = result.results[0].length;
          let allContinousTranscripts: ContinuousTranscripts[] = [];

          const resultsArray = Array.from(result.results);
          resultsArray.forEach(
            (result: any) => {
              const firstTranscript = result[0].transcript as string;
              const firstConfidence = result[0].confidence;
              let allResultsForResult: ContinuousTranscripts[] = [];
              const currentResultList: ContinuousTranscript[] = Array.from(result).map(
                (res: any) => {
                  let resitem = {
                    transcript: res.transcript,
                    confidence: res.confidence
                  };
                  return resitem;
                }
              );

              const continuousTranscripts: ContinuousTranscripts = {transcripts: currentResultList}
              allResultsForResult.push(continuousTranscripts);

              allContinousTranscripts = allResultsForResult;

              continuousResultTranscript.push(
                {
                  language: this.discreteLanguage,
                  transcript: firstTranscript,
                  confidence: firstConfidence,
                  count: totalCount,
                  maxAlternatives: this.maxAlternatives,
                  allTranscripts: allContinousTranscripts
                }
              );
            }
          );
          return continuousResultTranscript;
   }

   processDiscrete(result: any): DiscreteResult[]
   {
        const resultArray = Array.from(result.results[0]);
        const discretefirstTranscript = result.results[0][0].transcript as string;
        const firstConfidence = result.results[0][0].confidence;
        const discreteTotalCount = result.results[0].length;

        const allTranscripts: DiscreteTranscript[] = [];
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

        const discreteResultTranscript: DiscreteResult[] = [];

        const discreteResult: DiscreteResult = {
          language: this.discreteLanguage,
          transcript: discretefirstTranscript,
          confidence: firstConfidence,
          count: discreteTotalCount,
          maxAlternatives: this.maxAlternatives,
          allTranscripts
        }

        discreteResultTranscript.push(discreteResult)

        return discreteResultTranscript;
   }

   setPropertyMap(properties: Set<string>): void
   {
    properties.forEach(
        (propertyName: string) => {
          this.propertyMap[propertyName] = this.recognition[propertyName];
        }
    );
   }

   getAllProperties(obj: object): Set<string> {
    const props = new Set();
  
    do {
      Object.getOwnPropertyNames(obj).forEach((p) => props.add(p));
    } while ((obj = Object.getPrototypeOf(obj)));

    const result: Set<string> = props as unknown as Set<string>;
  
    return result;
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

   getSpeechRecognitionList(): any {
      // the browsers seem ignore this as of 8/2/2025
      let sg: any;

      if ('SpeechRecongition' in window) {
        const SpeechGrammarList = (window as any).SpeechGrammarList;
        sg = new SpeechGrammarList();
      }  else if ('webkitSpeechRecognition' in window) {
        const webkitSpeechGrammarList = (window as any).webkitSpeechGrammarList;
        sg = new webkitSpeechGrammarList();
      }

      const weightAssigned = 1;

      // 1 = highest priority (full weight)
      // 0.5 = medium influence
      // 0 = no influence

      sg.addFromString(this.speechGrammars, weightAssigned);

      return sg;
   }

   discreteRecord() {
    if(this.recognition) {
      this.recognition.continuous = false;
      // make this configurable interimResults
      this.recognition.interimResults = false;
      this.recognition.lang = this.discreteLanguage;
      this.recognition.maxAlternatives = this.maxAlternatives;
      this.recognition.grammars = this.getSpeechRecognitionList();
      this.recognition.start();
    }
  }

  continueRecord() {
    if(this.recognition) {
      this.recognition.continuous = true;
      // make this configurable interimResults
      this.recognition.interimResults = true;
      this.recognition.lang = this.discreteLanguage;
      this.recognition.maxAlternatives = this.maxAlternatives;
      this.recognition.grammars = this.getSpeechRecognitionList();
      this.recognition.start();
    }
  }

  stopContinueRecord() {
    if(this.recognition) {
      this.recognition.stop();
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

  updateGrammars(grammars: string): void
  {
    this.speechGrammars = grammars;
    this.speechGrammarsSignal.set(grammars);
  }

  getSupportedLanguages(): string[]
  {
    return this.supportedLanguages;
  }

  getSupportedLanguageName(code: string): string {
    const lang: LanguageItem =  this.supportedLanguageMap.get(code) as LanguageItem;

    return lang.name;
  }
}
