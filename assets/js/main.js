


const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const pauseButton = document.querySelector('#pause-btn');
const prevButton = document.querySelector('#prev-btn');
const nextButton = document.querySelector('#next-btn');


let currentSlide = 0;
let slidesCount = slides.length;
let interval = null;
let isPlaying = true;


function gotoSlide(n){
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
  currentSlide = (n + slidesCount) % slidesCount;
  indicators[currentSlide].classList.toggle('active');
  slides[currentSlide].classList.toggle('active');

}


function nextSlide() {
  gotoSlide(currentSlide + 1);
  
}

function prevSlide(){
  gotoSlide(currentSlide - 1);

}



function pause(){
if(isPlaying){
  clearInterval(interval);
 
  isPlaying = false;

  pauseButton.innerHTML = 'Play'
}  
}
function play(){
  nterval = setInterval(nextSlide,1000);
  isPlaying = true;
  pauseButton.innerHTML = 'Pause'

}

function pausePlay(){
  if(isPlaying){
    pause();  
    console.log(pause)
  }else{
    play();
    console.log(play)
  }
}

function next(){
  pause();
  nextSlide();
}
function prev(){
  pause();
  prevSlide();
}



pauseButton.addEventListener('click', pausePlay);
prevButton.addEventListener('click', prev);
nextButton.addEventListener('click', next)


interval = setInterval(nextSlide, 1000)



