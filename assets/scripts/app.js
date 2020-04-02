const itemInput = document.getElementById('item1');
const priceInput = document.getElementById('price1');
const totalPrice = document.getElementById('t-price');
const addBtnElement = document.getElementById('add-btn');
const deleteBtnElement = document.getElementById('delete-button');
const alertBoxElement = document.querySelector('.alert-box');
const tableHeader = document.querySelector('thead');
const tbody = document.querySelector('tbody');

const myItems = [];

const hideAlert = () => {
  setTimeout(() => {
    alertBoxElement.classList.remove('visible');
  }, 2000);
};

const clearInput = () => {
  itemInput.value = '';
  priceInput.value = '';
};

const showTableHeader = () => {
  tableHeader.classList.add('visible');
};

const hideTableHeader = () => {
  if (myItems.length === 0) {
    tableHeader.classList.remove('visible');
  }
};

const getTotalPrice = () => {
  const tPrice = myItems.reduce(
    (prevValue, curValue) => (prevValue += curValue.price),
    0
  );
  return (totalPrice.textContent = '$' + tPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
};

const deleteItemHandler = function(id) {
  if (this.checked === false) {
    return;
  }

  this.parentNode.parentNode.remove();
  let itemIndex = 0;
  for (const entry of myItems) {
    if (entry.id === id) {
      break;
    }
    itemIndex++;
  }
  myItems.splice(itemIndex, 1);
  hideTableHeader();
  getTotalPrice();
};

const getNewItem = (id, item, price) => {
  const tableRow = document.createElement('tr');
  tableRow.className = 'table-pointer';
  tableRow.innerHTML = `
      <td>
          <input type="checkbox" name="checkbx" id="checkbx" value="" />
      </td>
      <td>${item}</td>
      <td>$${price}</td>`;

  const checkBox = tableRow.querySelector('#checkbx');

  checkBox.addEventListener('click', function() {
    deleteBtnElement.addEventListener(
      'click',
      deleteItemHandler.bind(this, id)
    );
  });

  tableRow.addEventListener('click', () => {
    checkBox.click();
  });

  tbody.append(tableRow);
};

const addItemHandler = () => {
  if (itemInput.value.trim() === '' || priceInput.value === '') {
    alertBoxElement.classList.add('visible');
    hideAlert();
    return;
  }

  const itemObj = {
    id: Math.random(),
    item: itemInput.value.trim().toUpperCase(),
    price: parseInt(priceInput.value),
    formatPrice() {
      const fprice = this.price
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      return fprice;
    }
  };

  showTableHeader();
  getNewItem(itemObj.id, itemObj.item, itemObj.formatPrice());
  myItems.push(itemObj);
  getTotalPrice();
  clearInput();
};

addBtnElement.addEventListener('click', addItemHandler);
