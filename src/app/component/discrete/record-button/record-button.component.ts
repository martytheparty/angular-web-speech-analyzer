import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SpeechService } from '../../../speech-service.service';

@Component({
    selector: 'app-record-button',
    imports: [MatButtonModule],
    templateUrl: './record-button.component.html',
    styleUrl: './record-button.component.scss'
})
export class RecordButtonComponent {

  speechService: SpeechService = inject(SpeechService);

  record(): void
  {
    this.speechService.record();
  }

}
