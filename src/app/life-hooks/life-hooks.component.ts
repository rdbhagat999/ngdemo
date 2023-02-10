import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-life-hooks',
  templateUrl: './life-hooks.component.html',
  styleUrls: ['./life-hooks.component.scss'],
})
export class LifeHooksComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() data: string = '';

  constructor() {
    console.log('[constructor] is invoked when Angular creates a component');
    console.log(
      '[ngDoCheck] and [ngOnChanges] should not be implemented together on the same component.'
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('[ngOnChanges] When a component’s input property change');
  }

  ngOnInit() {
    console.log(
      '[ngOnInit] when Angular initializes the component for the first time.'
    );
  }

  ngDoCheck() {
    console.log(
      '[ngDoCheck] Invoked when the change detector of the given component is invoked. It allows us to implement our own change detection algorithm for the given component.'
    );
  }

  ngAfterContentInit() {
    console.log(
      '[ngAfterContentInit] Invoked after Angular performs any content projection into the component’s view'
    );
  }

  ngAfterContentChecked() {
    console.log(
      '[ngAfterContentChecked] Invoked each time the content of the given component has been checked by the change detection mechanism of Angular.'
    );
  }

  ngAfterViewInit() {
    console.log(
      '[ngAfterViewInit] Invoked when the component’s view has been fully initialized.'
    );
  }

  ngAfterViewChecked() {
    console.log(
      '[ngAfterViewChecked] Invoked each time the view of the given component has been checked by the change detection mechanism of Angular.'
    );
  }

  ngOnDestroy() {
    console.log(
      '[ngOnDestroy] invoked just before Angular destroys the component. Use this hook to unsubscribe observables and detach event handlers to avoid memory leaks.'
    );
  }
}
