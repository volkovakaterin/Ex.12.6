/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */

import AddCard from './addCard';
import DeleteCard from './deleteCard';
import DragDrop from './dragDrop';
import SaveState from './saveState';
import Init from './init';

const addCard = new AddCard();
const deleteCard = new DeleteCard();
const dragDrop = new DragDrop();
const saveState = new SaveState(localStorage);
const init = new Init();
const container = document.querySelector('.container');

container.onclick = function (event) {
  const { target } = event;
  if (target.className === 'new-card') {
    addCard.formaForCard(target);
  } else if (target.className === 'add-card') {
    addCard.newCard(event, target);
  } else if (target.className === 'cancel-add') {
    event.preventDefault();
    const parent = target.closest('.items');
    document.querySelector('.form-add-card').remove();
    const button = document.createElement('button');
    button.className = 'new-card';
    button.innerHTML = '+Add another card';
    parent.append(button);
  } else if (target.className === 'delete-card') {
    deleteCard.delete(event, target);
  }
};

container.onmouseover = function (event) {
  const { target } = event;
  if (target.className === 'items-item') {
    target.querySelector('.delete-card').style.visibility = 'visible';
  }
};

container.onmouseout = function (event) {
  const { target } = event;
  const currentTarget = event.relatedTarget;
  if (currentTarget != null && currentTarget.className === 'delete-card') return;
  if (target.className === 'items-item') {
    const deleteBtn = document.querySelectorAll('.delete-card');
    deleteBtn.forEach((btn) => {
      btn.style.visibility = 'hidden';
    });
  }
};

container.onmousedown = function (event) {
  const { target } = event;
  if (target.className === 'items-item') {
    dragDrop.startDrag(target, event);
  }
};
const state = {
  todo: [],
  inprogress: [],
  done: [],
};

window.addEventListener('beforeunload', () => {
  const items = document.querySelectorAll('.items-item');
  items.forEach((item) => {
    if (item.closest('.todo')) {
      state.todo.push(item.innerText);
    } else if (item.closest('.in-progress')) {
      state.inprogress.push(item.innerText);
    } else if (item.closest('.done')) {
      state.done.push(item.innerText);
    }
  });
  saveState.save(state);
});
init.fromSave(saveState.load());
