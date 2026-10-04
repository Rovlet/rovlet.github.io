const workspace = document.querySelector('.workspace');
const products = document.querySelector('#products');
const cards = Array.from(products.querySelectorAll('.product-card'));
const category = document.querySelector('#category');
const priority = document.querySelector('#priority');
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const details = cards.map(card => card.querySelector('.product-details'));
function filter() {
  for (const card of cards) card.classList.toggle('filtered-out',
    (category.value !== 'Wszystkie kategorie' && category.value !== card.dataset.category) ||
    (priority.value !== 'Wszystkie priorytety' && priority.value !== card.dataset.priority));
  document.querySelector('.empty').hidden = cards.some(card => !card.classList.contains('filtered-out'));
}
category.addEventListener('change', filter);
priority.addEventListener('change', filter);
function reorder(view) {
  [...cards].sort((a,b) => Number(b.dataset.photo === 'true') - Number(a.dataset.photo === 'true') || (view === 'consult' ? Number(b.dataset.consult === 'true') - Number(a.dataset.consult === 'true') : 0)).forEach(card => products.append(card));
}
function showView(view) {
  workspace.dataset.view = view;
  for (const tab of tabs) {
    const selected = tab.dataset.view === view;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  }
  products.setAttribute('aria-labelledby', `${view}-tab`);
  document.querySelector('#list-title').textContent = view === 'list' ? 'Rzeczy do małych i wielkich chwil' : 'Do wspólnych decyzji';
  document.querySelector('#print').textContent = view === 'list' ? '↓ Zapisz listę jako PDF' : '↓ Zapisz konsultację jako PDF';
  reorder(view);
  for (const card of cards) {
    const open = view === 'consult';
    card.querySelector('.product-details').hidden = !open;
    card.querySelector('.detail-toggle').setAttribute('aria-expanded', String(open));
  }
}
for (const tab of tabs) {
  tab.addEventListener('click', () => showView(tab.dataset.view));
  tab.addEventListener('keydown', event => {
    if (['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) {
      event.preventDefault();
      const next = event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs[1] : tabs.find(candidate => candidate !== tab);
      showView(next.dataset.view); next.focus();
    }
  });
}
for (const card of cards) card.querySelector('.detail-toggle').addEventListener('click', event => {
  const detail = card.querySelector('.product-details');
  detail.hidden = !detail.hidden;
  event.currentTarget.setAttribute('aria-expanded', String(!detail.hidden));
});
for (const image of products.querySelectorAll('img')) {
  const failed = () => {
    const card = image.closest('.product-card');
    card.dataset.photo = 'false'; image.closest('.product-photo').hidden = true;
    reorder(workspace.dataset.view);
  };
  image.addEventListener('error', failed);
  if (image.complete && image.naturalWidth === 0) failed();
}
let previousDetails = [];
window.addEventListener('beforeprint', () => {
  previousDetails = details.map(detail => detail.hidden);
  if (workspace.dataset.view === 'list') details.forEach(detail => { detail.hidden = true; });
});
window.addEventListener('afterprint', () => details.forEach((detail, index) => { detail.hidden = previousDetails[index] ?? true; }));
document.querySelector('#print').addEventListener('click', async event => {
  const button = event.currentTarget;
  button.disabled = true;
  try {
    await Promise.race([Promise.allSettled([document.fonts.ready, ...Array.from(products.querySelectorAll('img'), image => image.decode())]), new Promise(resolve => setTimeout(resolve, 5000))]);
    document.querySelector('#pdf-note').textContent = 'Wybierz „Zapisz jako PDF”. Jeśli okno się nie otworzyło, otwórz stronę w Chrome lub Edge.';
    window.print();
  } finally { button.disabled = false; }
});
