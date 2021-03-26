import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { MatProgressBarModule} from '@angular/material/progress-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SafePipeModule } from 'safe-pipe'

import { appRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ResourcesComponent } from './resources/resources.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreatePostComponent,
    ResourcesComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    SafePipeModule,
    MatProgressBarModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    appRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
