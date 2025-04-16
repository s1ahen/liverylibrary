const cardsData = [
    {
      title: 'C90B',
      description: 'The Pilot Club Livery for the C90B in X-plane',
      image: 'https://media.discordapp.net/attachments/1313249394618925099/1315304852297093171/Screenshot_2024-12-08_at_14.11.22.png?ex=6796dd59&is=67958bd9&hm=2d9435f07066361958e4a49829b47c3780e12c81c253a2337c13e7a5d8960d4a&=&format=webp&quality=lossless&width=1930&height=952',
      buyLink: 'https://forums.x-plane.org/index.php?/files/file/93541-the-pilot-club-livery/'
    },
    {
      title: 'E-Jets E175',
      description: 'The Pilot Club Livery for the E-Jets E175 from X-Crafts. Livery made for The Pilot Club',
      image: 'https://forums.x-plane.org/screenshots/monthly_2024_12/Screenshot2024-12-25at12_13.30-min.png.a6c8f7be6ae48f21dc90e4a51f78e448.png',
      buyLink: 'https://forums.x-plane.org/index.php?/files/file/93713-the-pilot-club-livery-for-x-crafts-e175/'
    },
    {
        title: 'C90B',
        description: 'The Pilot Club Livery for the C90B in X-plane',
        image: 'https://media.discordapp.net/attachments/1313249394618925099/1315304852297093171/Screenshot_2024-12-08_at_14.11.22.png?ex=6796dd59&is=67958bd9&hm=2d9435f07066361958e4a49829b47c3780e12c81c253a2337c13e7a5d8960d4a&=&format=webp&quality=lossless&width=1930&height=952',
        buyLink: 'https://forums.x-plane.org/'
    },
    {
        title: 'C90B',
        description: 'The Pilot Club Livery for the C90B in X-plane',
        image: 'https://media.discordapp.net/attachments/1313249394618925099/1315304852297093171/Screenshot_2024-12-08_at_14.11.22.png?ex=6796dd59&is=67958bd9&hm=2d9435f07066361958e4a49829b47c3780e12c81c253a2337c13e7a5d8960d4a&=&format=webp&quality=lossless&width=1930&height=952',
        buyLink: 'https://forums.x-plane.org/'
    },

    // Add more cards here
  ];
  
 // Get references to the DOM elements
const cardsContainer = document.getElementById('cards-container');
const searchBar = document.getElementById('search-bar');

// Function to create a card
function createCard({ title, description, image, buyLink }) {
  const card = document.createElement('div');
  card.className = 'container';
  card.innerHTML = `
    <div class="wrapper">
      <div class="banner-image" style="background-image: url(${image});"></div>
      <h1>${title}</h1>
      <p>${description}</p>
    </div>
    <div class="button-wrapper"> 
      <a href="${buyLink}" class="btn fill" target="_blank">Download</a>
    </div>
  `;
  return card;
}

// Function to display all cards
function displayCards(data) {
  // Clear the container before displaying cards
  cardsContainer.innerHTML = '';
  // Add each card to the container
  data.forEach(cardData => {
    const card = createCard(cardData);
    cardsContainer.appendChild(card);
  });
}

// Event listener for search functionality
searchBar.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  // Filter cards based on the search query
  const filteredCards = cardsData.filter(card =>
    card.title.toLowerCase().includes(query) || 
    card.description.toLowerCase().includes(query)
  );
  // Display the filtered cards
  displayCards(filteredCards);
});

// Initialize by displaying all cards
displayCards(cardsData);
