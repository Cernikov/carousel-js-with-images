


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

const FA_PAUSE = '<i class="fas fa-pause-circle">';
const FA_PLAY = '<i class="fas fa-play-circle">';
const CODE_SPACE = 'Space';
const CODE_LEFT_ARROW = 'ArrowLeft';
const CODE_RIGHT_ARROW = 'ArrowRight';




function gotoSlide(n){
  slides[currentSlide].classList.toggle('active');
  console.log('ss'+ currentSlide);

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
  pauseButton.innerHTML = FA_PLAY
}  
}

function play(){
  interval = setInterval(nextSlide, 1000);
  isPlaying = true;
  pauseButton.innerHTML = FA_PAUSE

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
  if(target && target.classList.contains('indicator')){
    console.log(target);
    console.log(target.dataset.slideTo);
    pause();
    gotoSlide(+target.dataset.slideTo);
  }
  
}

function pressKey(e){
  if(e.code === CODE_LEFT_ARROW) prev();
  if(e.code === CODE_RIGHT_ARROW) next();
  if(e.code === CODE_SPACE) pausePlay();
  console.log(e)


}

pauseButton.addEventListener('click', pausePlay);
prevButton.addEventListener('click', prev);
nextButton.addEventListener('click', next)
indicatorsContainer.addEventListener('click', indicate);
document.addEventListener('keydown', pressKey)




interval = setInterval(nextSlide, 1000)



