import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { StepperComponent } from './stepper/stepper.component';
import { LoginComponent } from './login/login.component';
import { GridSystemComponent } from './grid-system/grid-system.component';
import { FormArrayComponent } from './form-array/form-array.component';
const routes: Routes = [
  {
    path: '',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
