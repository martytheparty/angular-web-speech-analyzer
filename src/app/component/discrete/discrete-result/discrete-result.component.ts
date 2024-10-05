import { Component, effect, inject } from '@angular/core';
import { SpeechServiceService } from '../../../speech-service.service';

@Component({
  selector: 'app-discrete-result',
  standalone: true,
  imports: [],
  templateUrl: './discrete-result.component.html',
  styleUrl: './discrete-result.component.scss'
})
export class DiscreteResultComponent {

  speechService: SpeechServiceService = inject(SpeechServiceService);

  result: string = '';

  constructor() {
    effect(  () => {
      if (this.speechService.voiceResultSignal() !== undefined) {
        this.result = this.speechService.voiceResultSignal();
      }
    });    
  }
}
