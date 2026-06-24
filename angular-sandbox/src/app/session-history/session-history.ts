import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Practice } from '../practice';

@Component({
  selector: 'app-session-history',
  imports: [RouterLink],
  templateUrl: './session-history.html',
  styleUrl: './session-history.css',
})
export class SessionHistory {
  protected readonly practice = inject(Practice);

  protected formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-AU', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    });
  }

  protected formatDuration(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  }

  protected delete(id: string): void {
    this.practice.remove(id);
  }
}
