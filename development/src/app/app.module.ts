import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AstroComponentsModule } from '@astrouxds/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, AstroComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
