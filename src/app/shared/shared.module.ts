import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        AlertComponent,
        DropdownDirective,
    ],
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        NgbModule,
        AlertComponent,
        LoadingSpinnerComponent,
        AlertComponent,
        DropdownDirective,
        CommonModule
    ]
})

export class SharedModule {}
