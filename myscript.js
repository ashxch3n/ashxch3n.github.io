

// scroll bar function
function scrollContent(direction) {
  const container = document.getElementById('scroll');
  const scrollAmount = 370; // match item width + margin

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

function scrollContent2(direction) {
  const container = document.getElementById('scroll2');
  const scrollAmount = 370;

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

function scrollContent3(direction) {
  const container = document.getElementById('scroll3');
  const scrollAmount = 370;

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// Fade-up animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(element => {
  observer.observe(element);
});

// Pop-up feature
let currentGallery = [];
let currentIndex = 0;
let slideshowInterval = null;

document.querySelectorAll('.item img').forEach(img => {
  img.addEventListener('click', () => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const desc = document.getElementById('imageDescription');
    const title = document.querySelector('.modal-text h2');

    // Display
    modal.style.display = 'block';
    modalImg.src = img.src;
    title.textContent = img.dataset.title || "Untitled";
    desc.textContent = img.alt || "No description available.";
  
    if (img.dataset.video) {
      // Hide image, insert video
      modalImg.style.display = 'none';
      if (!document.getElementById('modalVideo')) {
        const vid = document.createElement('video');
        vid.id = 'modalVideo';
        vid.controls = true;
        vid.style.maxWidth = '90%';
        //vid.style.maxHeight = '80vh';
        modalImg.parentElement.insertBefore(vid, modalImg);
      }
      const modalVideo = document.getElementById('modalVideo');
      modalVideo.src = img.dataset.video;
      modalVideo.style.display = 'block';
      modalVideo.play();
    } else {
      // If image
      modalImg.src = img.src;
      modalImg.style.display = 'block';
      const modalVideo = document.getElementById('modalVideo');
      if (modalVideo) modalVideo.style.display = 'none';

      // Apply landscape class if applicable
      if (img.dataset.orientation === "landscape") {
        modalImg.classList.add('landscape');
      }
    }

    // Slideshow
    currentGallery = img.dataset.gallery
      ? img.dataset.gallery.split(',').map(url => url.trim())
      : [img.src];
    currentIndex = 0;
     
    clearInterval(slideshowInterval); // Stop previous loop if any
    if (currentGallery.length > 1) {
      slideshowInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        modalImg.src = currentGallery[currentIndex];
      }, 2000); // Change image every 2 seconds
    }
  });
});

// Close modal on background click
document.getElementById('imageModal').addEventListener('click', (e) => {
  if (e.target.id === 'imageModal') {
    e.target.style.display = 'none';
  }
});

document.querySelector('.close-btn').addEventListener('click', () => {
  document.getElementById('imageModal').style.display = 'none';
  clearInterval(slideshowInterval);
  const modalVideo = document.getElementById('modalVideo');
  if (modalVideo) {
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }
});

document.getElementById('imageModal').addEventListener('click', (e) => {
  if (e.target.id === 'imageModal') {
    const modalVideo = document.getElementById('modalVideo');
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.currentTime = 0;
    }
  }
});

let scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", function() {
  if (window.scrollY > 100) {
    scrollToTopBtn.classList.add("show"); // fade in + slide
  } else {
    scrollToTopBtn.classList.remove("show"); // fade out + slide back down
  }
});

scrollToTopBtn.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});