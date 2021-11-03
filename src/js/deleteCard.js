export default class DeleteCard {
  delete(event, target) {
    event.preventDefault();
    console.log('Delete');
    const item = target.closest('.items-item');
    item.remove();
  }
}
