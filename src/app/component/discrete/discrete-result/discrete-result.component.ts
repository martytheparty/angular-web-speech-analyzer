import { Component, effect, inject } from '@angular/core';
import { SpeechService } from '../../../speech-service.service';
import { DiscreteService } from '../services/discrete.service';
import { DiscreteResult } from '../../../interfaces/voice';

@Component({
    selector: 'app-discrete-result',
    imports: [],
    templateUrl: './discrete-result.component.html',
    styleUrl: './discrete-result.component.scss'
})
export class DiscreteResultComponent {

  speechService: SpeechService = inject(SpeechService);
  discreteService: DiscreteService = inject(DiscreteService);

  results: DiscreteResult[] = []; 

  clearCount: undefined | number = undefined;

  constructor() {
    effect(  () => {
      if (this.speechService.voiceResultSignal()?.length > 0) {
        let result = this.speechService.voiceResultSignal()[0];
        this.results.unshift(result);
      }

      if (this.discreteService.clearCountSignal() !== this.clearCount) {

        if (
          this.discreteService.clearCountSignal() > 0
          && this.clearCount !== undefined // the component hasn't been initialized 
        ) {
          this.results = [];
        }

        this.clearCount = this.discreteService.clearCountSignal();
      }
    });    
  }
}
