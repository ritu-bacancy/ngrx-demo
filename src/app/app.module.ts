import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { studentReducer } from 'src/store/student.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from 'src/store/student.effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ students: studentReducer }),
    EffectsModule.forRoot([StudentEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
