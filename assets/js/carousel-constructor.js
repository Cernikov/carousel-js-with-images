

function Carousel(){
  this.container = document.querySelector('#carousel');
  this.slides = document.querySelectorAll('.slide');
  this.indicatorsContainer = document.querySelector('#indicators-container')
  this.indicators = document.querySelectorAll('.indicator');
  this.pauseButton = document.querySelector('#pause-btn');
  this.prevButton = document.querySelector('#prev-btn');
  this.nextButton = document.querySelector('#next-btn');
  
  
  this.currentSlide = 0;
  this.slidesCount = this.slides.length;
  this.interval = 2000;
  this.timerID = null;
  this.isPlaying = true;
  this.swipeStartX = null;
  this.swipeEndX = null;
  
  
  
  this.FA_PAUSE = '<i class="fas fa-pause-circle">';
  this.FA_PLAY = '<i class="fas fa-play-circle">';
  this.CODE_SPACE = 'Space';
  this.CODE_LEFT_ARROW = 'ArrowLeft';
  this.CODE_RIGHT_ARROW = 'ArrowRight';
}

Carousel.prototype = {
  gotoSlide(n){
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.slidesCount) % this.slidesCount;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
      },
      nextSlide() {
        // console.log(this);
            this.gotoSlide(this.currentSlide + 1); 
            console.log(this.gotoSlide);
          },
          
      prevSlide(){
            this.gotoSlide(this.currentSlide - 1);
          },

      pause(){
          if(this.isPlaying){
            clearInterval(this.timerID);
            this.isPlaying = false;
            this.pauseButton.innerHTML = this.FA_PLAY
          }  
          },
          
          play(){
            this.timerID = setInterval(this.nextSlide.bind(this), this.interval);
            this.isPlaying = true;
            this.pauseButton.innerHTML = this.FA_PAUSE
          },
          
          pausePlay(){
            if(this.isPlaying){
              this.pause();  
              
            }else{
              this.play();
              
            }
          },
          
          next(){
            this.pause();
            this.nextSlide();
          },

          prev(){
            this.pause();
            this.prevSlide();
          },
          
          indicate(e){
            const target = e.target;
            if(target && target.classList.contains('indicator')){
              console.log(target);
              console.log(target.dataset.slideTo);
              this.pause();
              this.gotoSlide(+target.dataset.slideTo);
            } 
          },
          
          pressKey(e){
            if(e.code === this.CODE_LEFT_ARROW) this.prev();
            if(e.code === this.CODE_RIGHT_ARROW) this.next();
            if(e.code === this.CODE_SPACE) this.pausePlay();
            console.log(e)
          },
          
          
          swipeStart(e){
            this.swipeStartX = e.changedTouches[0].pageX;
          },
          
          swipeEnd(e){
            this.swipeEndX = e.changedTouches[0].pageX;
            if(this.swipeStartX - this.swipeEndX > 100 ) this.next();
            if(this.swipeStartX - this.swipeEndX < -100 ) this.prev(); 
          },
          
 
          initListeners(){
            this.pauseButton.addEventListener('click', this.pausePlay.bind(this));
            console.log('1'+ this.pausePlay);
            this.prevButton.addEventListener('click', this.prev.bind(this));
            this.nextButton.addEventListener('click', this.next.bind(this))
            this.indicatorsContainer.addEventListener('click', this.indicate.bind(this));
            document.addEventListener('keydown', this.pressKey.bind(this));
            this.container.addEventListener('touchstart', this.swipeStart.bind(this));
            this.container.addEventListener('touchend', this.swipeEnd.bind(this));
          },
        
         init(){
          this.initListeners();
          this.timerID = setInterval(()=>this.nextSlide(), this.interval)
          }
      
};




// (function(time){


//   const container = document.querySelector('#carousel');
//   const slides = document.querySelectorAll('.slide');
//   const indicatorsContainer = document.querySelector('#indicators-container')
//   const indicators = document.querySelectorAll('.indicator');
//   const pauseButton = document.querySelector('#pause-btn');
//   const prevButton = document.querySelector('#prev-btn');
//   const nextButton = document.querySelector('#next-btn');
  
  
//   let currentSlide = 0;
//   let slidesCount = slides.length;
//   let interval = time;
//   let timerID = null;
//   let isPlaying = true;
//   let swipeStartX = null;
//   let swipeEndX = null;
  
  
  
//   const FA_PAUSE = '<i class="fas fa-pause-circle">';
//   const FA_PLAY = '<i class="fas fa-play-circle">';
//   const CODE_SPACE = 'Space';
//   const CODE_LEFT_ARROW = 'ArrowLeft';
//   const CODE_RIGHT_ARROW = 'ArrowRight';
  
  
  
  
//   function gotoSlide(n){
//     slides[currentSlide].classList.toggle('active');
//     indicators[currentSlide].classList.toggle('active');
//     currentSlide = (n + slidesCount) % slidesCount;
//     slides[currentSlide].classList.toggle('active');
//     indicators[currentSlide].classList.toggle('active');
//   }
  
  
//   function nextSlide() {
//     gotoSlide(currentSlide + 1); 
//   }
  
//   function prevSlide(){
//     gotoSlide(currentSlide - 1);
//   }
  
  
  
//   function pause(){
//   if(isPlaying){
//     clearInterval(timerID);
//     isPlaying = false;
//     pauseButton.innerHTML = FA_PLAY
//   }  
//   }
  
//   function play(){
//     timerID = setInterval(nextSlide, interval);
//     isPlaying = true;
//     pauseButton.innerHTML = FA_PAUS
//   }
  
//   function pausePlay(){
//     if(isPlaying){
//       pause();  
//       console.log(isPlaying)
//     }else{
//       play();
//       console.log(isPlaying)
//     }
//   }
  
//   function next(){
//     pause();
//     nextSlide();
//   }
//   function prev(){
//     pause();
//     prevSlide();
//   }
  
//   function indicate(e){
//     const target = e.target;
//     if(target && target.classList.contains('indicator')){
//       console.log(target);
//       console.log(target.dataset.slideTo);
//       pause();
//       gotoSlide(+target.dataset.slideTo);
//     } 
//   }
  
//   function pressKey(e){
//     if(e.code === CODE_LEFT_ARROW) prev();
//     if(e.code === CODE_RIGHT_ARROW) next();
//     if(e.code === CODE_SPACE) pausePlay();
//     console.log(e)
//   }
  
  
//   function swipeStart(e){
//     swipeStartX = e.changedTouches[0].pageX;
//   }
  
//   function swipeEnd(e){
//     swipeEndX = e.changedTouches[0].pageX;
//     if(swipeStartX - swipeEndX > 100 ) next();
//     if(swipeStartX - swipeEndX < -100 ) prev(); 
//   }
  


//   function initListeners(){
//     pauseButton.addEventListener('click', pausePlay);
//     prevButton.addEventListener('click', prev);
//     nextButton.addEventListener('click', next)
//     indicatorsContainer.addEventListener('click', indicate);
//     document.addEventListener('keydown', pressKey);
//     container.addEventListener('touchstart', swipeStart);
//     container.addEventListener('touchend', swipeEnd);
//   }

//   function init(){
//     initListeners();
//     timerID = setInterval(nextSlide, interval)
//   };
// init();


// }(500));




