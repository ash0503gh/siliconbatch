import type { CollectionEntry } from 'astro:content';

/**
 * Checks if a program is currently open for applications.
 * Considers programs open if isRolling is true, or if closingDate >= currentDate.
 */
export function isProgramOpen(
  program: CollectionEntry<'programs'>,
  currentDate = new Date()
): boolean {
  if (program.data.isRolling) return true;
  const deadline = new Date(program.data.closingDate);
  return deadline.getTime() >= currentDate.getTime();
}

/**
 * Calculates remaining days until deadline.
 */
export function getRemainingDays(
  closingDateStr: string,
  currentDate = new Date()
): number {
  const deadline = new Date(closingDateStr);
  const diffTime = deadline.getTime() - currentDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Formats countdown label for badges and cards.
 */
export function formatDeadlineLabel(
  closingDateStr: string,
  isRolling: boolean,
  currentDate = new Date()
): { label: string; status: 'urgent' | 'open' | 'rolling' | 'closed'; days: number } {
  if (isRolling) {
    return { label: 'Rolling Applications', status: 'rolling', days: 999 };
  }

  const days = getRemainingDays(closingDateStr, currentDate);
  if (days < 0) {
    return { label: 'Applications Closed', status: 'closed', days };
  }
  if (days === 0) {
    return { label: 'Closes Today!', status: 'urgent', days: 0 };
  }
  if (days <= 7) {
    return { label: `Closing in ${days}d`, status: 'urgent', days };
  }
  return { label: `${days} Days Left`, status: 'open', days };
}
