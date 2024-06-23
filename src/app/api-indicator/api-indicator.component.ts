import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-api-indicator',
  standalone: true,
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
  positiveAriaLabel = input.required<string>();
  negativeAriaLabel = input.required<string>();
}
