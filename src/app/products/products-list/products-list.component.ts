import { Component, OnInit } from '@angular/core';
import {ProductsService} from "./products.service";
import {take} from "rxjs";
import {IProduct} from "./product.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products:IProduct[] = [];
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts$().pipe(take(1)).subscribe(results => this.products = results);

  }

}
