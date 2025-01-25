let currentPage = 1;
const liveriesPerPage = 10;
const liveriesData = []; // Placeholder for your actual liveries data

// Function to fetch and display liveries based on the current page
function loadLiveries() {
    const container = document.getElementById('livery-cards-container');
    container.innerHTML = ''; // Clear previous cards

    const start = (currentPage - 1) * liveriesPerPage;
    const end = start + liveriesPerPage;
    const liveriesToShow = liveriesData.slice(start, end);

    liveriesToShow.forEach(livery => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${livery.photos[0]}" alt="Livery Image">
            <div class="card-body">
                <h3>${livery.name}</h3>
            </div>
        `;

        // Add a click event to open the modal when the entire card is clicked
        card.addEventListener('click', () => openModal(livery));

        container.appendChild(card);
    });

    updatePagination();
}

// Function to open the modal with livery details
function openModal(livery) {
    const modal = document.getElementById('livery-modal');
    document.getElementById('modal-title').innerText = livery.name;

    const modalImagesContainer = document.getElementById('modal-images-container');
    modalImagesContainer.innerHTML = ''; // Clear previous images
    livery.photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo;
        img.alt = `${livery.name} Image`;
        img.classList.add('modal-image');
        modalImagesContainer.appendChild(img);
    });

    document.getElementById('modal-description').innerText = livery.description;
    document.getElementById('xplane-forums').href = livery.xplaneForumsLink;
    document.getElementById('xplane-to').href = livery.xplaneToLink;

    modal.style.display = 'block';
}

// Close the modal
function closeModal() {
    document.getElementById('livery-modal').style.display = 'none';
}

// Handle pagination
function changePage(direction) {
    currentPage += direction;
    loadLiveries();
}

// Update pagination buttons visibility
function updatePagination() {
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage * liveriesPerPage >= liveriesData.length;
}

// Search liveries by name
function searchLiveries() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredLiveries = liveriesData.filter(livery => 
        livery.name.toLowerCase().includes(query)
    );
    liveriesData.length = 0; // Clear current liveries data
    liveriesData.push(...filteredLiveries); // Populate filtered liveries
    currentPage = 1; // Reset to first page
    loadLiveries(); // Re-load the liveries with the new search filter
}

// Initialize page
loadLiveries();
