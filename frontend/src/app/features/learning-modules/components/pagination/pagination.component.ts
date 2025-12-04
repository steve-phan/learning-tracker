import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LearningModuleService } from '../../services/learning-module.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  private readonly learningModuleService = inject(LearningModuleService);

  readonly totalPages$ = this.learningModuleService.totalPages$;
  page = 1;
  pageSize = 10;

  onNextPage(): void {
    this.page++;
    this.learningModuleService
      .load({
        page: this.page - 1,
        pageSize: this.pageSize,
      })
      .subscribe();
  }

  onPreviousPage(): void {
    if (this.page === 0) return;
    this.page--;
    this.learningModuleService
      .load({
        page: this.page - 1,
        pageSize: this.pageSize,
      })
      .subscribe();
  }
}
