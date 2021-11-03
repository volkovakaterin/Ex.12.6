/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
export default class Init {
  fromSave(load) {
    const todo = document.querySelector('.todo');
    const inprogress = document.querySelector('.in-progress');
    const done = document.querySelector('.done');
    load.todo.forEach((i) => {
      const card = document.createElement('li');
      card.className = 'items-item';
      card.innerHTML = `
         ${i}
        <button class= "delete-card"></button>`;
      todo.querySelector('.header').after(card);
    });
    load.inprogress.forEach((i) => {
      const card = document.createElement('li');
      card.className = 'items-item';
      card.innerHTML = `
           ${i}
          <button class= "delete-card"></button>`;
      inprogress.querySelector('.header').after(card);
    });
    load.done.forEach((i) => {
      const card = document.createElement('li');
      card.className = 'items-item';
      card.innerHTML = `
           ${i}
          <button class= "delete-card"></button>`;
      done.querySelector('.header').after(card);
    });
  }
}
