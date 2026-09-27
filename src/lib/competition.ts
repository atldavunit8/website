export type CompetitionState = 'Open' | 'Closed' | 'Deadline not listed';

export function indiaToday(date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date);
  const value = (name: string) => parts.find((part) => part.type === name)?.value ?? '';
  return `${value('year')}-${value('month')}-${value('day')}`;
}

export function competitionState(deadline: string | undefined, today = indiaToday()): CompetitionState {
  if (!deadline) return 'Deadline not listed';
  return deadline < today ? 'Closed' : 'Open';
}

export function competitionSortKey(deadline: string | undefined): string {
  return deadline ?? '9999-12-31';
}
