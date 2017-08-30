import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AlertDialog } from '../dialog/alert.dialog.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ProductService } from './product.service';
import {Product, ProductModalEditComponent} from './index';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  bsModalRef: BsModalRef;
  products: any[];
  searchText: string = '';

  // Pagination setting
  currentPage: number = 1;
  itemsPerPage: number = 10;
  indexPage: number = 0;
  totalItems: number = 0;
  constructor(private productService: ProductService,
    private modalService: BsModalService,
    private dialog: MdDialog) { }

    ngOnInit() {
      this.loadProducts();
    }
  
    addNewProduct() {
      this.openModal('Add new Product', false, new Product());
    }
  
    updateProduct(product: Product) {
      this.openModal('Update Product', false, product);
    }
  
    viewProduct(product: Product) {
      this.openModal('View Product', true, product);
    }
  
    openModal(title, isView, data?: Product) {
  
      this.bsModalRef = this.modalService.show(ProductModalEditComponent);
      this.bsModalRef.content.title = title;
      this.bsModalRef.content.product = data;
      this.bsModalRef.content.isView = isView;
  
      this.modalService.onHide.subscribe(() => {
        this.loadProducts();
      });
    }
    
    loadProducts() {
      this.productService.getProducts(this.searchText, this.itemsPerPage, this.currentPage).subscribe(
        result => {
          this.products = result.products;
          this.totalItems = result.meta.paginate.totalCount;
        },
        err => {
          this.dialog.open(AlertDialog, {
            width: '500px', height: '170px', data: {
              title: 'Information dialog', message: 'No data found.'
            }
          });
        });
    }
  
    refresh() {
      this.searchText = '';
      this.loadProducts();
    }
  
    search() {
      this.loadProducts();
    }
  
    pageChanged(event: any): void {
      this.currentPage = event.page;
      this.indexPage = this.currentPage > 1 ? (this.currentPage - 1) * this.itemsPerPage : 0;
      this.loadProducts();
    }
  
    public confirmDialog(id) {
      this.dialog.open(AlertDialog, {
        width: '400px', height: '170px', data: {
          title: 'Confirm dialog', message: 'Are you sure you want to delete this item?'
        }
      }).afterClosed().subscribe(result => {
        if (result === 'OK') {
          this.productService.removeProduct(id).subscribe(() => {
            this.loadProducts();
          });
        }
      });
    }

}
