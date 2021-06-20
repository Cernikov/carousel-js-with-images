

function Carousel(containerID = '#carousel', slideID = '.slide'){
  this.container = document.querySelector(containerID);
  this.slides = document.querySelectorAll(slideID);
  // this.indicatorsContainer = document.querySelector('#indicators-container')
  // this.indicators = document.querySelectorAll('.indicator');
  // this.pauseButton = document.querySelector('#pause-btn');
  // this.prevButton = document.querySelector('#prev-btn');
  // this.nextButton = document.querySelector('#next-btn');
  
  this.interval = 1000;
}

Carousel.prototype = {

  _initProps(){
    this.currentSlide = 0;
    this.slidesCount = this.slides.length;
    // this.timerID = null;
    this.isPlaying = true;
    // this.swipeStartX = null;
    // this.swipeEndX = null;
    
    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    this.FA_PREV = `<i class="fas fa-angle-left"></i>`;
    this.FA_NEXT = `<i class="fas fa-angle-right"></i>`;
    this.CODE_SPACE = 'Space';
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
  },

  _initControls(){

    const controls = document.createElement('div');
    const PAUSE = `<span id="pause-btn" class="control control-pause" >${this.FA_PAUSE}</span>`;
    const PREV = `<span id="prev-btn" class="control control-prev" >${this.FA_PREV}</span>`;
    const NEXT = `<span id="next-btn" class="control control-next" >${this.FA_NEXT}</span>`;

//  <div id="controls-container" class="controls">
//     <span id="pause-btn" class="control control-pause" ><i class="fas fa-pause-circle"></i></span>
//     <span id="prev-btn" class="control control-prev" ><i class="fas fa-angle-left"></i></span>
//     <span id="next-btn" class="control control-next" ><i class="fas fa-angle-right"></i></span>
//     </div>

    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;
    this.container.appendChild(controls);

    this.pauseButton = document.querySelector('#pause-btn');
    this.prevButton = document.querySelector('#prev-btn');
    this.nextButton = document.querySelector('#next-btn');
  },

  _initIndicators(){

    const indicators = document.createElement('ol');

    indicators.setAttribute('class', 'indicators');

    for(let i = 0, n = this.slidesCount; i < n; i++){
      const indicator = document.createElement('li');
      indicator.setAttribute('class', 'indicator');
      // indicator.setAttribute('data-slide-to', i);
      indicator.dataset.slideTo = `${i}`;
      if(i===0) indicator.classList.add('active');
      indicators.appendChild(indicator);
    }
    this.container.appendChild(indicators);
    // <ol id="indicators-container" class="indicators">
    // <li class="indicator active" data-slide-to = "0"></li>
    // <li class="indicator" data-slide-to = "1"></li>
    // <li class="indicator" data-slide-to = "2"></li>
    // <li class="indicator" data-slide-to = "3"></li>
    // <li class="indicator" data-slide-to = "4"></li>
    // </ol>

    this.indicatorsContainer = document.querySelector('.indicators')
    this.indicatorsItem = document.querySelectorAll('.indicator');

  },

  _initListeners(){

    this.pauseButton.addEventListener('click', this.pausePlay.bind(this));
    console.log('1'+ this.pausePlay);
    this.prevButton.addEventListener('click', this.prev.bind(this));
    this.nextButton.addEventListener('click', this.next.bind(this))
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    document.addEventListener('keydown', this.pressKey.bind(this));
    // this.container.addEventListener('touchstart', this._swipeStart.bind(this));
    // this.container.addEventListener('touchend', this._swipeEnd.bind(this));
  },

  _gotoSlide(n){
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicatorsItem[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.slidesCount) % this.slidesCount;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicatorsItem[this.currentSlide].classList.toggle('active');
      },
      _gotoNext() {
            this._gotoSlide(this.currentSlide + 1);
          },

      _gotoPrev(){
            this._gotoSlide(this.currentSlide - 1);
          },

      _pause(){
          if(this.isPlaying){
            clearInterval(this.timerID);
            this.isPlaying = false;
            this.pauseButton.innerHTML = this.FA_PLAY
          }
          },

          _play(){
            this.timerID = setInterval(this._gotoNext.bind(this), this.interval);
            this.isPlaying = true;
            this.pauseButton.innerHTML = this.FA_PAUSE
          },

          pausePlay(){
            if(this.isPlaying){
              this._pause();

            }else{
              this._play();
              
            }
          },
          
          next(){
            this._pause();
            this._gotoNext();
          },

          prev(){
            this._pause();
            this._gotoPrev();
          },
          
          _indicate(e){
            const target = e.target;
            if(target && target.classList.contains('indicator')){
              console.log(target);
              console.log(target.dataset.slideTo);
              this._pause();
              this._gotoSlide(+target.dataset.slideTo);
            } 
          },
          
          // _swipeStart(e){
          //   this.swipeStartX = e.changedTouches[0].pageX;
          // },
          
          // _swipeEnd(e){
          //   this.swipeEndX = e.changedTouches[0].pageX;
          //   if(this.swipeStartX - this.swipeEndX > 100 ) this.next();
          //   if(this.swipeStartX - this.swipeEndX < -100 ) this.prev(); 
          // },
          
          pressKey(e){
            if(e.code === this.CODE_LEFT_ARROW) this.prev();
            if(e.code === this.CODE_RIGHT_ARROW) this.next();
            if(e.code === this.CODE_SPACE) this.pausePlay();
            console.log(e)
          },
        
         init(){
          this._initProps();
          this._initControls();
          this._initIndicators();
          this._initListeners();
          this.timerID = setInterval(()=>this._gotoNext(), this.interval)
          }
      
};

function SwipeCarousel(){
  Carousel.apply(this, arguments);
}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype._initListeners = function(){
  Carousel.prototype._initListeners.apply(this);
  this.container.addEventListener('touchstart', this._swipeStart.bind(this));
  this.container.addEventListener('touchend', this._swipeEnd.bind(this));
};

SwipeCarousel.prototype._swipeStart = function(e){
  this.swipeStartX = e.changedTouches[0].pageX;
};

SwipeCarousel.prototype._swipeEnd = function(e){
  this.swipeEndX = e.changedTouches[0].pageX;
  if(this.swipeStartX - this.swipeEndX > 100 ) this.next();
  if(this.swipeStartX - this.swipeEndX < -100 ) this.prev(); 
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




