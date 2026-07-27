const longFormat = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

const shortFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatDate(date: string): string {
  return longFormat.format(new Date(date))
}

export function formatShortDate(date: string): string {
  return shortFormat.format(new Date(date))
}
