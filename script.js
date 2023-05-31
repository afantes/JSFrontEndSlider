document.addEventListener("DOMContentLoaded", function () {

  // Get the slide images and other elements
  let sliderImages = Array.from(document.querySelectorAll('.slide-image'));
  let slidesCount = sliderImages.length;
  let currentSlide = 1;
  let nextButton = document.querySelector('.next');
  let prevButton = document.querySelector('.prev');
  let paginationElement = document.createElement('ul');

  // Create pagination bullets
  for (let i = 1; i <= slidesCount; i++) {
    let paginationItem = document.createElement('li');
    paginationItem.setAttribute('data-index', i);
    paginationElement.appendChild(paginationItem);
  }

  // Append pagination bullets to the indicators container
  document.querySelector('.indicators').appendChild(paginationElement);
  let paginationCreatedUl = document.querySelector('.indicators').children[0];
  let paginationsBullets = Array.from(paginationCreatedUl.children);

  // Set click event listener for pagination bullets
  for (let i = 0; i < paginationsBullets.length; i++) {
    paginationsBullets[i].onclick = function () {
      currentSlide = parseInt(this.getAttribute('data-index'));
      theChecker();
    }
  }

  // Set click event listener for slide images
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].onclick = function () {
      let linkUrl = this.getAttribute('data-link');
      if (linkUrl) {
        window.open(linkUrl, '_blank');
      }
    }
  }

  // Set click event listener for next and previous buttons
  nextButton.onclick = nextSlide;
  prevButton.onclick = prevSlide;

  // Function to handle next slide
  function nextSlide() {
    if (!nextButton.classList.contains('disabled')) {
      currentSlide++;
      theChecker();
    }
  }

  // Function to handle previous slide
  function prevSlide() {
    if (!prevButton.classList.contains('disabled')) {
      currentSlide--;
      theChecker();
    }
  }

  // Function to update slide and pagination states
  function theChecker() {
    removeAllActive();
    sliderImages[currentSlide - 1].classList.add('active');
    paginationsBullets[currentSlide - 1].classList.add('active');

    currentSlide == 1 ? prevButton.classList.add('disabled') : prevButton.classList.remove('disabled');
    currentSlide == slidesCount ? nextButton.classList.add('disabled') : nextButton.classList.remove('disabled');
  }

  // Function to remove active class from all slides and pagination bullets
  function removeAllActive() {
    sliderImages.forEach(img => img.classList.remove('active'));
    paginationsBullets.forEach(bullet => bullet.classList.remove('active'));
  }

  // Initialize the slider
  theChecker();
});