import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import { BidsModule } from './bids/bids.module';
import { UserModule } from './user/user.module';
import { AppInterceptor } from './api.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    BidsModule,
    UserModule,
  ],
  providers: [AppInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
