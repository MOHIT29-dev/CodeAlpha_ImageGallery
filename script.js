const galleryData = [];
const categories = ['nature', 'city', 'animals', 'people'];

// Custom descriptive names for each image (29 total, skipping 105)
const imageCaptions = [
  "Concrete Fortress",       // bunker-like structure
  "Berry Haze",              // raspberries and bokeh
  "Park Walk",               // shoes in field
  "Dreamcatcher Sky",        // dreamcatcher silhouette
  "Floral Bloom",            // pink flowers
  "Wheat Horizon",           // wheat in focus

  "Palm Silhouettes",        // palm trees white background
  "Golden Field",            // sunlight on a field
  "Sunset Meadow",           // tree & sunset
  "Vintage Car",             // antique black car
  "Windy Harvest",           // grass blowing
  "Steamy Cup",              // cup of tea

  "Stormy Peaks",            // moody sky and mountain
  "Wet Pavement",            // rain puddle/road
  "Tuscan Pathway",          // Italian cypress & villa
  "Concert Stage",           // stage in spotlight
  "Desert Plains",           // cactus with dry terrain
  "Workspace Still",         // desk and laptop

  "Northern Sky",            // starry night sky
  "Foggy Mountain Valley",   // grayscale hill
  "London at Night",         // city lights & bridge
  "Raindrop Glass",          // close-up of drops
  "Fishing Boat",            // red boat blue sea
  "Brown Hills",             // faded brush hills
  "Citylight Depth",         // urban buildings blurry
  "Industrial Tunnel",       // interior of a tunnel
  "Blush Garden",            // close-up flower blur
  "Sun-kissed Grain",        // close-up golden grass
  "Seaside Kayak"            // clear water & boat
];


const categoriesMap = {
  0: 'nature',
  1: 'city',
  2: 'animals',
  3: 'people'
};

let captionIndex = 0;

for (let i = 101; i <= 130; i++) {
  if (i === 105) continue; // skip broken image
  galleryData.push({
    src: `https://picsum.photos/id/${i}/600/400`,
    category: categoriesMap[i % 4],
    caption: imageCaptions[captionIndex++] || `Untitled`
  });
}



const gallery = document.querySelector('.gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
let filteredImages = [...galleryData];
let currentIndex = 0;

function displayImages(images) {
  gallery.innerHTML = '';
  images.forEach((img, index) => {
    const card = document.createElement('div');
    card.className = 'card magnet';
    card.setAttribute('data-category', img.category);
    card.onclick = () => openLightbox(index);
    card.innerHTML = `
      <img src="${img.src}" alt="${img.caption}" />
      <div class="overlay">${img.caption}</div>
    `;
    gallery.appendChild(card);
  });

  // Refresh magnet effect after adding elements
  Shery.makeMagnet(".magnet");
}

function filterImages(category) {
  filteredImages = category === 'all' ? galleryData : galleryData.filter(img => img.category === category);
  displayImages(filteredImages);
}

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = filteredImages[index].src;
  lightboxCaption.textContent = filteredImages[index].caption;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

function navigate(direction) {
  currentIndex = (currentIndex + direction + filteredImages.length) % filteredImages.length;
  openLightbox(currentIndex);
}

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("dark-mode", isDark);
}

// Load Dark Mode on Page Load
window.onload = () => {
  const isDark = localStorage.getItem("dark-mode") === "true";
  if (isDark) {
    document.body.classList.add("dark");
    document.getElementById("darkToggle").checked = true;
  }
  displayImages(galleryData);
  Shery.mouseFollower();
  Shery.makeMagnet(".magnet");
};

// Keyboard Nav
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') navigate(1);
    else if (e.key === 'ArrowLeft') navigate(-1);
    else if (e.key === 'Escape') closeLightbox();
  }
});
