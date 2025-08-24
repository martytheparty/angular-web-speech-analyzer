import { Component, inject, effect } from '@angular/core';
import { SpeechService } from '../../../speech-service.service';

@Component({
    selector: 'app-log-count-indicator',
    imports: [],
    templateUrl: './log-count-indicator.component.html',
    styleUrl: './log-count-indicator.component.scss'
})
export class LogCountIndicatorComponent {

  speechService: SpeechService = inject(SpeechService);

  recordCount: any[] = [];

  constructor() {
    effect( () => {
      this.recordCount = this.speechService.allLogsSignal();
    } );
  }


}
