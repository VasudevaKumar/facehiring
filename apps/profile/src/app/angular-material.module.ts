import { NgModule } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
    imports: [MatDatepickerModule,MatFormFieldModule,MatAutocompleteModule,MatInputModule,MatChipsModule],
    exports: [MatDatepickerModule,MatFormFieldModule,MatAutocompleteModule,MatInputModule,MatChipsModule]
})

export class AngularMaterialModule { }