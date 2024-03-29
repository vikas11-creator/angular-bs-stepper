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
import { LoginComponent } from './login/login.component';
import { GridSystemComponent } from './grid-system/grid-system.component';
import { FormArrayComponent } from './form-array/form-array.component';
import { AccordionLoopComponent } from './accordion-loop/accordion-loop.component';
import { VerticalCssStepperComponent } from './vertical-css-stepper/vertical-css-stepper.component';
import { NgforWithFlexComponent } from './ngfor-with-flex/ngfor-with-flex.component';
import { CheckboxWithngForComponent } from './checkbox-withng-for/checkbox-withng-for.component';
import { DynamicFormArrayComponent } from './dynamic-form-array/dynamic-form-array.component';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DiffcssinforloopComponent } from './diffcssinforloop/diffcssinforloop.component';
import { InputPushComponent } from './input-push/input-push.component';
import { NewCssComponent } from './css/new-css/new-css.component';
import { BaseComponent } from './inheritance/base/base/base.component';
import { Component1Component } from './inheritance/comp1/component1/component1.component';
import { Component2Component } from './inheritance/comp2/component2/component2.component';
import { Component3Component } from './inheritance/comp3/component3/component3.component';
import { EditorComponent } from './editor/editor.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AcrossEditorComponent } from './across-editor/across-editor.component';
import { JsPdfComponent } from './js-pdf/js-pdf.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    InputTextModule,
    ColorPickerModule,
    OverlayPanelModule
  ],
  declarations: [
    AppComponent, 
    HelloComponent,
    Stepper1Component,
    Stepper2Component,
    Stepper3Component,
    RegistrationComponent,
    StepperComponent,
    LoginComponent,
    GridSystemComponent,
    FormArrayComponent,
    AccordionLoopComponent,
    VerticalCssStepperComponent,
    NgforWithFlexComponent,
    CheckboxWithngForComponent,
    DynamicFormArrayComponent,
    LandingPageComponent,
    DiffcssinforloopComponent,
    InputPushComponent,
    NewCssComponent,
    BaseComponent,
    Component1Component,
    Component2Component,
    Component3Component,
    EditorComponent,
    AcrossEditorComponent,
    JsPdfComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
