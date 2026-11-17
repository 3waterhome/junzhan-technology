const { orderForm, orderField } = document.currentScript.dataset;
const orderItems = new Map();
const orderList = document.getElementById('shop-items');
const emptyMessage = document.getElementById('shop-empty');
const orderStatus = document.getElementById('shop-status');
const sendOrder = document.getElementById('shop-submit');
const orderTitle = document.getElementById('shop-order-title');

function describeItem({ name, variant, quantity, unit }) {
  return `${name}｜${variant}｜${quantity} ${unit}`;
}

function renderOrder() {
  orderList.replaceChildren();
  for (const [key, item] of orderItems) {
    const row = document.createElement('li');
    const text = document.createElement('span');
    text.textContent = describeItem(item);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = '移除';
    remove.setAttribute('aria-label', '移除 ' + item.name + ' ' + item.variant);
    remove.addEventListener('click', () => {
      orderItems.delete(key);
      renderOrder();
      orderTitle.focus();
      orderStatus.textContent = '已移除 ' + item.name + ' ' + item.variant;
    });
    row.append(text, remove);
    orderList.append(row);
  }
  emptyMessage.hidden = orderItems.size > 0;
  sendOrder.disabled = orderItems.size === 0;
}

for (const form of document.querySelectorAll('.shop-choice')) {
  form.querySelector('button').disabled = false;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const { product, name, unit } = form.dataset;
    const variant = form.elements.variant.value;
    const key = product + '|' + variant;
    const count = form.elements.quantity.valueAsNumber;
    const quantity = (orderItems.get(key)?.quantity || 0) + count;
    if (quantity > 99) {
      orderStatus.textContent = name + ' 同一規格最多填 99。大量需求可在表單備註。';
      return;
    }
    orderItems.set(key, { name, unit, variant, quantity });
    renderOrder();
    orderStatus.textContent = '已加入 ' + name + ' ' + variant + '，目前共 ' + quantity + ' ' + unit + '。';
  });
}

sendOrder.addEventListener('click', () => {
  const url = new URL(orderForm);
  url.searchParams.set('usp', 'pp_url');
  const lines = [...orderItems.values()].map(describeItem);
  url.searchParams.set(orderField, lines.join('\n'));
  // Keep the cart available if the customer returns to adjust it.
  window.open(url.href, '_blank', 'noopener,noreferrer');
});
