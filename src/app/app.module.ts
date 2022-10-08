import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { Stepper1Component } from './stepper-1/stepper-1.component';
import { Stepper2Component } from './stepper-2/stepper-2.component';
import { Stepper3Component } from './stepper-3/stepper-3.component';
import { AppRoutingModule } from './app-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { StepperComponent } from './stepper/stepper.component';
@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    Stepper1Component,
    Stepper2Component,
    Stepper3Component,
    RegistrationComponent,
    StepperComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
