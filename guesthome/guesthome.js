const images = [
    "/img/goglepixel9.jpg",
    "/img/airpodspro2.jpg",
    "/img/applewatch10.jpg",
    "/img/ipadair.jpg",
    "/img/samsung24ultra.jpg"
  ];
  
  let currentIndex = 0;
  const sliderImage = document.getElementById("slider-image");
  
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    sliderImage.src = images[currentIndex];
  }
  
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    sliderImage.src = images[currentIndex];
  }
  
  // JavaScript për të ndaluar videot pas një herë shfaqjeje
  window.addEventListener('load', () => {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
      video.play();
      video.onended = () => {
        video.pause(); // Ndalo videon pas përfundimit
      };
    });
  });
  