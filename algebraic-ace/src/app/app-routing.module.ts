import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ResourcesComponent } from './resources/resources.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'create-post', component: CreatePostComponent},
    {path: 'resources', component: ResourcesComponent},
    {path: 'about', component: AboutComponent},

    {path: '**', redirectTo: 'home'}
];

export const appRoutingModule = RouterModule.forRoot(routes);

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
