import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SpeechService } from '../../speech-service.service';

import { ContinuousResultComponent } from './continuous-result/continuous-result.component';

@Component({
    selector: 'app-continuous',
    imports: [
        MatButtonModule,
        MatIconModule,
        ContinuousResultComponent
    ],
    templateUrl: './continuous.component.html',
    styleUrl: './continuous.component.scss'
})
export class ContinuousComponent {

    speechService: SpeechService = inject(SpeechService);
    

    toggle() {
        this.speechService.continousRecording = !this.speechService.continousRecording;
        if (this.speechService.continousRecording) {
            this.speechService.continueRecord();
        } else  {
            this.speechService.stopContinueRecord();
        }

    }
}
