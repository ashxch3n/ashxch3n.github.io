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
    const modalVideo = document.getElementById('modalVideo');
      if (modalVideo) modalVideo.style.display = 'none';

      // Apply landscape class if applicable
      if (img.dataset.orientation === "landscape") {
        modalImg.classList.add('landscape');
      }
    }

    // Slideshow
    /* currentGallery = img.dataset.gallery
      ? img.dataset.gallery.split(',').map(url => url.trim())
      : [img.src];
    currentIndex = 0;
     
    clearInterval(slideshowInterval); // Stop previous loop if any
    if (currentGallery.length > 1) {
      slideshowInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        modalImg.src = currentGallery[currentIndex];
      }, 2000); // Change image every 2 seconds
    } */
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

// Go to top button
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

// fade-up by scroll
let FadeUp = document.getElementById("fade-up");

window.addEventListener("scroll", function() {
  if (window.scrollY > 100) {
    FadeUp.classList.add("active"); // fade in + slide
  } else {
    FadeUp.classList.remove("active"); // fade out + slide back down
  }
});

// fade-up different times animation
window.addEventListener('DOMContentLoaded', () => {
  const fadeUps = document.querySelectorAll('.fade-up2');

  fadeUps.forEach(item => {
    setTimeout(() => {
      item.classList.add('active'); 
    }, 50);
  });
});

/* animation section */
const sections = document.querySelectorAll(".section");

function updateOpacity() {
  const centerY = window.innerHeight / 2;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;

    const distance = Math.abs(centerY - sectionCenter);

    // normalize: closer to center → opacity closer to 1
    const maxDistance = window.innerHeight / 2; // fade range
    let opacity = 1 - distance / maxDistance;

    // clamp 0–1
    opacity = Math.max(0.2, Math.min(1, opacity));

    section.style.opacity = opacity;

    // Special case: if scrolled to bottom, force last section visible
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 5) { 
      // little buffer (-5) to catch floating point rounding
      sections.forEach(section => {
        section.style.opacity = "0.3";
      });
      sections[sections.length - 1].style.opacity = "1";
    }
  });
}

window.addEventListener("scroll", updateOpacity);
window.addEventListener("resize", updateOpacity);
updateOpacity();