import { Component, input } from '@angular/core';

@Component({
  selector: 'app-api-indicator',
  standalone: true,
  imports: [],
  templateUrl: './api-indicator.component.html',
  styleUrl: './api-indicator.component.scss'
})
export class ApiIndicatorComponent {
  title = input.required();
}
