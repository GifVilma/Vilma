document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('¡Gracias por tu mensaje, Vilma se pondrá en contacto contigo pronto!');
    this.reset();
});