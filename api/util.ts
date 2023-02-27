export const getLocaleDate = (date: Date) => {
  var options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (date !== undefined)
    return date.toLocaleDateString("es-ES", options).toUpperCase();
  else return null;
};
