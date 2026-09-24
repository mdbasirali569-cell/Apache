const items = document.querySelectorAll('.item');

items.forEach(item => {
  item.addEventListener('click', () => {
    items.forEach(i => i.setAttribute('aria-selected', 'false'));
    item.setAttribute('aria-selected', 'true');
  });
});
