document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Only hide sections for the reveal animation when JS + IntersectionObserver are available.
  if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('main .section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((section) => {
      section.classList.add('reveal');
      observer.observe(section);
    });
  }

  const lightbox = document.getElementById('cert-lightbox');
  const lightboxImage = document.getElementById('cert-lightbox-image');
  const lightboxClose = document.querySelector('.lightbox-close');
  const certImages = document.querySelectorAll('.cert-image');

  if (lightbox && lightboxImage && lightboxClose && certImages.length) {
    let lastFocused = null;

    const openLightbox = (img) => {
      lastFocused = document.activeElement;
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    };

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImage.src = '';
      document.body.style.overflow = '';
      if (lastFocused) {
        lastFocused.focus();
      }
    };

    certImages.forEach((img) => {
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', `Enlarge certificate: ${img.alt}`);

      img.addEventListener('click', () => openLightbox(img));
      img.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(img);
        }
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

  const mapEl = document.getElementById('service-map-canvas');
  if (mapEl && window.L) {
    const center = [40.54375464809823, -79.96329795152734];
    const serviceRadiusMiles = 25; // matches the mileage cutoff in the pricing section
    const serviceRadiusMeters = serviceRadiusMiles * 1609.34;

    const map = L.map(mapEl, { scrollWheelZoom: false }).setView(center, 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const serviceArea = L.circle(center, {
      radius: serviceRadiusMeters,
      color: '#af5b2b',
      weight: 2,
      fillColor: '#af5b2b',
      fillOpacity: 0.15,
    }).addTo(map);

    L.marker(center).addTo(map).bindPopup('Pittsburgh, PA &mdash; service area center');

    map.fitBounds(serviceArea.getBounds(), { padding: [10, 10] });
  }
});
