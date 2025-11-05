// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('bg-[#8B5A2B]/80', 'shadow-lg', 'backdrop-blur-sm');
  } else {
    header.classList.remove('bg-[#8B5A2B]/80', 'shadow-lg', 'backdrop-blur-sm');
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#nav-menu a');
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-section') === id);
      });
    }
  });
}, { rootMargin: "-50% 0px -50% 0px" });

sections.forEach(section => scrollObserver.observe(section));

// Animated Counter for About Us section
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the #, the faster the count

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target.toLocaleString(); // Add commas for thousands
      }
    };
    updateCount();
  });
};

const aboutSectionObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounters();
    aboutSectionObserver.unobserve(entries[0].target); // Animate only once
  }
}, { threshold: 0.8 });

// Fade-in on scroll for sections
document.querySelectorAll('.fade-in-section').forEach(section => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });
  observer.observe(section);
});

// Start observing the About Us section for the counter animation
const aboutSection = document.getElementById('about');
if (aboutSection) aboutSectionObserver.observe(aboutSection);


// Underline animation for heading
document.querySelectorAll('.heading-underline').forEach(h => {
  setTimeout(() => h.classList.add('visible'), 400);
});

// Contact form submit animation
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('form-msg').style.display = 'block';
  setTimeout(() => {
    document.getElementById('form-msg').style.display = 'none';
    document.getElementById('contact-form').reset();
  }, 2500);
});

// Swiper carousel for testimonials
const swiper = new Swiper('.mySwiper', {
  loop: true,
  autoplay: { delay: 3500, disableOnInteraction: false },
  effect: 'slide',
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
});

// Menu filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const filter = this.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-[#D4A017]', 'text-white'));
    this.classList.add('active', 'bg-[#D4A017]', 'text-white');
    document.querySelectorAll('#menu-grid .menu-card-container').forEach(card => {
      if (filter === 'all' || card.dataset.type === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
// Set initial active state for filter button
document.querySelector('.filter-btn[data-filter="all"]').classList.add('bg-[#D4A017]', 'text-white');

// Online Order Cart Logic
const cart = {};
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartPlaceholder = document.getElementById('cart-placeholder');

function updateCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  const items = Object.keys(cart);

  if (items.length === 0) {
    cartPlaceholder.style.display = 'block';
  } else {
    cartPlaceholder.style.display = 'none';
    items.forEach(item => {
      total += cart[item].price * cart[item].quantity;
      const itemEl = document.createElement('div');
      itemEl.className = 'flex justify-between items-center';
      itemEl.innerHTML = `
        <div>
          <h5 class="font-bold">${item}</h5>
          <p class="text-sm text-gray-500">$${cart[item].price.toFixed(2)} x ${cart[item].quantity}</p>
        </div>
        <span class="font-semibold">$${(cart[item].price * cart[item].quantity).toFixed(2)}</span>
      `;
      cartItemsContainer.appendChild(itemEl);
    });
  }
  cartTotalEl.textContent = `$${total.toFixed(2)}`;
}

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const itemName = button.dataset.item;
    const itemPrice = parseFloat(button.dataset.price);

    if (cart[itemName]) {
      cart[itemName].quantity++;
    } else {
      cart[itemName] = { price: itemPrice, quantity: 1 };
    }
    updateCart();
  });
});
updateCart(); // Initial call

// Event registration logic
document.querySelectorAll('.event-register-btn').forEach(button => {
  button.addEventListener('click', function() {
    if (!this.classList.contains('registered')) {
      this.textContent = 'Registered!';
      this.classList.add('registered', 'bg-green-600', 'cursor-not-allowed');
      this.classList.remove('bg-[#4A2C2A]', 'hover:bg-[#8B5A2B]');
      this.disabled = true;
    }
  });
});


// Gallery lightbox (basic)
document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('click', function() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(60,40,20,0.85)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 9999;
    overlay.innerHTML = `<img src="${img.querySelector('img').src}" style="max-width:90vw;max-height:80vh;border-radius:16px;box-shadow:0 8px 32px #4A2C2A;">`;
    overlay.onclick = () => document.body.removeChild(overlay);
    document.body.appendChild(overlay);
  });
});
