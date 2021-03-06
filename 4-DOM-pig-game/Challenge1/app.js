/*
GAME RULES:

- There are 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wants. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

Additional functionality: 
- When a player rolls 6 two times in a row, all of his result gets lost and it's the next player's turn

*/

var scores, roundScore, activePlayer, gamePlaying, previousRoll;

init();

// Rolling the dice event
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // Random number generation
        var dice = Math.floor(Math.random() * 6) + 1;
        // When a player rolls two 6s in a row
        if (previousRoll === 6 && dice === 6) {
            roundScore = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        }
        
        // Displaying the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = '../dice-' + dice + '.png';
        
        // Updating round score if the rolled number was not a 1
        if (dice !== 1) {
            roundScore += dice;
            previousRoll = dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // If the rolled number was 1, it's the next player's turn
            previousRoll = 0;
            nextPlayer();
        }
    }
});


// HOLD function
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Adding points to global score
        scores[activePlayer] += roundScore;
        // Updating UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // Checking whether the player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    // Next player's turn
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    // Setting start values
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    // Removing the dice image
    document.querySelector('.dice').style.display = 'none';
    
    // Setting all values to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}