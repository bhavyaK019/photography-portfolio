document.addEventListener('DOMContentLoaded', () => {
    showSlide(0); // Initialize the first slide
    setupLightbox();
    loadSection('about'); // Load the default section
});

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

// Function to show a specific slide in the carousel
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) slide.classList.add('active');
    });
}

// Navigate to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Navigate to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Load a specific section dynamically into the content area
function loadSection(section) {
    const content = document.getElementById('content');
    if (!content) return;

    switch (section) {
        case 'about':
            content.innerHTML = `
                <section>
                    <h2>About Me</h2>
                    <p>Hello! I’m a passionate photographer who loves capturing beautiful and meaningful moments.</p>
                </section>
            `;
            break;

        case 'gallery':
            content.innerHTML = `
                <section>
                    <h2>Gallery</h2>
                    <div class="gallery-grid" id="gallery-grid"></div>
                </section>
            `;
            loadGallery(); // Load the gallery content dynamically
            break;

        case 'upload':
            content.innerHTML = `
                <section>
                    <h2>Upload a Photo</h2>
                    <div class="upload-container">
                        <input type="file" id="photoInput" accept="image/*" class="file-input">
                        <button onclick="uploadPhoto()" class="upload-button">Upload</button>
                        <div id="upload-progress" class="upload-progress hidden">Uploading...</div>
                    </div>
                </section>
            `;
            break;

        case 'contact':
            content.innerHTML = `
                <section>
                    <h2>Contact Me</h2>
                    <p>Email: <a href="mailto:example@email.com">example@email.com</a></p>
                </section>
            `;
            break;

        default:
            content.innerHTML = `<p>Section not found.</p>`;
    }
}


// Function to upload a photo and save it in localStorage
function uploadPhoto() {
    const photoInput = document.getElementById('photoInput');
    const file = photoInput.files[0];
    const progress = document.getElementById('upload-progress');

    if (!file) {
        alert('No file selected.');
        return;
    }

    progress.classList.remove('hidden');

    const reader = new FileReader();
    reader.onload = function () {
        const photos = JSON.parse(localStorage.getItem('photos')) || [];
        photos.push(reader.result);
        localStorage.setItem('photos', JSON.stringify(photos));
        progress.classList.add('hidden');
        alert('Photo uploaded successfully!');
        loadGallery();
    };
    reader.readAsDataURL(file);
}

// Function to dynamically load gallery content
function loadGallery() {
    const grid = document.getElementById('gallery-grid');
    const photos = JSON.parse(localStorage.getItem('photos')) || [];

    grid.innerHTML = photos.length
        ? photos
              .map(
                  (src, i) => `
                  <div class="gallery-item">
                      <img src="${src}" alt="Photo ${i + 1}" onclick="openLightbox('${src}')">
                      <div class="gallery-caption">Photo ${i + 1}</div>
                  </div>
              `
              )
              .join('')
        : '<p>No photos uploaded yet. Start uploading to fill your gallery!</p>';
}

// Setup the lightbox functionality
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const close = document.getElementById('lightbox-close');

    close.addEventListener('click', () => {
        lightbox.classList.add('hidden');
    });

    window.openLightbox = function (src) {
        lightboxImg.src = src;
        lightbox.classList.remove('hidden');
    };
}
