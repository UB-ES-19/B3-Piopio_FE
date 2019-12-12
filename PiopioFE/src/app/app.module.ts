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
import { PostCardComponent } from './list-posts/post-card/post-card.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationComponent } from './notifications/notification/notification.component';
import { TrendingTopicsComponent } from './home/trending-topics/trending-topics.component';
import { ListPostsHomeComponent } from './list-posts/list-posts-home/list-posts-home.component';
import { ListPostsProfileComponent } from './list-posts/list-posts-profile/list-posts-profile.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CommentBoxComponent } from './publish-post/comment-box/comment-box.component';
import { MentionModule } from 'angular-mentions';
import { ListPostsTopicsComponent } from './list-posts/list-posts-topics/list-posts-topics.component';
import { ListPostsCommentsComponent } from './list-posts/list-posts-comments/list-posts-comments.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

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
    PostCardComponent,
    NotificationsComponent,
    NotificationComponent,
    TrendingTopicsComponent,
    ListPostsHomeComponent,
    ListPostsProfileComponent,
    PostDetailComponent,
    CommentBoxComponent,
    ListPostsTopicsComponent,
    ListPostsCommentsComponent,
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
    MentionModule,
    SweetAlert2Module.forRoot(),
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'dt5t5tmbw' } as CloudinaryConfiguration),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
