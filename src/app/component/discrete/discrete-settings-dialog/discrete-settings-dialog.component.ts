import { Component, effect, inject } from '@angular/core';

import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { SpeechService } from '../../../speech-service.service';


@Component({
  selector: 'app-discrete-settings-dialog',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule, 
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './discrete-settings-dialog.component.html',
  styleUrl: './discrete-settings-dialog.component.scss'
})
export class DiscreteSettingsDialogComponent {

  speechService: SpeechService = inject(SpeechService);

  configurationForm = new FormGroup({
    language: new FormControl('en-US'),
    maxResults: new FormControl('1', [Validators.required]),
  });

  supportedLanguages: string[] = this.speechService.getSupportedLanguages();

  constructor() {
    // setting up the signals subscriptions
    effect(() => {
       if (this.speechService.discreteLanguageSignal() 
        !== this.configurationForm.controls['language'].value)
      {
        this.configurationForm.controls['language'].setValue(this.speechService.discreteLanguageSignal());
      }

      if (this.speechService.maxAlternativesSignal().toString() 
        !== this.configurationForm.controls['maxResults'].value)
      {
        this.configurationForm.controls['maxResults'].setValue(this.speechService.maxAlternativesSignal().toString());
      }
    }
    );

    // setting up the form subscriptions
    this.configurationForm.valueChanges.subscribe(
      (results: any) => {
        const form = this.configurationForm;
         if (this.configurationForm.dirty) {
          this.speechService.updateDiscreteLanguage(results.language);        
          this.speechService.updateMaxAlternatives(results.maxResults);

        }
      }
    );
  }

  getNameForCode(code: string | null): string
  {
    let name = "unknown";
    if (code && this.speechService.getSupportedLanguageName(code)) {
      name = this.speechService.getSupportedLanguageName(code);
    }

    return name;
  }
}
