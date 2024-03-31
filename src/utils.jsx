function maximizeFontSize(divId) {
  const div = document.getElementById(divId);
  const maxWidth = div.offsetWidth;
  let fontSize = 100;
  div.style.fontSize = `${fontSize}px`;

  while (div.scrollWidth > maxWidth) {
    fontSize -= 1;
    div.style.fontSize = `${fontSize}px`;
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(date) {
  return capitalizeFirstLetter(date.toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' }));
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export { maximizeFontSize, formatDate, formatTime };