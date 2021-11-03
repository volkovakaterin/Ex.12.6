/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */

export default class AddCard {
  constructor() {
    this.ter = 0;
  }

  formaForCard(element) {
    const form = document.createElement('form');
    form.className = 'form-add-card';
    form.innerHTML = `
    <input class="form-text" type="text" placeholder="Enter a title for this card" data-original-title="" title=""> 
    <button class="add-card">Add</button> 
    <button class="cancel-add"></button>`;
    element.before(form);
    element.remove();
  }

  newCard(event, target) {
    event.preventDefault();
    const task = document.querySelector('.form-text').value;
    const items = target.closest('.items');
    const card = document.createElement('li');
    card.className = 'items-item';
    card.innerHTML = `${task}
    <button class= "delete-card"></button>`;
    const addCard = document.querySelector('.form-add-card');
    addCard.before(card);
    addCard.remove();
    const btnAddCard = document.createElement('button');
    btnAddCard.className = 'new-card';
    btnAddCard.innerHTML = '+Add another card';
    items.append(btnAddCard);
  }
}
