import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ApiIndicatorComponent } from './api-indicator/api-indicator.component'
import { Location } from '@angular/common';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { VaNavigationService } from './services/va-navigation.service';
import { RouteIndexType, RouteValuesType } from './interfaces/va-navigation';
import { DiscreteComponent } from './discrete/discrete.component';

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
    MatTabsModule,
    DiscreteComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy{

  navigationService: VaNavigationService = inject(VaNavigationService);

   @ViewChild('tab') tabGroup!: MatTabGroup;

  private unregisterChangeListener: VoidFunction;


  hasSpeechRecognition = false;
  hasWebkitSpeechRecognition = false;

  constructor(private location: Location) {

    this.unregisterChangeListener = this.location.onUrlChange((url, state) => {
      // React to URL Change here
      const urlLink: RouteValuesType = url as unknown as RouteValuesType;

      this.tabGroup.selectedIndex = this.navigationService.getIndexForRoute(urlLink);
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

  tabChange(event: number): void
  {
    const routeIndex = event as RouteIndexType;

    this.location.go(this.navigationService.getRouteForIndex(routeIndex))
  }
}
