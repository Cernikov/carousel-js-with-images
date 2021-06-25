// const carousel = new Carousel('#myCarouselID', '.myCustomClass');
// console.log(carousel)
// carousel.init();
// // carousel.play()

const carousel = new SwipeCarousel({
  containerID: '#myCarouselID',
  interval: 2000,
  isPlaying: true
 
});
carousel.init();

// const carousel = new SwipeCarousel();
// carousel.init();