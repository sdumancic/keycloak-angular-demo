import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsListComponent} from "./products-list/products-list.component";
import {KeycloakGuard} from "../keycloak.guard";

const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent,
    canActivate: [KeycloakGuard],
    data: { roles: ['user'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
