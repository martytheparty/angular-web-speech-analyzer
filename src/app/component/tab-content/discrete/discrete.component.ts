import { Component, effect, inject } from '@angular/core';
import { DiscreteResultComponent } from './discrete-result/discrete-result.component';
import { RecordButtonComponent } from './record-button/record-button.component';
import { SpeechService } from '../../../speech-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DiscreteService } from './services/discrete.service';
import { DiscreteResult } from '../../../interfaces/voice';
import { DiscreteSettingsDialogComponent } from '../../settings-dialog/settings-dialog.component';


@Component({
    selector: 'app-discrete',
    imports: [
        RecordButtonComponent,
        DiscreteResultComponent,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './discrete.component.html',
    styleUrl: './discrete.component.scss'
})
export class DiscreteComponent {
  dialog = inject(MatDialog);
  speechService: SpeechService = inject(SpeechService);
  discreteService: DiscreteService = inject(DiscreteService);

  result: DiscreteResult | undefined;

  constructor() {
    effect(  () => {
      if (this.speechService.discreteVoiceResultSignal()?.length > 0) {
        this.result = this.speechService.discreteVoiceResultSignal()[0];
      }
    });    
  }

  clearResults(): void {
    this.result = undefined;
    this.discreteService.clear();
  }

  openDiscreteForm(): void {
    this.dialog.open(DiscreteSettingsDialogComponent, {
      autoFocus: true,
      restoreFocus: false,
    });
  }
}
