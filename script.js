// Function to handle file uploads
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            addNewCard(imageUrl);
        };
        reader.readAsDataURL(file);
    }
}

// Function to add a new card to the page
function addNewCard(imageUrl) {
    const cardName = document.getElementById('cardName').value;
    const cardDescription = document.getElementById('cardDescription').value;
    
    if (!cardName || !cardDescription) {
        alert('Please fill in all fields');
        return;
    }

    const newCard = document.createElement('section');
    newCard.className = 'card';
    
    newCard.innerHTML = `
        <h2>${cardName}</h2>
        <img src="${imageUrl}" alt="${cardName} card">
        <p>${cardDescription}</p>
    `;

    // Add the new card to the cards-container instead of main
    const cardsContainer = document.getElementById('cards-container');
    if (cardsContainer) {
        cardsContainer.appendChild(newCard);
    } else {
        console.error('Cards container not found');
    }

    // Save the card to localStorage
    saveCardToStorage(cardName, cardDescription, imageUrl);

    // Clear the form
    document.getElementById('uploadForm').reset();
}

// Function to save card to localStorage
function saveCardToStorage(name, description, imageUrl) {
    let cards = JSON.parse(localStorage.getItem('pokemonCards') || '[]');
    cards.push({ name, description, imageUrl });
    localStorage.setItem('pokemonCards', JSON.stringify(cards));
}

// Function to load cards from localStorage
function loadCardsFromStorage() {
    const cards = JSON.parse(localStorage.getItem('pokemonCards') || '[]');
    const cardsContainer = document.getElementById('cards-container');
    
    if (cardsContainer) {
        cards.forEach(card => {
            const cardElement = document.createElement('section');
            cardElement.className = 'card';
            cardElement.innerHTML = `
                <h2>${card.name}</h2>
                <img src="${card.imageUrl}" alt="${card.name} card">
                <p>${card.description}</p>
            `;
            cardsContainer.appendChild(cardElement);
        });
    }
}

// Add event listeners when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('cardImage');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }

    // Load saved cards
    loadCardsFromStorage();
}); 