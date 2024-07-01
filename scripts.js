document.addEventListener('DOMContentLoaded', function() {
    const animalImages = [
        'flamingo.jpeg',
        'penguin.png',
        'ostrich.png',
        'parrot.jpeg',
        'owl.png',
        'humming.png',
        'flamingo.jpeg',
        'penguin.png',
        'ostrich.png',
        'parrot.jpeg',
        'owl.png',
        'humming.png'
    ]; 

    let flippedCard = null;
    let isBusy = false;

    const gameBoard = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-button');
    const winVideo = document.getElementById('win-video');

    // Shuffle function to randomize card positions
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to create the game board
    function createGameBoard() {
        const shuffledImages = shuffle(animalImages);
        gameBoard.innerHTML = '';
        shuffledImages.forEach((image, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.animal = image; // Store animal image for matching check
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front"></div>
                    <div class="card-back">
                        <img src="image/${image}" alt="Animal">
                    </div>
                </div>`;
            card.addEventListener('click', function() {
                if (isBusy || card.classList.contains('flip')) return;
                flipCard(card);
            });
            gameBoard.appendChild(card);
        });
    }

    // Function to flip a card
    function flipCard(card) {
        card.classList.add('flip');

        if (!flippedCard) {
            flippedCard = card;
        } else {
            // Second card flipped, check for match
            const animal1 = flippedCard.dataset.animal;
            const animal2 = card.dataset.animal;

            if (animal1 === animal2) {
                // Match found
                flippedCard = null;
                if (document.querySelectorAll('.flip').length === animalImages.length) {
                    // All cards flipped, game over
                    setTimeout(() => {
                        winVideo.style.display = 'block';
                        winVideo.play();
                    }, 500);
                }
            } else {
                // No match, flip cards back after a delay
                isBusy = true;
                setTimeout(() => {
                    flippedCard.classList.remove('flip');
                    card.classList.remove('flip');
                    flippedCard = null;
                    isBusy = false;
                }, 1000);
            }
        }
    }

    // Event listener for reset button
    resetButton.addEventListener('click', function() {
        winVideo.style.display = 'none';
        winVideo.pause();
        createGameBoard();
    });

    // Initialize the game board on page load
    createGameBoard();
});