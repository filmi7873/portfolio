const counters = document.querySelectorAll('.number');
let hasAnimated = false;

const animateCounters = () => {
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    let count = 0;

    const speed = 100;
    const increment = Math.max(1, Math.floor(target / speed));

    const update = () => {
      count += increment;

      if (count < target) {
        counter.innerText = count;
        setTimeout(update, 20);
      } else {
        counter.innerText = target;
      }
    };

    update();
  });

  hasAnimated = true;
};

const observer = new IntersectionObserver((entries) => {
  const entry = entries[0];
  if (entry.isIntersecting && !hasAnimated) {
    animateCounters();
  }
}, {
  threshold: 0.5
});

const statsSection = document.querySelector('.stats');
if (statsSection) {
  observer.observe(statsSection);
}
