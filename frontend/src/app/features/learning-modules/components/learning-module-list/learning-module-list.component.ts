import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  LearningModule,
  LearningModuleCategory,
  LearningModulesQueryParams,
} from '../../models/learning-module.model';
import { LearningModuleService } from '../../services/learning-module.service';
import { ModuleCardComponent } from '../module-card/module-card.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ProgressSummaryComponent } from '../progress-summary/progress-summary.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-learning-module-list',
  standalone: true,
  imports: [
    CommonModule,
    ModuleCardComponent,
    ProgressSummaryComponent,
    PaginationComponent,
    SearchFilterComponent,
  ],
  templateUrl: './learning-module-list.component.html',
  styleUrls: ['./learning-module-list.component.scss'],
})
export class LearningModuleListComponent implements OnInit {
  // DestroyRef
  private readonly destroyRef = inject(DestroyRef);

  // LearningModuleService
  private readonly learningModuleService = inject(LearningModuleService);

  // Users's selected category
  readonly selectedCategory$ = new BehaviorSubject<
    LearningModuleCategory | undefined
  >(undefined);

  // Categories observable
  readonly categories = this.learningModuleService.categories;

  // Loading and error state
  loading$ = new BehaviorSubject<boolean>(true);
  error$ = new BehaviorSubject<string | null>(null);

  readonly modules$ = this.learningModuleService.modules$;

  readonly progressSummary$ = this.modules$.pipe(
    map((modules) => {
      const total = modules.length;
      const completed = modules.filter((m) => m.completed).length;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
      return { total, completed, percentage };
    })
  );

  ngOnInit(): void {
    this.loadModules();
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target.value !== undefined) {
      this.loadModules({ category: target.value as LearningModuleCategory });
    }
  }

  onToggleCompletion(moduleId: string): void {
    this.learningModuleService
      .toggleCompletion(moduleId)
      ?.pipe(
        tap(() => console.log('Toggled module completion status')),
        catchError((err) => {
          console.error('Error toggling module completion:', err);
          this.error$.next('Failed to update module status.');
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  loadModules(params?: LearningModulesQueryParams): void {
    this.loading$.next(true);
    this.learningModuleService
      .load(params)
      .pipe(
        tap(() => this.loading$.next(false)),
        catchError((err) => {
          console.error('Error loading modules:', err);
          this.error$.next('Failed to load learning modules.');
          this.loading$.next(false);
          return of([] as LearningModule[]);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
