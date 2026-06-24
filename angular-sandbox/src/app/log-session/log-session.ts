import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Practice } from '../practice';

const FOCUS_AREAS = ['Scales', 'Arpeggios', 'Repertoire', 'Sight Reading', 'Tone', 'Rhythm', 'Improvisation'];

@Component({
  selector: 'app-log-session',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './log-session.html',
  styleUrl: './log-session.css',
})
export class LogSession {
  protected readonly focusAreas = FOCUS_AREAS;

  private readonly fb = inject(FormBuilder);
  private readonly practice = inject(Practice);
  private readonly router = inject(Router);

  protected readonly form = this.fb.group({
    date: [this.todayString(), Validators.required],
    durationMinutes: [30, [Validators.required, Validators.min(1)]],
    focusAreas: [[] as string[]],
    notes: [''],
  });

  protected toggleFocus(area: string): void {
    const current: string[] = this.form.controls.focusAreas.value ?? [];
    const next = current.includes(area)
      ? current.filter(a => a !== area)
      : [...current, area];
    this.form.controls.focusAreas.setValue(next);
  }

  protected isFocusSelected(area: string): boolean {
    return (this.form.controls.focusAreas.value ?? []).includes(area);
  }

  protected submit(): void {
    if (this.form.invalid) return;
    const { date, durationMinutes, focusAreas, notes } = this.form.value;
    this.practice.add({
      date: date!,
      durationMinutes: durationMinutes!,
      focusAreas: focusAreas ?? [],
      notes: notes ?? '',
    });
    this.router.navigate(['/']);
  }

  private todayString(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
}
