let liveries = [];
let currentPage = 1;
const itemsPerPage = 10;

// Fetch liveries from JSON files
const fetchLiveries = () => {
    Promise.all([
        fetch('liveries/livery1.json').then(response => response.json()),
        fetch('liveries/livery2.json').then(response => response.json()),
        fetch('liveries/livery3.json').then(response => response.json()),
        fetch('liveries/livery4.json').then(response => response.json()),
        fetch('liveries/livery5.json').then(response => response.json()),
        fetch('liveries/livery6.json').then(response => response.json()),
        fetch('liveries/livery7.json').then(response => response.json()),
        fetch('liveries/livery8.json').then(response => response.json()),
        fetch('liveries/livery9.json').then(response => response.json()),
        fetch('liveries/livery10.json').then(response => response.json())
    ])
    .then(liveryData => {
        liveries = liveryData;
        displayLiveries();
        updatePagination();
    })
    .catch(error => console.error('Error loading liveries:', error));
};

// Display the liveries based on the current page
function displayLiveries() {
    const container = document.getElementById("livery-cards-container");
    container.innerHTML = ""; // Clear previous content

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentLiveries = liveries.slice(start, end);

    currentLiveries.forEach(livery => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${livery.images[0]}" alt="${livery.name}">
            <div class="card-body">
                <h3>${livery.name}</h3>
                <a href="#" class="button" onclick="openModal(${liveries.indexOf(livery)})">View Details</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Open the modal to display livery details
function openModal(index) {
    const livery = liveries[index];
    document.getElementById("modal-title").innerText = livery.name;
    
    // Clear the existing images and dynamically create image elements
    const modalImagesContainer = document.getElementById("modal-images-container");
    modalImagesContainer.innerHTML = ""; // Clear previous images

    // Loop through the images array and create img elements for each
    livery.images.forEach(image => {
        const img = document.createElement("img");
        img.src = image;
        img.alt = livery.name;
        img.classList.add("modal-image");
        modalImagesContainer.appendChild(img);
    });

    document.getElementById("modal-description").innerText = livery.description;
    document.getElementById("xplane-forums").href = livery.xplaneForumsLink;
    document.getElementById("xplane-to").href = livery.xplaneToLink;

    document.getElementById("livery-modal").style.display = "flex";
}

// Close the modal
function closeModal() {
    document.getElementById("livery-modal").style.display = "none";
}

// Search through liveries
function searchLiveries() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const filteredLiveries = liveries.filter(livery => 
        livery.name.toLowerCase().includes(searchTerm)
    );
    liveries = filteredLiveries;
    currentPage = 1; // Reset to first page when a search is done
    displayLiveries();
    updatePagination();
}

// Change to the next or previous page
function changePage(direction) {
    currentPage += direction;

    // Check if the page is within range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > Math.ceil(liveries.length / itemsPerPage)) {
        currentPage = Math.ceil(liveries.length / itemsPerPage);
    }

    displayLiveries();
    updatePagination();
}

// Update the pagination buttons based on the current page
function updatePagination() {
    const prevButton = document.getElementById("prev-page");
    const nextButton = document.getElementById("next-page");

    const totalPages = Math.ceil(liveries.length / itemsPerPage);

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages || totalPages === 0;
}

// Initialize the page
fetchLiveries();
