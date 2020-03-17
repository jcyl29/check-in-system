const getLocaleDateString = (
  dateString,
  locale = 'en-US',
  options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  }
) => new Date(dateString).toLocaleDateString(locale, options);

export { getLocaleDateString };
