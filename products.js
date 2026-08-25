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

// fade-up animation
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

// Pop-up
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', (e) => {
    // If you don't want clicks on internal controls (links/buttons) to open modal:
    // if (e.target.closest('a, button')) return;

    const img = item.querySelector('img');
    if (!img) return;

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const desc = document.getElementById('imageDescription');
    const title = document.querySelector('.modal-text h2');
    const galleryContainer = modal.querySelector('.image-gallery');
    const modalVid = document.getElementById('modalVideo')
    const videoSrc = img.dataset.video;
    const stack2 = document.querySelector('.stack2');
    
    modal.style.display = 'block';
    modalImg.src = img.src;
    title.textContent = img.dataset.title || "Untitled";
    desc.textContent = img.alt || "No description available.";

    // If video
    if (videoSrc) {
      modalVid.src = videoSrc;
      stack2.style.display = "block"; // or flex/grid depending on your CSS
    } else {
      modalVid.removeAttribute("src"); // clear old video
      stack2.style.display = "none";
    }

    // Clear old gallery
    galleryContainer.innerHTML = "";
    // Build gallery from data-gallery
    if (img.dataset.gallery) {
      const galleryImages = img.dataset.gallery.split(",");
      galleryImages.forEach(src => {
        const thumb = document.createElement('img');
        thumb.src = src.trim();
        thumb.alt = "Gallery image";
        thumb.classList.add("gallery-thumb");
        galleryContainer.appendChild(thumb);

        // When clicking a thumbnail, change the main image
        thumb.addEventListener('click', () => {
          modalImg.src = src.trim();
        });
      });
    }
  });
});

function closeModal() {
  const modal = document.getElementById('imageModal');
  const modalVideo = document.getElementById('modalVideo');

  modal.style.display = 'none';

  if (modalVideo) {
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.removeAttribute("src");
    modalVideo.load();
  }
}

// Close modal on background click
document.getElementById('imageModal').addEventListener('click', (e) => {
  if (e.target.id === 'imageModal') {
    closeModal();
  }
});

document.querySelector('.close-btn').addEventListener('click', () => {
  closeModal();
});