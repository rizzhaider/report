import {  Category } from './../../shared/model/categories.model';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
@Component({
 
  templateUrl: './categories.component.html'
  
 
})
export class CategoriesComponent implements OnInit {


  totalItems = 0;
  currentPage = 0;
  smallnumPages = 0;
  itemsPerPage = 10;
  saveText = "";
  headerText = "";
 
  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }
 
  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    let startIndex = (event.page - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    this.displayCategory = this.category.slice(startIndex, endIndex)
  }

   public newCatModal;
   @ViewChild('categoryModal') _categoryModal: any;
   public category:Category[];
   public displayCategory:Category[];
   public categoryItem: Category = new Category();
   public loading:boolean = false;
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.getCategoriesList();
  }

  getCategoriesList(){
    this.loading = true;
    this.categoriesService.getAstroCategoryList().subscribe(
    
        data => {
        this.loading = false;
       this.category = data.categories;
       this.totalItems = this.category.length;
       this.currentPage = 1;
       let startIndex = (this.currentPage - 1) * this.itemsPerPage;
       let endIndex = startIndex + this.itemsPerPage;
       this.displayCategory = this.category.slice(startIndex, endIndex);
       //console.log(this.category);
        }

    )
  }

  updateCategory(Category:Category){
    this.categoryItem = Category;
    this.saveText = "Update";
    this.headerText = "Update Category"
    console.log(this.categoryItem);
    this._categoryModal.show();
  }
  onAddCategory(){
    this.categoryItem = new Category();
    this.saveText = "Save"; 
    this.headerText = "Add New Category" 
    console.log(this.categoryItem);  
    this._categoryModal.show();
  }

}
