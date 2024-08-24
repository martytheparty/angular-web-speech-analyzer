import { Component, OnDestroy } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ApiIndicatorComponent } from './api-indicator/api-indicator.component'
import { Location } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    ApiIndicatorComponent,
    RouterModule,
    MatTabsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy{

  private unregisterChangeListener: VoidFunction;

  url: string = '';
  hasSpeechRecognition = false;
  hasWebkitSpeechRecognition = false;

  constructor(private location: Location) {

    this.unregisterChangeListener = this.location.onUrlChange((url, state) => {
      this.url = url;
      // React to the URL change here
    });

    if ('SpeechRecongition' in window) {
      this.hasSpeechRecognition = true;
    }
    
    if ('webkitSpeechRecognition' in window) {
      this.hasWebkitSpeechRecognition = true;
    }
  }
  ngOnDestroy(): void {
    if (this.unregisterChangeListener) {
      this.unregisterChangeListener(); // Stop listening to URL changes
    }
  }

}
