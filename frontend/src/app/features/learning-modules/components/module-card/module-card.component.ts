import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningModule } from '../../models/learning-module.model';

@Component({
  selector: 'app-module-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './module-card.component.html',
  styleUrls: ['./module-card.component.scss'],
})
export class ModuleCardComponent {
  @Input() module!: LearningModule;
  @Output() toggleCompletion = new EventEmitter<{
    id: string;
    currentStatus: boolean;
  }>();

  onToggle(): void {
    if (!this.module) return;
    this.toggleCompletion.emit({
      id: this.module.id,
      currentStatus: this.module.completed,
    });
  }
}
