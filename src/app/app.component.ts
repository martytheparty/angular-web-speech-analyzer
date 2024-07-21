import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ApiIndicatorComponent } from './api-indicator/api-indicator.component'
import {MatButtonModule} from '@angular/material/button';
import { SpeechServiceService } from './speech-service.service';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    ApiIndicatorComponent,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  result: string = '';
  hasSpeechRecognition = false;
  hasWebkitSpeechRecognition = false;

  speechService: SpeechServiceService = new SpeechServiceService();

  constructor() {

    if ('SpeechRecongition' in window) {
      this.hasSpeechRecognition = true;
    }
    
    if ('webkitSpeechRecognition' in window) {
      this.hasWebkitSpeechRecognition = true;
    }

    effect(  () => {
      console.log('recognition', this.speechService.voiceResult());
      if (this.speechService.voiceResult() !== undefined) {
        this.result = this.speechService.voiceResult();
      }
    });
  }

  record(): void
  {
    this.speechService.record();
  }

}


