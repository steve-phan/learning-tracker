import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import {
  LearningModule,
  LearningModuleCategory,
  LearningModulesQueryParams,
  LearningModulesResponse,
} from '../models/learning-module.model';

const API_BASE_URL = 'http://localhost:8080/api'; // TODO: move to env

@Injectable({
  providedIn: 'root',
})
export class LearningModuleService {
  constructor(private http: HttpClient) {}

  //1. Single store
  private readonly modulesSubject = new BehaviorSubject<LearningModule[]>([]);
  readonly modules$ = this.modulesSubject.asObservable();

  //2. Keep last params
  private lastParams: LearningModulesQueryParams = {};

  //3. Fetch into the store
  load(params: LearningModulesQueryParams = {}): Observable<LearningModule[]> {
    this.lastParams = params;
    return this.fetchModules(params).pipe(
      tap((modules) => this.modulesSubject.next(modules))
    );
  }

  //4. Backwards compatibility
  getFilteredModules(
    params: LearningModulesQueryParams = {}
  ): Observable<LearningModule[]> {
    // If no params provided, use last known params
    const effectiveParams =
      Object.keys(params).length === 0 ? this.lastParams : params;
    return this.fetchModules(effectiveParams);
  }

  //5. Categories observable
  readonly categories = Object.values(LearningModuleCategory);

  //6. Optimistic update support

  private readonly reload$ = new BehaviorSubject<LearningModulesQueryParams>(
    {} as LearningModulesQueryParams
  );

  // Optimistically update a module in local cache
  toggleCompletion(moduleId: string) {
    const current = this.modulesSubject.getValue();
    const idx = current.findIndex((m) => m.id === moduleId);
    if (idx === -1) return;
    const previous = { ...current[idx] };
    const optimisticModule = {
      ...previous,
      completed: !previous.completed,
    };

    const updatedModules = [...current];
    updatedModules[idx] = optimisticModule;

    this.modulesSubject.next(updatedModules);

    // Send PATH request to backend
    return this.http
      .patch<LearningModule>(`${API_BASE_URL}/modules/${moduleId}`, {
        completed: optimisticModule.completed,
      })
      .pipe(
        tap((serverModule) => {
          const lasted = this.modulesSubject.getValue();
          const i = lasted.findIndex((m) => m.id === moduleId);

          if (i !== -1) {
            const reconciled = [...lasted];
            reconciled[i] = serverModule;
            this.modulesSubject.next(reconciled);
          }
        }),
        catchError((error) => {
          // Revert optimistic update on error
          const reverted = [...this.modulesSubject.getValue()];
          reverted[idx] = previous;
          this.modulesSubject.next(reverted);
          return throwError(() => error || 'Server Error');
        })
      );
  }

  refresh(params: LearningModulesQueryParams): void {
    this.reload$.next(params);
  }

  updateModule(id: string, completed: boolean): Observable<LearningModule> {
    return this.http
      .patch<LearningModule>(`${API_BASE_URL}/modules/${id}`, { completed })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error || 'Server Error');
  }

  private sortModules(modules: LearningModule[]): LearningModule[] {
    const order: Record<string, number> = {
      [LearningModuleCategory.AI]: 1,
      [LearningModuleCategory.DigitalSkills]: 2,
      [LearningModuleCategory.Sustainability]: 3,
    };
    return [...modules].sort((a, b) => {
      return order[a.category] - order[b.category];
    });
  }

  private fetchModules(
    params: LearningModulesQueryParams
  ): Observable<LearningModule[]> {
    return this.http
      .get<LearningModulesResponse>(`${API_BASE_URL}/modules`, {
        params: this.toHttpParams(params),
      })
      .pipe(
        map((response) => this.sortModules(response.modules)),
        tap((modules) => this.modulesSubject.next(modules)), //TODO: check keep cachec for global categories only????
        shareReplay(1),
        catchError(this.handleError)
      );
  }

  private toHttpParams(params: LearningModulesQueryParams) {
    let httpParams = new HttpParams();
    const { category, page, pageSize } = params;
    if (category) {
      httpParams = httpParams.set('category', category);
    }
    if (page !== undefined) {
      httpParams = httpParams.set('page', page.toString());
    }

    if (pageSize !== undefined) {
      httpParams = httpParams.set('pageSize', pageSize.toString());
    }
    return httpParams;
  }
}
