import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PublishPostComponent } from './publish-post/publish-post.component';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AccountDropdownComponent } from './header/account-dropdown/account-dropdown.component';
import { HeaderMobileComponent } from './header-mobile/header-mobile.component';
import { SearchResultComponent } from './search-result/search-result.component';
import {NgxDropzoneModule} from 'ngx-dropzone';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileHeaderComponent } from './profile/profile-header/profile-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    HomeComponent,
    PublishPostComponent,
    ListPostsComponent,
    ProfileComponent,
    AccountDropdownComponent,
    HeaderMobileComponent,
    SearchResultComponent,
    ProfileEditComponent,
    ProfileHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    InfiniteScrollModule,
    NgxDropzoneModule,
    DateValueAccessorModule,
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'dt5t5tmbw' } as CloudinaryConfiguration),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
