export class Modal {
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

  generateModal() {
    console.log('1');
    /*
    let template = '';
    let modal = document.createElement('div');
    modal.setAttribute('data-id', this.id);
    modal.classList.add('modal');
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
    modal.innerHTML = template;
    return modal;
    */
  }
}