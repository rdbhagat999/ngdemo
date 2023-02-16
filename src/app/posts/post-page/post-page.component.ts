import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '@app/_models/post';
import { AuthService, PostService } from '@app/_services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent {
  private postService: PostService = inject(PostService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  posts$!: Observable<IPost[]>;

  ngOnInit() {
    this.posts$ = this.postService.getPosts();
    this.route.data.subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
