document.addEventListener("DOMContentLoaded", () => {
  // ======= Dynamic Greeting =======
  function setGreeting() {
    const hour = new Date().getHours();
    const greeting = document.getElementById("greeting");

    if (!greeting) return;

    if (hour < 12) {
      greeting.textContent = "Good Morning! Start your day with sweet treats.";
    } else if (hour < 18) {
      greeting.textContent = "Good Afternoon! Fresh Treats Await You";
    } else {
      greeting.textContent = "Good Evening! End your day with our cakes.";
    }
  }
  setGreeting();

  // ======= Mobile Navigation Toggle =======
  const sidebar = document.querySelector(".sidebar");
  const menuBtn = document.querySelector(".menu-toggle");

  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    document.body.classList.toggle("sidebar-open");
    
    menuBtn.innerHTML = sidebar.classList.contains("open")
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  // Close sidebar when link is clicked
  document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("open");
      document.body.classList.remove("sidebar-open");
      menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });



  // ======= Gallery Scroll Animation =======
  const galleryItems = document.querySelectorAll(".gallery-item");
  function revealGallery() {
    const triggerBottom = window.innerHeight * 0.85;
    galleryItems.forEach(item => {
      const boxTop = item.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        item.classList.add("show");
      }
    });
  }
  window.addEventListener("scroll", revealGallery);
  revealGallery(); // Run on load

  // ======= Save Last Viewed Gallery Image =======
  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const imgSrc = item.querySelector("img").src;
      localStorage.setItem("lastViewedImage", imgSrc);
      alert("Last viewed image saved! ✅");
    });
  });

  // ======= Handle contact form =======
  const form = document.getElementById('contactForm');

  if (form) {
    const replyBox = document.createElement('p');
    replyBox.style.marginTop = '10px';
    replyBox.style.color = '#4CAF50';
    form.appendChild(replyBox);

    form.addEventListener('submit', e => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Save message to localStorage
      let messages = JSON.parse(localStorage.getItem('messages')) || [];
      messages.push({ name, email, message, date: new Date().toLocaleString() });
      localStorage.setItem('messages', JSON.stringify(messages));

      // Show modern reply under the form
      replyBox.textContent = `✅ Thank you, ${name}! Your message has been received.`;
      form.reset();

      // Auto-hide after 5 seconds
      setTimeout(() => replyBox.textContent = '', 5000);
    });
  }
});
