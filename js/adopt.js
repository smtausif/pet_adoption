// js/adopt.js

// Display animal name in the form automatically from URL query
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const animal = params.get('animal');
    if (animal) {
      document.getElementById('animalName').value = animal;
    }
  });