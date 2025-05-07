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

    // Add the new card to the main content
    const main = document.querySelector('main');
    main.appendChild(newCard);

    // Clear the form
    document.getElementById('uploadForm').reset();
}

// Add event listener when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('cardImage');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
}); 