


const slides = document.querySelectorAll('.slide');
const pauseButton = document.querySelector('#pause');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');


let currentSlide = 0;
let slidesCount = slides.length;
let interval = null;
let isPlaying = true;

function nextSlide() {
  slides[currentSlide].classList.toggle('active');
  currentSlide = (currentSlide + 1) % slidesCount;
  slides[currentSlide].classList.toggle('active');
}


function pause(){
  if(isPlaying){
    clearInterval(interval);
    isPlaying = false;
    pauseButton.innerHTML = 'Play'
  }else{
    interval = setInterval(nextSlide,1000);
    isPlaying = true;
    pauseButton.innerHTML = 'Pause'
  }

}
pauseButton.addEventListener('click', pause)


interval = setInterval(nextSlide, 1000)



