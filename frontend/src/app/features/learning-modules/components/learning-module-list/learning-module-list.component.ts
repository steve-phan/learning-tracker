import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LearningModule } from '../../models/learning-module.model';
import { LearningModuleService } from '../../services/learning-module.service';
import { ModuleCardComponent } from '../module-card/module-card.component';
import { ProgressSummaryComponent } from '../progress-summary/progress-summary.component';

@Component({
  selector: 'app-learning-module-list',
  standalone: true,
  imports: [CommonModule, ModuleCardComponent, ProgressSummaryComponent],
  templateUrl: './learning-module-list.component.html',
  styleUrls: ['./learning-module-list.component.scss'],
})
export class LearningModuleListComponent implements OnInit {
  private modulesSubject = new BehaviorSubject<LearningModule[]>([]);
  modules$: Observable<LearningModule[]> = this.modulesSubject.asObservable();

  progressSummary$: Observable<{
    total: number;
    completed: number;
    percentage: number;
  }> = of({ total: 0, completed: 0, percentage: 0 });
  categories$: Observable<string[]> = of([]);

  private allModulesLocal: LearningModule[] = [];
  private modulesLocal: LearningModule[] = [];

  selectedCategory: string | null = null;
  loading = true;
  error: string | null = null;

  constructor(private learningModuleService: LearningModuleService) {}

  ngOnInit(): void {
    this.loadModules();
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const categoryValue = target.value || null;
      this.selectedCategory = categoryValue;
      this.applyFilter();
    }
  }

  onToggleCompletion(moduleId: string, currentStatus: boolean): void {
    const idx = this.modulesLocal.findIndex((m) => m.id === moduleId);
    if (idx === -1) return;
    const allIdx = this.allModulesLocal.findIndex((m) => m.id === moduleId);

    const previousLocal = { ...this.modulesLocal[idx] };
    const previousAll =
      allIdx !== -1 ? { ...this.allModulesLocal[allIdx] } : undefined;

    // Optimistic update in both current view and full cache
    const updatedCompleted = !currentStatus;
    this.modulesLocal[idx] = {
      ...this.modulesLocal[idx],
      completed: updatedCompleted,
    };
    if (allIdx !== -1) {
      this.allModulesLocal[allIdx] = {
        ...this.allModulesLocal[allIdx],
        completed: updatedCompleted,
      };
    }
    this.modulesSubject.next([...this.modulesLocal]);

    this.learningModuleService
      .updateModule(moduleId, updatedCompleted)
      .subscribe({
        next: (updatedModule) => {
          const i1 = this.modulesLocal.findIndex((m) => m.id === moduleId);
          if (i1 !== -1) this.modulesLocal[i1] = updatedModule;
          const i2 = this.allModulesLocal.findIndex((m) => m.id === moduleId);
          if (i2 !== -1) this.allModulesLocal[i2] = updatedModule;
          this.modulesSubject.next([...this.modulesLocal]);
        },
        error: (err) => {
          console.error('Error updating module:', err);
          this.error = 'Failed to update module status.';
          if (idx !== -1) this.modulesLocal[idx] = previousLocal;
          if (allIdx !== -1 && previousAll)
            this.allModulesLocal[allIdx] = previousAll;
          this.modulesSubject.next([...this.modulesLocal]);
        },
      });
  }

  loadModules(): void {
    this.loading = true;
    this.error = null;

    this.learningModuleService
      .getModules()
      .pipe(
        catchError((err) => {
          console.error('Error loading modules:', err);
          this.error = 'Failed to load learning modules.';
          this.loading = false;
          return of([] as LearningModule[]);
        })
      )
      .subscribe((modules) => {
        this.loading = false;
        this.allModulesLocal = modules;
        this.applyFilter();
        this.categories$ = of(
          Array.from(
            new Set(this.allModulesLocal.map((m) => m.category))
          ).filter(Boolean)
        );
      });

    this.progressSummary$ = this.modules$.pipe(
      map((modules) => this.calculateProgressSummary(modules))
    );
  }

  private applyFilter(): void {
    if (this.selectedCategory) {
      this.modulesLocal = this.allModulesLocal.filter(
        (m) => String(m.category) === this.selectedCategory
      );
    } else {
      this.modulesLocal = [...this.allModulesLocal];
    }
    this.modulesSubject.next([...this.modulesLocal]);
  }

  private calculateProgressSummary(modules: LearningModule[]): {
    total: number;
    completed: number;
    percentage: number;
  } {
    const total = modules.length;
    const completed = modules.filter((m) => m.completed).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percentage };
  }
}
