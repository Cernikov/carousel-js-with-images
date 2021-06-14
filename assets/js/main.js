


const slides = document.querySelectorAll('.slide');
const indicatorsContainer = document.querySelector('#indicators-container')
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
  interval = setInterval(nextSlide, 1000);
  isPlaying = true;
  pauseButton.innerHTML = 'Pause'

}

function pausePlay(){
  if(isPlaying){
    pause();  
    console.log(isPlaying)
  }else{
    play();
    console.log(isPlaying)
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

function indicate(e){
  const target = e.target;
  if(target.classList.contains('indicator')){
    console.log(target)
  }
  
}

pauseButton.addEventListener('click', pausePlay);
prevButton.addEventListener('click', prev);
nextButton.addEventListener('click', next)
indicatorsContainer.addEventListener('click', indicate);




interval = setInterval(nextSlide, 1000)



