import { Component, effect, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ContinuousResult } from '../../../../interfaces/voice';

import { SpeechService } from '../../../../speech-service.service';
import { ContinuousResultItemComponent } from '../continuous-result-item/continuous-result-item.component';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-continuous-result',
  imports: [
    CommonModule,
    ContinuousResultItemComponent,
    MatIconModule
  ],
  templateUrl: './continuous-result.component.html',
  styleUrl: './continuous-result.component.scss'
})
export class ContinuousResultComponent {

  speechService: SpeechService = inject(SpeechService);

  started = false;
  ended = false;
  signalCount = 0;
  currentIndex = 0;

  allRequests: ContinuousResult[][] = [];


  constructor() {
    effect(() => {
      this.signalCount = this.signalCount + 1;
      let result: ContinuousResult[] = this.speechService.continuousVoiceResultSignal();

      this.allRequests.push(result);
      this.currentIndex = this.signalCount - 1;
      let startSignal = this.speechService.audioStartSignal();
      let endSignal = this.speechService.audioEndSignal();

      if (!this.started && startSignal !== undefined) {
        this.started = true;
      }

      if (!this.ended && endSignal !== undefined) {
        this.ended = true;
      }
    });
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex = this.currentIndex - 1;
    }

  }

  next(): void {
    if (this.currentIndex < (this.allRequests.length - 1)) {
      this.currentIndex = this.currentIndex + 1;
    }
  }

}
