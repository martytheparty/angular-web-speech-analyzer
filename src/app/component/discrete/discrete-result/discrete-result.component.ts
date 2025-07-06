import { Component, effect, inject } from '@angular/core';
import { SpeechService } from '../../../speech-service.service';
import { DiscreteService } from '../services/discrete.service';
import { DiscreteResult } from '../../../interfaces/voice';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-discrete-result',
    imports: [CommonModule],
    templateUrl: './discrete-result.component.html',
    styleUrl: './discrete-result.component.scss'
})
export class DiscreteResultComponent {

  speechService: SpeechService = inject(SpeechService);
  discreteService: DiscreteService = inject(DiscreteService);

  clearCount: undefined | number = undefined;
  firstTime = true;
  showResults = false;
  currentShowResult: DiscreteResult | undefined;
  showToggle = false;

  constructor() {
    effect(  () => {
      if (
        this.speechService.discreteVoiceResultSignal()?.length > 0
        && !this.firstTime
      ) {
        let result = this.speechService.discreteVoiceResultSignal()[0];
        this.discreteService.results.unshift(result);
      } else {
        this.firstTime = false;
      }

      if (this.discreteService.clearCountSignal() !== this.clearCount) {

        if (
          this.discreteService.clearCountSignal() > 0
          && this.clearCount !== undefined // the component hasn't been initialized 
        ) {
          this.discreteService.results = [];
        }

        this.clearCount = this.discreteService.clearCountSignal();
      }
    });    
  }

  countMouseOver(result: DiscreteResult): void 
  {
    this.showResults = true;
    this.currentShowResult = result;
  }

  countMouseOut(): void 
  {
    this.showResults = false;
  }

  countMouseClick(): void 
  {
    this.showToggle = !this.showToggle;
  }
}
