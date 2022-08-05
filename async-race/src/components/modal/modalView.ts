import Control from '../../common/control';
import style from './modal.css';

export class Modal {
  winner: string;

  winnerTime: string;

  constructor(winner: string, winnerTime: string) {
    this.winner = winner;
    this.winnerTime = winnerTime;
    const parentNode: HTMLElement | null = document.querySelector('.app');
    this.show(parentNode!, this.winner, this.winnerTime);

    console.log(parentNode);
  }

  show(parentNode: HTMLElement, winner: string, winnertTime: string) {
    const modalOverlay = new Control(parentNode, 'div', style['modal-overlay']);
    const modalWindow = new Control(modalOverlay.node, 'div', style.modal);
    const modalClose = new Control(modalWindow.node, 'button', style['modal-close']);
    modalClose.node.innerHTML = `<svg viewBox="0 0 32 32"><path d="M10,10 L22,22 M22,10 L10,22"></path></svg>`;
    const modalText = new Control(
      modalWindow.node,
      'p',
      style['modal-text'],
      `${winner} WIN!!, Time: ${winnertTime} s`
    );
    modalClose.node.onclick = () => {
      this.close(modalOverlay);
    };
    console.log('popUp', winner, winnertTime);
  }

  close(modalOverlay: Control<HTMLElement>) {
    modalOverlay.destroy();
  }
}

export default Modal;
