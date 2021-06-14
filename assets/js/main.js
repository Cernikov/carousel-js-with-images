
console.log('Hello');

const slides = document.querySelectorAll('.slide');
// console.log(slides);
let currentSlide = 0;

function nextSlide(){
  slides[currentSlide].classList.toggle('active');
currentSlide = (currentSlide+1) % slides.length;
f

  slides[currentSlide].classList.toggle('active')
}


let slideInterval = setInterval(nextSlide,1000)



