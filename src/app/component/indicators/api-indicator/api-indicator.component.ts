import { Component, input, effect } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-api-indicator',
    imports: [
        MatIconModule,
        MatCardModule
    ],
    templateUrl: './api-indicator.component.html',
    styleUrl: './api-indicator.component.scss'
})
export class ApiIndicatorComponent {
  title = input.required<string>();
  hasApi = input.required<boolean>();

  prefix = '';

  constructor() {
    effect(
      () => {
        if (this.hasApi()) {
          this.prefix = 'This browser has the ';
        } else {
          this.prefix = 'This browser does not have the ';
        }
      }
    )
  }
}
