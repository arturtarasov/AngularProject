import {Component} from '@angular/core';
import {Product} from '../model/product.model';
import {ProductRepository} from '../model/product.repository';

@Component ( {
  selector: 'app-store' ,
  templateUrl: 'store.component.html',
  moduleId: 'module.id'
} )
export class StoreComponent {
  public selectedCategory = null;       /*Выбранная катенория*/
  public productsPerPage = 4;           /*Кол-во отображанмых строк на странице*/
  public selectedPage = 1;              /*Номер выьранной страницы*/
  constructor ( private repository: ProductRepository ) {
  }

  get products (): Product[] {
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    return this.repository.getProducts(this.selectedCategory)
      .slice(pageIndex, pageIndex + this.productsPerPage);
  }

  get categories (): string[] {
    return this.repository.getCategories ();
  }
  changeCategory(newCategory?: string) {
    this.selectedCategory = newCategory;
  }
  changePage(newPage: number) {
    this.selectedPage = newPage;
  }
  changePageSize(newSize: number) {
    this.productsPerPage = Number(newSize);
    this.changePage(1);
  }
  get pageCount(): number {
    return Math.ceil(this.repository
      .getProducts(this.selectedCategory).length / this.productsPerPage)
  }
  /*get pageNumbers(): number[] {
    return Array(Math.ceil(this.repository
      .getProducts(this.selectedCategory).length / this.productsPerPage))
      .fill(0).map((x, i) => i + 1);
  }*/
}
