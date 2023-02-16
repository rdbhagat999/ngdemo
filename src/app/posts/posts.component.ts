import { Component, Input } from '@angular/core';
import { IDummyJsonUser } from '@app/_models';
import { IPost } from '@app/_models/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  @Input() posts: IPost[] = [];

  trackById(index: number, item: IPost) {
    return item.id;
  }
}
