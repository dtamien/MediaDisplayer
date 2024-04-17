function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(date) {
  return capitalizeFirstLetter(date.toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' }));
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export { formatDate, formatTime };
