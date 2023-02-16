import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';
import { SharedModule } from '@app/_shared/shared.module';
import { PostPageComponent } from './post-page/post-page.component';

@NgModule({
  declarations: [PostsComponent, PostComponent, PostPageComponent],
  imports: [CommonModule, SharedModule, PostsRoutingModule],
})
export class PostsModule {}
