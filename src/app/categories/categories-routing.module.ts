import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriesListComponent} from "./categories-list/categories-list.component";
import {KeycloakGuard} from "../keycloak.guard";

const routes: Routes = [
  {
    path: '',
    component: CategoriesListComponent,
    canActivate: [KeycloakGuard],
    data: { roles: ['admin'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
