// Toggle Hamburger Menu
const menuButton = document.querySelector('#menu');
const nav = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuButton.textContent = nav.classList.contains('open') ? '✖' : '≡';
});

document.querySelector('#currentYear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;
