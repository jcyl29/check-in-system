const getLocaleTimeString = (
  dateString,
  locale = 'en-US',
  options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  }
) => new Date(dateString).toLocaleTimeString(locale, options);

export { getLocaleTimeString };
