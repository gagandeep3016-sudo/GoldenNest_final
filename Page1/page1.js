let allProperties = [];
let filteredProperties = [];
let activeType = 'all';
let activeSort = 'default';
let searchTerm = '';
let likedIds = new Set(JSON.parse(localStorage.getItem('gn_likes') || '[]'));

function getRandomLocation() {
  const cities = ["Delhi", "Mumbai", "Bangalore", "Gurgaon", "Noida"];
  return cities[Math.floor(Math.random() * cities.length)];
}

function getRandomImage() {
  const images = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6"
  ];
  return images[Math.floor(Math.random() * images.length)];
}

async function fetchProperties() {
  const container = document.getElementById('cardsContainer');
  container.innerHTML = '';

  const loader = document.createElement('div');
  loader.className = 'loader';

  const spinner = document.createElement('div');
  spinner.className = 'spinner';

  const text = document.createElement('p');
  text.textContent = 'Fetching properties...';

  loader.appendChild(spinner);
  loader.appendChild(text);
  container.appendChild(loader);

  try {
    const res = await fetch('https://dummyjson.com/products?limit=100');
    const data = await res.json();

    allProperties = data.products.map(p => ({
      id: p.id,
      title: p.title,
      price: p.price * 85000,
      category: p.category,
      rating: p.rating,
      image: getRandomImage(),
      location: getRandomLocation(),
      beds: Math.floor(Math.random() * 5) + 1,
      baths: Math.floor(Math.random() * 3) + 1
    }));

    filteredProperties = [...allProperties];
    document.getElementById('liveCount').textContent = allProperties.length;

    applyAll();
  } catch (err) {
    container.innerHTML = '';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'no-results';

    const h3 = document.createElement('h3');
    h3.textContent = 'Something went wrong';

    const p = document.createElement('p');
    p.textContent = 'Could not fetch properties.';

    errorDiv.appendChild(h3);
    errorDiv.appendChild(p);
    container.appendChild(errorDiv);
  }
}

function renderCards(properties) {
  const container = document.getElementById('cardsContainer');
  container.innerHTML = '';

  const countEl = document.getElementById('resultCount');
  countEl.textContent = `Showing ${properties.length} of ${allProperties.length}`;

  if (properties.length === 0) {
    const div = document.createElement('div');
    div.className = 'no-results';

    const h3 = document.createElement('h3');
    h3.textContent = 'No properties found';

    div.appendChild(h3);
    container.appendChild(div);
    return;
  }

  properties.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = p.image;

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = p.title;

    const location = document.createElement('p');
    location.textContent = "📍 " + p.location;

    const details = document.createElement('p');
    details.textContent = `${p.beds} Beds • ${p.baths} Baths`;

    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = '₹' + p.price.toLocaleString('en-IN');

    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'View Details';

    const fav = document.createElement('span');
    fav.textContent = likedIds.has(p.id) ? '❤️' : '🤍';
    fav.style.cursor = 'pointer';

    fav.addEventListener('click', () => {
      toggleLike(p.id, fav);
    });

    body.appendChild(title);
    body.appendChild(location);
    body.appendChild(details);
    body.appendChild(price);
    body.appendChild(btn);
    body.appendChild(fav);

    card.appendChild(img);
    card.appendChild(body);

    container.appendChild(card);
  });
}

function applyAll() {
  let result = activeType === 'all'
    ? [...allProperties]
    : allProperties.filter(p => p.category === activeType);

  if (searchTerm) {
    result = result.filter(p =>
      p.title.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  }

  if (activeSort === 'price-asc') result.sort((a, b) => a.price - b.price);
  if (activeSort === 'price-desc') result.sort((a, b) => b.price - a.price);
  if (activeSort === 'rating-desc') result.sort((a, b) => b.rating - a.rating);

  filteredProperties = result;
  renderCards(filteredProperties);
}

function handleSearch() {
  searchTerm = document.getElementById('searchInput').value.toLowerCase();
  applyAll();
}

function filterType(type, btn) {
  activeType = type;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  applyAll();
}

function handleSort(value) {
  activeSort = value;
  applyAll();
}

function toggleLike(id, el) {
  if (likedIds.has(id)) {
    likedIds.delete(id);
    el.textContent = '🤍';
  } else {
    likedIds.add(id);
    el.textContent = '❤️';
  }
  localStorage.setItem('gn_likes', JSON.stringify([...likedIds]));
}

document.getElementById('themeBtn').addEventListener('click', function () {
  document.body.classList.toggle('light');
});

document.getElementById('hamburger').addEventListener('click', function () {
  document.getElementById('mobileMenu').classList.toggle('open');
});

document.getElementById('searchInput').addEventListener('input', function () {
  searchTerm = this.value.toLowerCase();
  applyAll();
});

fetchProperties();