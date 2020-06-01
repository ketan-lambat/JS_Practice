// task 1
// Age in Days

function getAgeInDays() {
    var birthYear = prompt("What year were you born friend?");
    var ageInDays = (2020 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAns = document.createTextNode('You are : ' + ageInDays + ' days old.');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAns);
    document.getElementById('flex-box-result').appendChild(h1);
}

function resetAgeCalc() {
    document.getElementById('ageInDays').remove();
}

//Cat generator
function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    // image.src = "https://media.tenor.com/images/c50ca435dffdb837914e7cb32c1e7edf/tenor.gif";
    div.append(image);

}
function reload() {
    location.reload();
}

//rps game
function rpsGame(yourChoice) {
    // console.log("YourChoice : " + yourChoice.id);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numToChoice(randToRpsInt());
    // console.log("botChoice : " + botChoice);
    result = decideWinner(humanChoice, botChoice);
    // console.log(result);
    message = finalMessage(result);
    // console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numToChoice(num) {
    return ['rock', 'paper', 'scissors'][num];
}

// 1 : human wins
function decideWinner(humanChoice, botChoice) {
    var rpsDatabase = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 },
        'scissors': { 'paper': 1, 'scissors': 0.5, 'rock': 0 },
    }

    var yourScore = rpsDatabase[humanChoice][botChoice];
    var botScore = rpsDatabase[botChoice][humanChoice];

    return [yourScore, botScore];
}

function finalMessage([yourScore, botScore]) {
    if (yourScore === 0) {
        return { 'message': 'You Lost', 'color': 'red' };
    } else if (yourScore === 0.5) {
        return { 'message': 'You Tied', 'color': 'yellow' };
    } else {
        return { 'message': 'You Won', 'color': 'green' };
    }
}

function rpsFrontEnd(humanImgChoice, botImgChoice, finalMessage) {
    var imgDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,
    }

    // remove images in scrn 1
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imgDatabase[humanImgChoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(37, 50, 233, 1)'>";

    botDiv.innerHTML = "<img src='" + imgDatabase[botImgChoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(69, 0, 204, 1)'>";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1>";
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
}

// Change color of all buttons

var allButtons = document.getElementsByTagName('button');
var copyAllButtons = [];
for (let i = 0; i < allButtons.length; i++) {
    copyAllButtons.push(allButtons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red')
        buttonRed();
    else if (buttonThingy.value === 'green')
        buttonGreen();
    else if (buttonThingy.value === 'blue')
        buttonBlue();
    else if (buttonThingy.value === 'reset')
        buttonReset();
    else if (buttonThingy.value === 'random')
        buttonRandom();
}

function buttonRed() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}
function buttonGreen() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}
function buttonBlue() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-primary');
    }
}
function buttonReset() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}
function buttonRandom() {
    var colrChoices = ['btn-primary', 'btn-success', 'btn-warning', 'btn-danger'];
    for (let i = 0; i < allButtons.length; i++) {
        var rndm = Math.floor(Math.random() * 4);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(colrChoices[rndm]);
    }
}

// Black Jack

let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lostSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function randomCard() {
    let rndmIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][rndmIndex];
}

function blackjackHit() {
    if (blackjackGame['isStand'] === false && blackjackGame['turnOver'] === false) {
        let card = randomCard()
        showCard(YOU, card);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function showCard(activePlayer, card) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {

    if (blackjackGame['turnOver'] === true) {

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for (let i = 0; i < yourImages.length; i++)
            yourImages[i].remove();

        for (let i = 0; i < dealerImages.length; i++)
            dealerImages[i].remove();
        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = 'white';

        document.querySelector('#blackjack-result').textContent = "Let's Play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnOver'] = false;
    }
}


function updateScore(card, activePlayer) {
    // adding 11 keeps below 21 then do so
    // else add 1

    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21)
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        else
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];

    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(DEALER, card);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(500);
    }

    if (blackjackGame['turnOver'] === false)
        showResult(computeWinner());

}

// compute the winner and return 
// update the wins, losses, draws for the human

function computeWinner() {
    let winner;
    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins']++;
            winner = YOU;

        }
        else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;
        }
        else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
            // winner = none;
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;
    }
    else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner) {
    let message, messageColor;
    blackjackGame['turnOver'] = true;
    if (blackjackGame['turnOver'] === true) {

        blackjackGame['isStand'] = false;

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];

            message = "You Won!";
            messageColor = 'green';
            winSound.play();

        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = "You Lost!";
            messageColor = 'red';
            lostSound.play();
        }
        else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = "You Tied!";
            messageColor = 'black';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}