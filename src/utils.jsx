function maximiseFontSize(divId) {
  const div = document.getElementById(divId);
  let fontSize = 2;
  const maxWidth = div.offsetWidth;
  while (fontSize < 20 && div.scrollWidth <= maxWidth) {
    fontSize++;
    div.style.fontSize = `${fontSize}px`;
  }
  if (div.scrollWidth > maxWidth) {
    div.style.fontSize = `${fontSize - 1}px`;
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export { maximiseFontSize, capitalizeFirstLetter };