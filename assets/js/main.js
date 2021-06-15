
(function(time){


  const container = document.querySelector('#carousel');
  const slides = document.querySelectorAll('.slide');
  const indicatorsContainer = document.querySelector('#indicators-container')
  const indicators = document.querySelectorAll('.indicator');
  const pauseButton = document.querySelector('#pause-btn');
  const prevButton = document.querySelector('#prev-btn');
  const nextButton = document.querySelector('#next-btn');
  
  
  let currentSlide = 0;
  let slidesCount = slides.length;
  let interval = time;
  let timerID = null;
  let isPlaying = true;
  let swipeStartX = null;
  let swipeEndX = null;
  
  
  
  const FA_PAUSE = '<i class="fas fa-pause-circle">';
  const FA_PLAY = '<i class="fas fa-play-circle">';
  const CODE_SPACE = 'Space';
  const CODE_LEFT_ARROW = 'ArrowLeft';
  const CODE_RIGHT_ARROW = 'ArrowRight';
  
  
  
  
  function gotoSlide(n){
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + slidesCount) % slidesCount;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
  }
  
  
  function nextSlide() {
    gotoSlide(currentSlide + 1); 
  }
  
  function prevSlide(){
    gotoSlide(currentSlide - 1);
  }
  
  
  
  function pause(){
  if(isPlaying){
    clearInterval(timerID);
    isPlaying = false;
    pauseButton.innerHTML = FA_PLAY
  }  
  }
  
  function play(){
    timerID = setInterval(nextSlide, interval);
    isPlaying = true;
    pauseButton.innerHTML = FA_PAUS
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
  
  
  function swipeStart(e){
    swipeStartX = e.changedTouches[0].pageX;
  }
  
  function swipeEnd(e){
    swipeEndX = e.changedTouches[0].pageX;
    if(swipeStartX - swipeEndX > 100 ) next();
    if(swipeStartX - swipeEndX < -100 ) prev(); 
  }
  
  
  pauseButton.addEventListener('click', pausePlay);
  prevButton.addEventListener('click', prev);
  nextButton.addEventListener('click', next)
  indicatorsContainer.addEventListener('click', indicate);
  document.addEventListener('keydown', pressKey);
  container.addEventListener('touchstart', swipeStart);
  container.addEventListener('touchend', swipeEnd);
  
  
  
  
  timerID = setInterval(nextSlide, interval)

}(500));




