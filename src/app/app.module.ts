import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { MenuModule } from './menu/menu.module';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { CountryModule } from './country/country.module';
import { SpeedwayModule } from './speedway/speedway.module';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HomeModule,
    MenuModule,
    UserModule,
    CountryModule,
    SpeedwayModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
