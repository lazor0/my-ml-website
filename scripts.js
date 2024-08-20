document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('hero-gallery');
    const roleSelect = document.getElementById('role-select');
    const modal = document.getElementById('modal');
    const modalHeroName = document.getElementById('modal-hero-name');
    const modalHeroImage = document.getElementById('modal-hero-image');
    const modalHeroCounters = document.getElementById('modal-hero-counters');
    const closeButton = document.querySelector('.close-button');

    // memunculkan hero sesuai dengan role yang dipilih
    function displayHeroesByRole(heroes, selectedRole) {
        gallery.innerHTML = ''; //clear gallery

        heroes.forEach(hero => {
            if (selectedRole === 'all' || hero.role.includes(selectedRole)) {
                const card = document.createElement('div');
                const roleUpperCase = hero.role.map(role => role.toUpperCase()).join(', ');
                card.className = 'hero-card';
                card.innerHTML = `
                <img src="img/${hero.image}" alt="${hero.name}"> 
                <h3>${hero.name}</h3> 
                <p>${roleUpperCase}</p>
                `;

                // tambahkan event listener untuk klik
            card.addEventListener('click', function() {
                modalHeroName.textContent = hero.name;
                modalHeroImage.src = `img/${hero.image}`;
                modalHeroImage.style.width = "200px";
                modalHeroImage.style.height = "auto";
                modalHeroImage.alt = hero.name;
                modalHeroCounters.innerHTML = '';

                if (Array.isArray(hero.counters) && hero.counters.length > 0) {
                    hero.counters.forEach(counter => {
                        const counterContainer = document.createElement('div');
                        counterContainer.className = 'counter-container';

                        const counterImage = document.createElement('img');
                        counterImage.src = `img/${counter.image}`;
                        counterImage.style.width = "120px";
                        counterImage.style.height = "auto";
                        counterImage.alt = counter.name;

                        const counterName = document.createElement('p');
                        counterName.textContent = counter.name;

                        counterContainer.appendChild(counterImage);
                        counterContainer.appendChild(counterName);
                        modalHeroCounters.appendChild(counterContainer);
                    });
                    
                } else {
                    modalHeroCounters.innerHTML = "<p>No counters available</p>";
                }

                modal.style.display = "block";
            });
            // tambahkan kartu ke galeri
            gallery.appendChild(card);
            }
        })
    }

    // fetch data dari file heroes.json
    fetch('data/heroes.json')
    .then(response => response.json())
    .then(data => {
        // munculkan semua hero
        displayHeroesByRole(data.heroes, 'all');

        // add event listener to role selection dropdown
        roleSelect.addEventListener('change', function() {
            const selectedRole = this.value;
            displayHeroesByRole(data.heroes, selectedRole);
        })
        // untuk setiap hero, buat kartu hero
        data.heroes.forEach(hero => {
            // buat elemen div untuk kartu hero
            const card = document.createElement('div');
            card.className = 'hero-card';

            // tambahkan konten ke kartu hero
            card.innerHTML = `
                <img src="img/${hero.image}" alt="${hero.name}"> 
                <h3>${hero.name}</h3> 
                <p>${hero.role}</p>
            `;
            
        });
    })
    .catch(error => console.error('Error loading heroes: ', error));

    // close modal when the close button klik
    closeButton.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    document.getElementById('search-hero').addEventListener('input', function() {
        const searchQuery = this.value.toLowerCase();
        const heroCards = document.querySelectorAll('#hero-gallery .hero-card');

        heroCards.forEach(card => {
            const heroName = card.querySelector('h3').textContent.toLowerCase();
            if (heroName.includes(searchQuery)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});