const temples = [
  {
    templeName: "Aba Nigeria Temple",
    location: "Aba, Nigeria",
    dedicated: "2005-08-07",
    area: 11500,
    imageUrl: "images/aba_nigeria_temple_lds.jpeg"
  },
  {
    templeName: "Accra Ghana Temple",
    location: "Accra, Ghana",
    dedicated: "2004-01-11",
    area: 17500,
    imageUrl: "images/accra_ghana_temple.jpeg"
  },
  {
    templeName: "Birmingham Alabama Temple",
    location: "Birmingham, Alabama, USA",
    dedicated: "2000-09-03",
    area: 10700,
    imageUrl: "images/birmingham_alabama_temple_lds.jpg"
  },
  {
    templeName: "Cape Town South Africa Temple",
    location: "Cape Town, South Africa",
    dedicated: "2024-06-01",
    area: 18000,
    imageUrl: "images/cape_town_africa_temple_rendering.jpg"
  },
  {
    templeName: "Chicago Illinois Temple",
    location: "Chicago, Illinois, USA",
    dedicated: "1985-08-09",
    area: 29000,
    imageUrl: "images/chicago_illinois_temple.jpg"
  },
  {
    templeName: "Star Valley Wyoming Temple",
    location: "Afton, Wyoming, USA",
    dedicated: "2016-10-30",
    area: 18000,
    imageUrl: "images/star_valley_wyoming_temple.jpg"
  },
  {
    templeName: "Taipei Taiwan Temple",
    location: "Taipei, Taiwan",
    dedicated: "1984-11-17",
    area: 16000,
    imageUrl: "images/taipei_temple.jpg"
  },
  {
    templeName: "Tallahassee Florida Temple",
    location: "Tallahassee, Florida, USA",
    dedicated: "2024-06-02",
    area: 29000,
    imageUrl: "images/tallahassee_florida_temple.jpg"
  },
  {
    templeName: "Yigo Guam Temple",
    location: "Yigo, Guam",
    dedicated: "2020-05-02",
    area: 18689,
    imageUrl: "images/yigo_guam_temple.jpg"
  }
];

// DOM elements
const container = document.querySelector("#templesContainer");
const menu = document.querySelector("#menu");
const toggleButton = document.querySelector("#menu-toggle");

// Create and display temple card
function createCard(temple) {
  const card = document.createElement("section");
  card.classList.add("temple-card");
  card.innerHTML = `
    <h3>${temple.templeName}</h3>
    <p><strong>Location:</strong> ${temple.location}</p>
    <p><strong>Dedicated:</strong> ${new Date(temple.dedicated).toDateString()}</p>
    <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
    <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy" class="lazy-img">
  `;
  container.appendChild(card);
}

function displayTemples(list) {
  container.innerHTML = "";
  list.forEach(createCard);
}

// Filtering logic
function applyFilter(filter) {
  let filtered = temples;
  switch (filter) {
    case "old":
      filtered = temples.filter(t => new Date(t.dedicated).getFullYear() < 2000);
      break;
    case "new":
      filtered = temples.filter(t => new Date(t.dedicated).getFullYear() >= 2000);
      break;
    case "large":
      filtered = temples.filter(t => t.area >= 18000);
      break;
    case "small":
      filtered = temples.filter(t => t.area < 18000);
      break;
    default:
      filtered = temples;
  }
  displayTemples(filtered);
}

// Filter button click
menu.addEventListener("click", (e) => {
  if (e.target.dataset.filter) {
    e.preventDefault();
    applyFilter(e.target.dataset.filter);
  }
});

// Hamburger menu toggle
toggleButton.addEventListener("click", () => {
  menu.classList.toggle("show");
});

// Footer updates
document.querySelector("#currentYear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Initial display
displayTemples(temples);