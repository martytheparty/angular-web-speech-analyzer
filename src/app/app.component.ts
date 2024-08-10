import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ApiIndicatorComponent } from './api-indicator/api-indicator.component'
import { RecordButtonComponent } from './discrete/record-button/record-button.component';
import { DiscreteResultComponent } from './discrete/discrete-result/discrete-result.component';
import { DiscreteComponent } from './discrete/discrete.component';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    ApiIndicatorComponent,
    DiscreteComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  hasSpeechRecognition = false;
  hasWebkitSpeechRecognition = false;

  constructor() {

    if ('SpeechRecongition' in window) {
      this.hasSpeechRecognition = true;
    }
    
    if ('webkitSpeechRecognition' in window) {
      this.hasWebkitSpeechRecognition = true;
    }
  }

}


