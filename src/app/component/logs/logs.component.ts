import { Component, effect, inject } from '@angular/core';
import { SpeechServiceService } from '../../speech-service.service';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})
export class LogsComponent {

  speechService: SpeechServiceService = inject(SpeechServiceService);
  logListing: any[] = [];

  constructor()
  {
    console.log("LOG COMPONENT CONSTRUCTION...");
    effect(() => {
      this.logListing = this.speechService.allLogsSignal();
    });
  }



}
