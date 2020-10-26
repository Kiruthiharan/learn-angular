import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card'; 

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        AlertComponent,
        DropdownDirective,
    ],
    imports: [
        CommonModule,
        NgbModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatCardModule
    ],
    exports: [
        NgbModule,
        AlertComponent,
        LoadingSpinnerComponent,
        AlertComponent,
        DropdownDirective,
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatCardModule
    ]
})

export class SharedModule {}
