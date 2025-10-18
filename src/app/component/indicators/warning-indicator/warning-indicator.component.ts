import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-indicator',
  imports: [
    MatIconModule
  ],
  templateUrl: './warning-indicator.component.html',
  styleUrl: './warning-indicator.component.scss'
})
export class WarningIndicatorComponent {
    dialog = inject(MatDialog);

     @ViewChild('warningDialog') warningDialogTemplate!: TemplateRef<void>;

    openWarning(): void {
        this.dialog.open(this.warningDialogTemplate, {
          autoFocus: true,
          restoreFocus: false,
        });
    }

}
