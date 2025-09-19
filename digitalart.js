// scroll bar function
function scrollContent(direction) {
  const container = document.getElementById('scroll');

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

/*function scrollContent2(direction) {
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
}*/

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

// fade-up by scroll
let FadeUp = document.getElementById("fade-up");

window.addEventListener("scroll", function() {
  if (window.scrollY > 100) {
    FadeUp.classList.add("active"); // fade in + slide
  } else {
    FadeUp.classList.remove("active"); // fade out + slide back down
  }
});

// Pop-Up
document.querySelectorAll('.item img').forEach(img => {
  img.addEventListener('click', () => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const desc = document.getElementById('imageDescription');
    const title = document.querySelector('.modal-text h2');
    const modalText = document.querySelector('.modal-text');

    // Display
    modal.style.display = 'block';
    modalImg.src = img.src;
    title.textContent = img.dataset.title || "Untitled";
    desc.textContent = img.alt || "No description available.";

    if (img.dataset.title) {
        modalText.style.display = 'block';
    }
    else {
        modalText.style.display = 'none';
    }
    
    if (img.dataset.video) {
        modalImg.style.display = 'none';
        let modalVideo = document.getElementById('modalVideo');
        
        if (!modalVideo) {
            modalVideo = document.createElement('video');
            modalVideo.id = 'modalVideo';
            modalVideo.controls = true;
            modalVideo.style.maxWidth = '90%';
            modalImg.parentElement.insertBefore(modalVideo, modalImg);
        }

        modalVideo.src = img.dataset.video;
        modalVideo.style.display = 'block';
        modalVideo.play();
    } 
    else {
        modalImg.style.display = 'block';
        const modalVideo = document.getElementById('modalVideo');

        if (modalVideo) modalVideo.style.display = 'none';

        if (img.dataset.orientation === "landscape") {
            modalImg.classList.add('landscape');
        } else {
            modalImg.classList.remove('landscape');
        }
    }
    if (img.dataset.video) {
        modalImg.style.display = 'block';
        let modalVideo = document.getElementById('modalVideo');

        if (!modalVideo) {
            modalVideo = document.createElement('video');
            modalVideo.id = 'modalVideo';
            modalVideo.controls = true;
            modalVideo.style.maxWidth = '90%';
            modalImg.parentElement.insertBefore(modalVideo, modalImg);
        }

        modalVideo.src = img.dataset.video;
        modalVideo.style.display = 'block';
    }
  });
});

// Close
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

// Fade Away
const sections = document.querySelectorAll(".section");

function updateOpacity() {
  let closest = null;
  let closestDistance = Infinity;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top);

    if (distance < closestDistance) {
      closestDistance = distance;
      closest = section;
    }
  });

  sections.forEach(section => {
    section.style.opacity = "0.3";
  });

  if (closest) {
    closest.style.opacity = "1";
  }

  // last section
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;

  if (scrollPosition >= pageHeight - 5) { 
    sections.forEach(section => {
      section.style.opacity = "0.3";
    });
    sections[sections.length - 1].style.opacity = "1";
  }
}

window.addEventListener("scroll", updateOpacity);
window.addEventListener("load", updateOpacity);