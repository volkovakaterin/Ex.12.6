/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
export default class DeleteCard {
  delete(event, target) {
    event.preventDefault();
    const item = target.closest('.items-item');
    item.remove();
  }
}
