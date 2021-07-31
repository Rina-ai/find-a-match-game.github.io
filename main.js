(() => {
    const playField = document.querySelector(".play-field");
    const form = document.querySelector('.form');
    const btnForm = document.querySelector('.btn');
    let second = document.querySelector('.timer-block__min');
    let timerID = null;
    let firstCard = null;
    let secondCard = null;
    let hasFlippedCard = false;
    let lockCard = false;

  // создаем числовой массив 
    function createArrayNumber(horizontalQuantity, verticallyQuantity) {
        let arrayNumber = [];
        length = horizontalQuantity * verticallyQuantity;
        for (let i = 1; i <= length / 2; i++)
        for (let j = 1; j <= 2; j++) {
            arrayNumber.push(i);
        }
        return arrayNumber;
    }

  // перемешиваем массив
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

  // создаем лист для списка карточек 
    function createCardsList() {
        const cardsList = document.createElement('ul');
        cardsList.classList.add('cards-list');
        return cardsList;
    }

  // создаем список карточек
    function createCard(number, verticallyQuantity) {
        const cardNew = document.createElement('li');
        const cardText = document.createElement('span');
        cardNew.classList.add('card-box');
        cardNew.style.width = '95'/verticallyQuantity+'%';
        cardText.classList.add('card');
        cardText.textContent = number;
        cardText.addEventListener('click', flipCard);
        cardNew.append(cardText);
        return {
            cardNew,
            cardText,
        };
    } 

  // открываем 2 карточки
    function flipCard() {
        if (lockCard) return;
        if (this === firstCard) return;
        this.classList.add('flip');
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        secondCard = this;

        checkForMatch();
        setTimeout(() => {
            findAllFlipCards();
        }, 100)
    }

  // сверяем 2 открытые карточки
    function checkForMatch() {
        if (firstCard.textContent === secondCard.textContent) {
        disableCards();
        return;
        }
        upendCards();
    }

  // отключаем карточки на нажатие
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

  //переварачивание карточек, если они не совпадают
    function upendCards() {
        lockCard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 300)
    }

  //   убираем 2-е нажатие на одну и ту же карточку
    function resetBoard() {
        [hasFlippedCard, lockCard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

  //   проверяем все ли карточки открыты
    function findAllFlipCards() {
        const allCards = document.querySelectorAll('.card');
        const allFlipCards = document.querySelectorAll('.flip');
        if (allCards.length === allFlipCards.length) {
            stopTimer();
            alert(`Игра окончена! Вы справились`);
            findCardsList();
        }
    }

  //   удаляем лист списка карточек, чтобы на странице оставался один 
    function findCardsList() {
        const earlyCardsList = document.querySelector('.cards-list');
        if (earlyCardsList) {
            earlyCardsList.remove();
        }
    }

  // остановливаем таймер 
    function stopTimer() {
        clearInterval(timerID);
    }

  // запускаем таймер
    function startTimer() {
        second.textContent = 60;
        timerID = setInterval(timerOperation, 1000);
    }

    function timerOperation() {
        if (second.textContent <= 0) {
            const allCards = document.querySelectorAll('.card'); 
            allCards.forEach((el) => el.removeEventListener('click', flipCard));
            stopTimer();
            alert(`Игра окончена! Время вышло(`);      
        } else {
            let currentTimerBlock = parseInt(second.textContent);
            second.textContent = currentTimerBlock - 1;
        }
        btnForm.addEventListener('click', stopTimer);
    }

    function playGame() {
        form.addEventListener('submit', function (e) {
        e.preventDefault();
        findCardsList();
        startTimer();
        let arrayNumberRandom = [];
        horizontalQuantity = document.querySelector('.gor').value;
        verticallyQuantity = document.querySelector('.ver').value;
        const cardsList = createCardsList();
        if (horizontalQuantity % 2 != 0) {
            document.querySelector('.gor').value = 4;
            horizontalQuantity = 4;
        }
        if (verticallyQuantity % 2 != 0) {
            document.querySelector('.ver').value = 4;
            verticallyQuantity = 4;
        }
        playField.append(cardsList);
        arrayNumberRandom = createArrayNumber(horizontalQuantity, verticallyQuantity)
        shuffle(arrayNumberRandom);

        for (const number of arrayNumberRandom) {
            const card = createCard(number, verticallyQuantity);
            cardsList.append(card.cardNew);
        }
        });
    }

    window.startPlayGame = playGame;
})();