document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("header[id], section[id]");
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navbarToggler = document.querySelector(".navbar-toggler");

  const activateLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.add("active");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections.length > 0) {
        const currentId = visibleSections[0].target.id;
        activateLink(currentId);
      }
    },
    {
      root: null,
      rootMargin: "-35% 0px -45% 0px",
      threshold: [0.2, 0.4, 0.6]
    }
  );

  sections.forEach((section) => observer.observe(section));

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        activateLink(href.replace("#", ""));
      }

      if (window.innerWidth < 992 && navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) ||
          new bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
      }
    });
  });

  // Asegura que al cargar arriba del todo quede marcado Inicio
  if (window.scrollY < 100) {
    activateLink("inicio");
  }

  // Mejora accesibilidad del botón menú en móviles
  if (navbarToggler && navbarCollapse) {
    navbarCollapse.addEventListener("shown.bs.collapse", () => {
      navbarToggler.setAttribute("aria-expanded", "true");
    });

    navbarCollapse.addEventListener("hidden.bs.collapse", () => {
      navbarToggler.setAttribute("aria-expanded", "false");
    });
  }
});