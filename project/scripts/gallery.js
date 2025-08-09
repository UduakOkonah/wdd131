    // Function to add item to cart
    function addToCart(name, price) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      
      // Check if item already exists
      const existing = cart.find(item => item.name === name);
      if(existing) {
        existing.qty += 1;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "order.html"; // Redirect to checkout
    }