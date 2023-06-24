import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
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
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DiffcssinforloopComponent } from './diffcssinforloop/diffcssinforloop.component';
import { InputPushComponent } from './input-push/input-push.component';
import { NewCssComponent } from './css/new-css/new-css.component';
import { Component1Component } from './inheritance/comp1/component1/component1.component';
import { Component2Component } from './inheritance/comp2/component2/component2.component';
import { Component3Component } from './inheritance/comp3/component3/component3.component';
import { EditorComponent } from './editor/editor.component';
const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'css',
    component: NewCssComponent,
  },
  {
    path: 'inputPush',
    component: InputPushComponent,
  },
  {
    path: 'DynamicFormArrayComponent',
    component: DynamicFormArrayComponent,
  },
  {
    path: 'DiffcssinforloopComponent',
    component: DiffcssinforloopComponent,
  },
  {
    path: 'tablecolumnfilter',
    component: CheckboxWithngForComponent,
  },
  {
    path: 'flex',
    component: NgforWithFlexComponent,
  },
  {
    path: 'stepper',
    component: VerticalCssStepperComponent,
  },
  {
    path: 'accordion',
    component: AccordionLoopComponent,
  },
  {
    path: 'formarray',
    component: FormArrayComponent,
  },
  {
    path: 'grid',
    component: GridSystemComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: 'workflow/add/:step',
    component: StepperComponent,
  },
  {
    path: 'workflow/edit/:step/:id',
    component: StepperComponent,
  },
  {
    path: 'editor',
    component: EditorComponent,
  },
  { path: 'pageone', component: Component1Component },
  { path: 'pagetwo', component: Component2Component },
  { path: 'pagethree', component: Component3Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
