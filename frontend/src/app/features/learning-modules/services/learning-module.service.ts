import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LearningModule } from '../models/learning-module.model';

const API_BASE_URL = 'http://localhost:8080/api'; // TODO: move to env

@Injectable({
  providedIn: 'root',
})
export class LearningModuleService {
  constructor(private http: HttpClient) {}

  getModules(): Observable<LearningModule[]> {
    return this.http.get<any[]>(`${API_BASE_URL}/modules`).pipe(
      map((dtos) => dtos),
      catchError(this.handleError)
    );
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
}
