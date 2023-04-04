import update from './update';
import render from './render';
import eventListeners from './eventListeners';

function main() {
  window.requestAnimationFrame(main);
  update();
  render();
}

eventListeners();
main();
export {};
