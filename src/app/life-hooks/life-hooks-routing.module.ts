import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LifeHooksComponent } from './life-hooks.component';

const routes: Routes = [{ path: '', component: LifeHooksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LifeHooksRoutingModule {}
