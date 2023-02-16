import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ADMIN_PERSMISSIONS,
  AUTHOR_PERSMISSIONS,
  ROLE,
  USER_PERSMISSIONS,
} from '@app/_models';
import { PostPageComponent } from './post-page/post-page.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PostPageComponent,
    data: {
      roles: {
        [ROLE.ADMIN]: ADMIN_PERSMISSIONS,
        [ROLE.AUTHOR]: AUTHOR_PERSMISSIONS,
        [ROLE.USER]: USER_PERSMISSIONS,
      },
    },
  },
  {
    path: ':id',
    component: PostComponent,
    data: {
      roles: {
        [ROLE.ADMIN]: ADMIN_PERSMISSIONS,
        [ROLE.AUTHOR]: AUTHOR_PERSMISSIONS,
        [ROLE.USER]: USER_PERSMISSIONS,
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
