import { Modal } from '../js/getModal'

export class Card {
  constructor ({id, name, img, type, breed, description, age, inoculations, diseases, parasites }) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.type = type;
    this.breed = breed;
    this.description = description;
    this.age = age;
    this.inoculations = inoculations;
    this.diseases = diseases;
    this.parasites = parasites;
  }

  generateCard() {
    let template = '';
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('slider-slide');
    template += `<div class="card__header">
      <figure class="card__figure">
        <img src=${this.img} alt="Katrine" class="card__image">
      </figure>
    </div>
    <div class="card__body">
      <div class="card__title">
        ${this.name}
      </div>
      <div class="card__actions">
        <button class="button button--transparent">Learn more</button>
      </div>
    </div>`;
    card.innerHTML = template;
    card.onclick = () => {
      this.generateModal();
    }
    return card;
  }

  generateModal() {

    let modalTemplate = '';
    
    //let modal = document.querySelector('.modal');
    let modal = document.createElement('div');
    
    modal.classList.add('modal');
    if (document.querySelector('.modal') !== null) {
      document.querySelector('.modal').remove();
    }
  
    modalTemplate += `<div class="modal-inner">
    <button class="button button--circle modal-close">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/>
      </svg>
    </button>
    <div class="modal__image">
      <img src="${this.img}" alt="${this.name}">
    </div>
    <div class="modal__description-wrapper">
      <div class="modal__description-title">
        <h3 class="h3 modal__title">${this.name}</h3>
        <h4 class="h4 modal__sub-title">${this.type}&nbsp;&#8209&nbsp;${this.breed}</h4>
      </div>  
      <p class="h5 modal__description-text">${this.description}</p>
      <ul class="modal__description-list">
        <li><b>Age:</b>&nbsp;${this.age}</li>
        <li><b>Inoculations:</b>&nbsp;${this.inoculations}</li>
        <li><b>Diseases:</b>&nbsp;${this.diseases}</li>
        <li><b>Parasites:</b>&nbsp;${this.parasites}</li>
      </ul>
    </div></div>`;
    document.body.classList.add('modal-open');
    modal.innerHTML = modalTemplate;
    document.body.appendChild(modal);
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.overlay');

    modalClose.onclick = (e) => {
      this.closeModal();
    };

    modalOverlay.onclick = (e) => {
      this.closeModal();
    };
    
    //return modal;
  }

  closeModal() {
    document.querySelector('.modal').remove();
    document.body.classList.remove('modal-open');
  }


}



/*

import { Modal } from '../js/getModal'

export class Card {
  constructor ({id, name, img, type, breed, description, age, inoculations, diseases, parasites }) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.type = type;
    this.breed = breed;
    this.description = description;
    this.age = age;
    this.inoculations = inoculations;
    this.diseases = diseases;
    this.parasites = parasites;
  }

  generateCard() {
    let template = '';
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('slider-slide');
    template += `<div class="card__header">
      <figure class="card__figure">
        <img src=${this.img} alt="Katrine" class="card__image">
      </figure>
    </div>
    <div class="card__body">
      <div class="card__title">
        ${this.name}
      </div>
      <div class="card__actions">
        <button class="button button--transparent">Learn more</button>
      </div>
    </div>`;
    card.innerHTML = template;
   
    card.onclick = () => {
      let modalTemplate = '';
      
      //let modal = document.querySelector('.modal');
      let modal = document.createElement('div');
      
      modal.classList.add('modal');
      if (document.querySelector('.modal') !== null) {
        document.querySelector('.modal').remove();
      }
    
      modalTemplate += `<div class="modal-inner">
      <button class="button button--circle modal-close">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/>
        </svg>
      </button>
      <div class="modal__image">
        <img src="${this.img}" alt="${this.name}">
      </div>
      <div class="modal__description">
        <h3 class="h3 modal__title">${this.name}</h3>
        <h4 class="h4 modal__sub-title">${this.type}</h4>
        <p class="modal__description">${this.description}</p>
        <ul class="modal__list">
          <li><b>Age:</b>${this.age}</li>
          <li><b>Inoculations:</b>${this.inoculations}</li>
          <li><b>Diseases:</b>${this.diseases}</li>
          <li><b>Parasites:</b>${this.parasites}</li>
        </ul>
      </div></div>`;
      document.body.classList.add('modal-open');
      modal.innerHTML = modalTemplate;
      document.body.appendChild(modal);

      const modalClose = document.querySelector('.modal-close');
  

      modalClose.onclick = (e) => {
        document.querySelector('.modal').remove();
        document.body.classList.remove('modal-open');
      };
      //return modal;
    }
    return card;
  }
}

*/