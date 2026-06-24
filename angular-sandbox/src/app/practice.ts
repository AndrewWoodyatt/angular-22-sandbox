import { Service, signal, computed } from '@angular/core';
import { PracticeSession } from './practice-session';

const STORAGE_KEY = 'sax-practice-sessions';

@Service()
export class Practice {
  private readonly _sessions = signal<PracticeSession[]>(this.load());

  readonly sessions = this._sessions.asReadonly();

  readonly totalMinutes = computed(() =>
    this._sessions().reduce((sum, s) => sum + s.durationMinutes, 0)
  );

  readonly sessionCount = computed(() => this._sessions().length);

  readonly currentStreak = computed(() => this.calcStreak());

  readonly weeklyMinutes = computed(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return this._sessions()
      .filter(s => new Date(s.date) >= weekAgo)
      .reduce((sum, s) => sum + s.durationMinutes, 0);
  });

  add(session: Omit<PracticeSession, 'id'>): void {
    this._sessions.update(list => [
      { ...session, id: crypto.randomUUID() },
      ...list,
    ]);
    this.save();
  }

  remove(id: string): void {
    this._sessions.update(list => list.filter(s => s.id !== id));
    this.save();
  }

  private load(): PracticeSession[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._sessions()));
  }

  private calcStreak(): number {
    const sessions = [...this._sessions()].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (sessions.length === 0) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = 0;
    let checkDate = new Date(today);

    for (const session of sessions) {
      const sessionDate = new Date(session.date);
      sessionDate.setHours(0, 0, 0, 0);

      if (sessionDate.getTime() === checkDate.getTime()) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (sessionDate.getTime() < checkDate.getTime()) {
        break;
      }
    }
    return streak;
  }
}
