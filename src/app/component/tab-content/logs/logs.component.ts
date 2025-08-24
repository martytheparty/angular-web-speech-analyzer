import { Component, effect, inject } from '@angular/core';
import { SpeechService } from '../../../speech-service.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-logs',
    imports: [
        CommonModule,
        MatButtonModule
    ],
    templateUrl: './logs.component.html',
    styleUrl: './logs.component.scss'
})
export class LogsComponent {

  speechService: SpeechService = inject(SpeechService);
  logListing: any[] = [];
  logListingKeys: any[] = [];

  constructor()
  {
    effect(() => {
      this.logListing = this.speechService.allLogsSignal();
      this.logListing.forEach(
        (item: any) => {
          const keys: any[] = [];
          // this.logKeys.push(Object.keys(item));
          for (let key in item) {
              keys.push(key);

          }
          this.logListingKeys.push(keys);
        }
      );

    });
  }

  clear(): void
  {
    this.speechService.clearLogListings();
  }



}
