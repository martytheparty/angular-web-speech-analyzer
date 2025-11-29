import { 
  Component, 
  OnDestroy, 
  ViewChild, 
  inject,
  TemplateRef
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { ApiIndicatorComponent } from './component/indicators/api-indicator/api-indicator.component'
import { DOCUMENT, Location } from '@angular/common';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { VaNavigationService } from './services/va-navigation.service';
import { RouteIndexType, RouteValuesType } from './interfaces/va-navigation';
import { DiscreteComponent } from './component/tab-content/discrete/discrete.component';
import { LogsComponent } from "./component/tab-content/logs/logs.component";
import { LogCountIndicatorComponent } from "./component/indicators/log-count-indicator/log-count-indicator.component";
import { ApiComponent } from "./component/tab-content/api/api.component";
import { ContinuousComponent } from "./component/tab-content/continuous/continuous.component";
import { SpeechService } from './speech-service.service';
import { ApiChangeIndicatorComponent } from './component/indicators/api-change-indicator/api-change-indicator.component';
import { Router } from '@angular/router';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Component({
    selector: 'app-root',
    imports: [
    MatIconModule,
    ApiIndicatorComponent,
    RouterModule,
    MatTabsModule,
    DiscreteComponent,
    LogsComponent,
    LogCountIndicatorComponent,
    ApiComponent,
    ContinuousComponent,
    MatMenuModule,
    MatButtonModule,
    ApiChangeIndicatorComponent
],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy{

  navigationService: VaNavigationService = inject(VaNavigationService);
  speechService: SpeechService = inject(SpeechService);
  dialog: MatDialog = inject(MatDialog);

  @ViewChild('tab') tabGroup!: MatTabGroup;
  @ViewChild('aboutWebsite') aboutWebsiteTemplate!: TemplateRef<any>;
  @ViewChild('aboutDeveloper') aboutDeveloperTemplate!: TemplateRef<any>;
  @ViewChild('howToUse') howToUseTemplate!: TemplateRef<any>;
  @ViewChild('whatCouldGoWrong') whatCouldGoWrongTemplate!: TemplateRef<any>;

  private unregisterChangeListener: VoidFunction;

  hasSpeechRecognition = false;
  hasWebkitSpeechRecognition = false;

  howToVideoURL = "";

  private document = inject(DOCUMENT);

  constructor(private router: Router, private location: Location) {

    this.unregisterChangeListener = this.location.onUrlChange((url, state) => {
      // React to the URL change here
      // expected URLS are: 
      // /discrete (local)
      // voice/discrete (https://www.ilikeemail.com/voice/discrete)
      // angular-web-speech-analyzer/discrete (https://martytheparty.github.io/angular-web-speech-analyzer/discrete)
      const parts = url.split("/");
      
      const urlLink: RouteValuesType = parts.pop() as unknown as RouteValuesType;
      this.tabGroup.selectedIndex = this.navigationService.getIndexForRoute(urlLink);


      this.howToVideoURL = this.document.location.protocol + "//" + this.document.location.host;

      // remove the first item from parts
      parts.shift();

      parts.forEach(
        (part: string) => {
          this.howToVideoURL = this.howToVideoURL + "/" + part;
        } 
      );

      this.howToVideoURL = this.howToVideoURL + "/how-to-use.mp4";
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

    // this.location.go(this.navigationService.getRouteForIndex(routeIndex))
    // this.router.navigate([this.navigationService.getRouteForIndex(routeIndex)]);
    
    this.router.navigateByUrl(this.navigationService.getRouteForIndex(routeIndex));
  }

  openAboutWebsiteDialog(): void {
    this.dialog.open(this.aboutWebsiteTemplate);
  }

  openAboutDeveloperDialog(): void {
    this.dialog.open(this.aboutDeveloperTemplate);
  }

  openHowToUseWebsiteDialog(): void {
    this.dialog.open(this.howToUseTemplate);
  }

  openWhatCouldGoWrongDialog(): void {
    this.dialog.open(this.whatCouldGoWrongTemplate);
  }
}
