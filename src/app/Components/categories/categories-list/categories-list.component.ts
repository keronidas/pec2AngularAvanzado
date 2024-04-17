import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CategoryDTO } from 'src/app/Models/category.dto';
import { CategoryService } from 'src/app/Services/category.service';
import { SharedService } from 'src/app/Services/shared.service';
import { AuthState } from 'src/app/auth/models/authState.interface';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit{
  categories!: CategoryDTO[];
  rowsAffected!: number;
  userId:any;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private sharedService: SharedService,
    private store : Store<AuthState>
  ) {
    this.loadCategories();
  }
ngOnInit(): void {

  // TODO: Aqui no encuentro la forma de obtener el userId
  // ****************************************************
     this.store.select('credentials').subscribe((data) =>this.userId = data?.user_id);      
}
  private async loadCategories(): Promise<void> {
    let errorResponse: any;
    if (this.userId) {
      try {
        this.categoryService.getCategoriesByUserId(
          this.userId
        ).subscribe((data) => {
          this.categories = data;
        });
      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    }
  }

  createCategory(): void {
    this.router.navigateByUrl('/user/category/');
  }

  updateCategory(categoryId: string): void {
    this.router.navigateByUrl('/user/category/' + categoryId);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    let errorResponse: any;

    // show confirmation popup
    let result = confirm(
      'Confirm delete category with id: ' + categoryId + ' .'
    );
    if (result) {
      try {
        this.categoryService.deleteCategory(
          categoryId
        ).subscribe((rowsAffected) => {
          this.rowsAffected = rowsAffected.affected;
        }
        )
          ;
        if (this.rowsAffected > 0) {
          this.loadCategories();
        }
      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    }
  }
}
