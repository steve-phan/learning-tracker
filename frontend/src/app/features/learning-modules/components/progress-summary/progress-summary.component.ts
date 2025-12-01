import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-summary.component.html',
  styleUrls: ['./progress-summary.component.scss'],
})
export class ProgressSummaryComponent {
  @Input() summary: {
    total: number;
    completed: number;
    percentage: number;
  } | null = null;
}
