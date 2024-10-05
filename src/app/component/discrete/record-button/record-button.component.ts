import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SpeechServiceService } from '../../../speech-service.service';

@Component({
  selector: 'app-record-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './record-button.component.html',
  styleUrl: './record-button.component.scss'
})
export class RecordButtonComponent {

  speechService: SpeechServiceService = inject(SpeechServiceService);

  record(): void
  {
    this.speechService.record();
  }

}
