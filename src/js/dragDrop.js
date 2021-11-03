/* eslint-disable linebreak-style */
/* eslint-disable max-len */
export default class DragDrop {
  constructor() {
    this.element = undefined;
    this.activeDragElement = undefined;
    this.endDrag = this.endDrag.bind(this);
    this.drag = this.drag.bind(this);
    this.shiftX = undefined;
    this.shiftY = undefined;
    this.elementDown = undefined;
  }

  startDrag(target, event) {
    const shadow = document.createElement('div');
    shadow.className = 'shadow';
    shadow.style.cssText = `height:${target.offsetHeight}px; width:${target.offsetWidth}px `;
    this.activeDragElement = target;
    const coords = this.activeDragElement.getBoundingClientRect();
    this.shiftX = event.clientX - coords.left;
    this.shiftY = event.clientY - coords.top;
    target.replaceWith(shadow);
    this.activeDragElement.classList.add('dragged');
    document.body.append(this.activeDragElement);
    this.activeDragElement.style.left = `${event.pageX - this.shiftX}px`;
    this.activeDragElement.style.top = `${event.pageY - this.shiftY}px`;
    this.activeDragElement.hidden = true;
    this.activeDragElement.hidden = false;
    document.documentElement.addEventListener('mouseup', this.endDrag);
    document.documentElement.addEventListener('mousemove', this.drag);
  }

  endDrag(event) {
    if (this.activeDragElement) {
      this.activeDragElement.hidden = true;
      const element = document.elementFromPoint(event.clientX, event.clientY);
      this.activeDragElement.hidden = false;
      this.activeDragElement.classList.remove('dragged');
      this.activeDragElement.style.left = `${0}px`;
      this.activeDragElement.style.top = `${0}px`;
      if (element.className === 'shadow' || element.className === 'items-item') {
        element.replaceWith(this.activeDragElement);
      } else if (element.classList.contains('items')) {
        const btn = element.querySelector('.new-card');
        element.insertBefore(this.activeDragElement, btn);
      } else if (element.className === 'header') {
        element.after(this.activeDragElement);
      }
      if (document.querySelector('.shadow')) { document.querySelector('.shadow').remove(); }
      this.activeDragElement = undefined;
    }
    document.documentElement.removeEventListener('mouseup', this.endDrag);
    document.documentElement.removeEventListener('mousemove', this.drag);
  }

  drag(event) {
    event.preventDefault();

    if (!this.activeDragElement) {
      return;
    }
    this.activeDragElement.style.left = `${event.pageX - this.shiftX}px`;
    this.activeDragElement.style.top = `${event.pageY - this.shiftY}px`;
    this.activeDragElement.hidden = true;
    const elementBelow = document.elementFromPoint(event.clientX, event.clientY);
    this.activeDragElement.hidden = false;
    const middle = elementBelow.getBoundingClientRect().top + (elementBelow.getBoundingClientRect().height) / 2;
    if (elementBelow.className === 'items-item') {
      if (document.querySelector('.shadow')) { document.querySelector('.shadow').remove(); }
      this.elementDown = elementBelow;
      const shadow = document.createElement('li');
      shadow.className = 'shadow';
      shadow.style.height = `${this.activeDragElement.offsetHeight}px`;
      if (event.clientY <= middle) { this.elementDown.before(shadow); } else if (event.clientY > middle) { this.elementDown.after(shadow); }
    }
  }
}
