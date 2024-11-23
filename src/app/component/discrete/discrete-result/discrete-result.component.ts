import { Component, effect, inject } from '@angular/core';
import { SpeechService } from '../../../speech-service.service';

@Component({
  selector: 'app-discrete-result',
  standalone: true,
  imports: [],
  templateUrl: './discrete-result.component.html',
  styleUrl: './discrete-result.component.scss'
})
export class DiscreteResultComponent {

  speechService: SpeechService = inject(SpeechService);

  result: string = '';

  constructor() {
    effect(  () => {
      if (this.speechService.voiceResultSignal() !== undefined) {
        this.result = this.speechService.voiceResultSignal();
      }
    });    
  }
}
