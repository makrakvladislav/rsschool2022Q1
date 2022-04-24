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
      modal.remove();
      modal.classList.add('modal');
      modalTemplate += `<div class="modal__image"><img src="${this.img}" alt="${this.name}"></div>
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
        <d>
      </div>`;
      modal.innerHTML = modalTemplate;
     
      document.body.appendChild(modal);
      console.log(modal);
      //return modal;
    }
    return card;
  }
}