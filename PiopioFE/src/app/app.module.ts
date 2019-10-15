import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthModule} from './auth/auth.module';
import {LandingPageComponent} from './landing-page/landing-page.component';
import { PublishPostComponent } from './publish-post/publish-post.component';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { HomeComponent } from './home/home.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Bootstrap modules (https://valor-software.com/ngx-bootstrap)
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    HomeComponent,
    PublishPostComponent,
    ListPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    ButtonsModule.forRoot(),
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
