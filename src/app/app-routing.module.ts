import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { UserComponent } from './user/components/user/user.component';
import { CountryComponent } from './country/components/country/country.component';
import { SpeedwayComponent } from './speedway/components/speedway/speedway.component';
import { LoginComponent } from './login/components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserComponent },
  { path: 'country', component: CountryComponent },
  { path: 'speedway', component: SpeedwayComponent },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
