import { Component, input } from '@angular/core';
import { ContinuousResult } from '../../../../interfaces/voice';

@Component({
  selector: 'app-continuous-result-item',
  imports: [],
  templateUrl: './continuous-result-item.component.html',
  styleUrl: './continuous-result-item.component.scss'
})
export class ContinuousResultItemComponent {
   result = input<ContinuousResult[] | undefined>();
}
