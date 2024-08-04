import { Component } from '@angular/core';
import { DiscreteResultComponent } from '../discrete-result/discrete-result.component';
import { RecordButtonComponent } from '../record-button/record-button.component';

@Component({
  selector: 'app-discrete',
  standalone: true,
  imports: [
    RecordButtonComponent,
    DiscreteResultComponent
  ],
  templateUrl: './discrete.component.html',
  styleUrl: './discrete.component.scss'
})
export class DiscreteComponent {

}
