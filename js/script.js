const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const counters = document.querySelectorAll('.number');
let hasAnimatedCounters = false;

const formatValue = (value, suffix) => {
  if (Number.isInteger(value)) {
    return `${value}${suffix}`;
  }

  return `${value.toFixed(1)}${suffix}`;
};

const animateCounters = () => {
  counters.forEach(counter => {
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';
    const steps = 45;
    let currentStep = 0;

    const update = () => {
      currentStep += 1;
      const progress = Math.min(currentStep / steps, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = target * easedProgress;

      counter.textContent = formatValue(currentValue, suffix);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = formatValue(target, suffix);
      }
    };

    update();
  });

  hasAnimatedCounters = true;
};

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        if (entry.target.classList.contains('stat') && !hasAnimatedCounters) {
          animateCounters();
        }
      }
    });
  }, { threshold: 0.18 });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('visible'));
  animateCounters();
}