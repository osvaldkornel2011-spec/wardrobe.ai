export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Jó reggelt';
  if (hour < 18) return 'Jó napot';
  return 'Jó estét';
}
