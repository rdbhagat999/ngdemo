import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDummyJsonUser, PERMISSION, ROLE } from '@app/_models';
import { IPost } from '@app/_models/post';
import { AuthService, PostService } from '@app/_services';
import { Observable, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post$!: Observable<IPost>;
  rolesOriginal: any;
  roles!: ROLE[];
  permission = PERMISSION;
  sub1$!: Subscription;
  sub2$!: Subscription;

  private authService: AuthService = inject(AuthService);
  private postService: PostService = inject(PostService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  user = this.authService.getSessionStorageUser();

  ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.postService.getPostById(Number(params.get('id')))
      )
    );

    this.sub2$ = this.route.data.subscribe({
      next: ({ roles }: any) => {
        console.log(roles);
        this.rolesOriginal = roles;
        this.roles = Object.keys(roles) as ROLE[];
      },
    });
  }
}
