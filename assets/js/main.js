
console.log('Hello');

const slides = document.querySelectorAll('.slide');
// console.log(slides);
let currentSlide = 0;

function nextSlide(){
  slides[currentSlide].classList.toggle('active')
  if (currentSlide===4){
    currentSlide =0 
  } else{
    currentSlide++;
  }
 
  slides[currentSlide].classList.toggle('active')
}

let slideInterval = setInterval(nextSlide,1000)



