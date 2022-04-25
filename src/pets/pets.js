import "normalize.css";
import "./style.scss";

import { burger } from '../assets/js/burger'
import { Card } from '../assets/js/getData'
//import { getCard } from '../assets/js/getCard'
//import { slider } from '../assets/js/slider'
import file from '../assets/js/pets.json';

const data = [
  {
      "id":1,
      "name": "Katrine",
      "img": "../assets/images/pets-katrine.jpg",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
  },
  {
      "id":2,
      "name": "Jennifer",
      "img": "../assets/images/pets-jennifer.jpg",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
  },
  {
      "id":3,
      "name": "Woody",
      "img": "../assets/images/pets-woody.jpg",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
  },
  {
      "id":4,
      "name": "Sophia",
      "img": "../assets/images/pets-sophia.jpg",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
  },
  {
      "id":5,
      "name": "Timmy",
      "img": "../assets/images/pets-timmy.jpg",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
  },
  {
      "id":6,
      "name": "Charly",
      "img": "../assets/images/pets-charly.jpg",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"]
  },
  {
      "id":7,
      "name": "Scarlett",
      "img": "../assets/images/pets-scarlet.jpg",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
  },
  {
      "id":8,
      "name": "Freddie",
      "img": "../assets/images/pets-freddie.jpg",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
  }
  ]
  
  let cards = [];
  
  async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };
  
  
  getData(file)
  .then(data => data.forEach(item => {
    cards.push(new Card(item));
  }))
  .then(() =>{
    generateCard(cards, 8, '.slider-item');
  });

  const generateCard = (arr, num, container) => {
    const sliderContainer = document.querySelector(container);
    
    function getRandom() {
      const result = [];
      let tempArr = [];
      tempArr = tempArr.concat(arr);
  
      for (let i = 0; i < num; i++) {
        let randomArray = tempArr.sort(() => Math.random() - 0.5).splice(0, 1);
        result.push(...randomArray)
      }
    
      const cards = []
      
      for (let i = 0; i < 6; i++) {
        cards.push(...result)
      }
  
      return cards;
    }

    

    for (let page = 1; page <= 6; page++) {
      const paginationPage = document.createElement('div');
      paginationPage.classList.add('pagination__page');
      let cards = getRandom();
      paginationPage.dataset.pageNumber = page;
      sliderContainer.append(paginationPage);

      document.getElementsByClassName('pagination__page')[0].classList.add('show');

      for (let card = 1; card <= 8; card++) {
        //console.log(page)
        let cardArr = cards.splice(0, 1);
        cardArr.forEach(item => {
          paginationPage.appendChild(item.generateCard());
        })
      }
    }

    let currentPageNumber = 1;
    const btnNext = document.querySelector('.pagination__item--next');
    const btnPrev = document.querySelector('.pagination__item--prev');
    const btnFirst = document.querySelector('.pagination__item--first');
    const btnLast = document.querySelector('.pagination__item--last');
    const pageCounter =  document.querySelector('.pagination__item--active');
    const lastPage = document.querySelectorAll('.pagination__page').length;
    const firstPage = 1;

    console.log(lastPage);

    btnFirst.addEventListener('click', () => {
      let currentPage = document.getElementsByClassName('show');
      currentPageNumber = Number(currentPage[0].dataset.pageNumber) - 1;
      let page = document.querySelector(`[data-page-number="${firstPage}"]`);

      currentPage[0].classList.remove('show');
      page.classList.add('show');
      pageCounter.innerHTML = firstPage;

      btnLast.disabled = false;
      btnNext.disabled = false;
      btnPrev.disabled = true;
      btnFirst.disabled = true;
    });

    btnLast.addEventListener('click', () => {
      let currentPage = document.getElementsByClassName('show');
      currentPageNumber = Number(currentPage[0].dataset.pageNumber) - 1;
      let page = document.querySelector(`[data-page-number="${lastPage}"]`);

      currentPage[0].classList.remove('show');
      page.classList.add('show');
      pageCounter.innerHTML = lastPage;

      btnLast.disabled = true;
      btnNext.disabled = true;
      btnPrev.disabled = false;
      btnFirst.disabled = false;
    });


    btnNext.addEventListener('click', () => {
      let currentPage = document.getElementsByClassName('show');
      currentPageNumber = Number(currentPage[0].dataset.pageNumber) + 1;
      let page = document.querySelector(`[data-page-number="${currentPageNumber}"]`);

      console.log(page)
      console.log(currentPage);
      currentPage[0].classList.remove('show');
      page.classList.add('show');
      console.log(currentPageNumber);
      pageCounter.innerHTML = currentPageNumber;

      if (currentPageNumber === 6) {
        btnNext.disabled = true;
        btnLast.disabled = true;
      } else {
        btnNext.disabled = false;
        btnLast.disabled = false;
      }
      btnPrev.disabled = false;
      btnFirst.disabled = false;
    });

    btnPrev.addEventListener('click', () => {
      let currentPage = document.getElementsByClassName('show');
      currentPageNumber = Number(currentPage[0].dataset.pageNumber) - 1;
      let page = document.querySelector(`[data-page-number="${currentPageNumber}"]`);

      console.log(page)
      console.log(currentPage);
      currentPage[0].classList.remove('show');
      page.classList.add('show');
      console.log(currentPageNumber);
      pageCounter.innerHTML = currentPageNumber;
      if (currentPageNumber === 1) {
        btnPrev.disabled = true;
        btnFirst.disabled = true;
        btnNext.disabled = false;
        btnLast.disabled = false;
      } else {
        btnPrev.disabled = false;
        btnFirst.disabled = false;
        btnNext.disabled = true;
        btnLast.disabled = true;
      }
      btnNext.disabled = false;
      btnLast.disabled = false;
    });


    console.log(btnNext);

}