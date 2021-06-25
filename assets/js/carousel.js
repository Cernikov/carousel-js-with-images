

class Carousel{
  constructor(params) {
   
  let settings = {...{containerID: '#carousel', slideID: '.slide', interval: 5000, isPlaying: true}, ...params};

  console.log(settings);
  this.container = document.querySelector(settings.containerID);
  this.slides = document.querySelectorAll(settings.slideID);
   
  this.interval = settings.interval;
  this.isPlaying = settings.isPlaying
  
}

// _initConfig(objectParams){
// // const defaultSettings = {
   
// //     containerID: '#carousel',
// //     slideID: '.slide',
// //     interval: 5000,
// //     isPlaying: true
// // };



// // if(typeof objectParams !== 'undefined'){
// // defaultSettings.containerID = objectParams.containerID || defaultSettings.containerID;
// // defaultSettings.slideID = objectParams.slideID || defaultSettings.slideID;
// // defaultSettings.interval = objectParams.interval || defaultSettings.interval;
// // defaultSettings.isPlaying = objectParams.isPlaying || defaultSettings.isPlaying
// // }


// return  {...{containerID: '#carousel', slideID: '.slide', interval: 5000, isPlaying: true}, ...objectParams};

// }

_initProps(){
  this.currentSlide = 0;
  this.slidesCount = this.slides.length;

  this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
  this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
  this.FA_PREV = `<i class="fas fa-angle-left"></i>`;
  this.FA_NEXT = `<i class="fas fa-angle-right"></i>`;
  this.CODE_SPACE = 'Space';
  this.CODE_LEFT_ARROW = 'ArrowLeft';
  this.CODE_RIGHT_ARROW = 'ArrowRight';
}

_initControls(){

  const controls = document.createElement('div');
  const PAUSE = `<span id="pause-btn" class="control control-pause" >
                 <span id="fa-pause-icon">${this.FA_PAUSE}</span>
                 <span id="fa-play-icon">${this.FA_PLAY}</span>
  
  </span>`;
  const PREV = `<span id="prev-btn" class="control control-prev" >${this.FA_PREV}</span>`;


  const NEXT = `<span id="next-btn" class="control control-next" >${this.FA_NEXT}</span>`;

  controls.setAttribute('class', 'controls');
  controls.innerHTML =   PREV + PAUSE + NEXT;
  this.container.appendChild(controls);
  

  this.pauseButton = document.querySelector('#pause-btn');
  this.prevButton = document.querySelector('#prev-btn');
  this.nextButton = document.querySelector('#next-btn');

  this.pauseIcon = document.querySelector('#fa-pause-icon');
  this.playIcon = document.querySelector('#fa-play-icon');

  this.isPlaying ? this.pauseIcon.style.opacity = 1 : this.playIcon.style.opacity = 1;
}

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
  this.indicatorsContainer = document.querySelector('.indicators')
  this.indicatorsItem = document.querySelectorAll('.indicator');

}

_initListeners(){

  this.pauseButton.addEventListener('click', this.pausePlay.bind(this));
  console.log('1'+ this.pausePlay);
  this.prevButton.addEventListener('click', this.prev.bind(this));
  this.nextButton.addEventListener('click', this.next.bind(this))
  this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
  document.addEventListener('keydown', this.pressKey.bind(this));
  // this.container.addEventListener('mouseenter', this._pause.bind(this));
  // this.container.addEventListener('mouseleave', this._play.bind(this));
}

_gotoSlide(n){
      this.slides[this.currentSlide].classList.toggle('active');
      this.indicatorsItem[this.currentSlide].classList.toggle('active');
      this.currentSlide = (n + this.slidesCount) % this.slidesCount;
      this.slides[this.currentSlide].classList.toggle('active');
      this.indicatorsItem[this.currentSlide].classList.toggle('active');
    }

    _gotoNext() {
          this._gotoSlide(this.currentSlide + 1);
        }

    _gotoPrev(){
          this._gotoSlide(this.currentSlide - 1);
        }

    _pause(){
        if(this.isPlaying){
          this.pauseIcon.style.opacity = 0;
          this.playIcon.style.opacity = 1;
          clearInterval(this.timerID);
          this.isPlaying = false;  
        }
        }

        _play(){
          if(!this.isPlaying){
            this.pauseIcon.style.opacity = 1;
            this.playIcon.style.opacity = 0;
            this.timerID = setInterval(this._gotoNext.bind(this), this.interval);
            this.isPlaying = true;
          }
        }

        pausePlay(){
          if(this.isPlaying){
            this._pause();

          }else{
            this._play();
            
          }
        }
      
        next(){
          this._pause();
          this._gotoNext();
        }

        prev(){
          this._pause();
          this._gotoPrev();
        }
        
        _indicate(e){
          const target = e.target;
          if(target && target.classList.contains('indicator')){
            console.log(target);
            console.log(target.dataset.slideTo);
            this._pause();
            this._gotoSlide(+target.dataset.slideTo);
          } 
        }
        
        pressKey(e){
          if(e.code === this.CODE_LEFT_ARROW) this.prev();
          if(e.code === this.CODE_RIGHT_ARROW) this.next();
          if(e.code === this.CODE_SPACE) this.pausePlay();
          console.log(e)
        }
      
       init(){
        this._initProps();
        this._initControls();
        this._initIndicators();
        this._initListeners();

        if(this.isPlaying) this.timerID = setInterval(()=>this._gotoNext(), this.interval)
        }
};

