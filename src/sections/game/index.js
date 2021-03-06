import { useState, useEffect, useCallback, useRef } from 'react';

import { data } from 'config';
import { useMount } from 'utils/hooks';
import { shuffle, findCardById, getTimePerSecond } from 'utils';
import Button from 'components/button';

import Card from './card';
import './index.scss';

function Game() {
  const timerId = useRef(null);
  const indervalId = useRef(null);
  const [step, setStep] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [showedCards, setShowedCards] = useState([]);
  const [matchesCardCount, setMatchesCardCount] = useState(0);

  useMount(() => {
    setCardData(shuffle(data));
  });

  useEffect(() => {
    if (matchesCardCount === 18) {
      setIsWin(true);
      clearInterval(indervalId.current);
    }
  }, [matchesCardCount]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      showedCards.length === 1 && setShowedCards([]);
    }, 5000);

    return () => clearTimeout(timerId);
  }, [showedCards]);

  useEffect(() => {
    const [selectedFirstCard, selectedSecondCard] = showedCards;

    if (showedCards.length === 2) {
      const firstCard = findCardById(data, selectedFirstCard);
      const secondCard = findCardById(data, selectedSecondCard);

      if (firstCard.label !== secondCard.label) {
        timerId.current = setTimeout(() => {
          setShowedCards([]);

          clearTimeout(timerId.current);
        }, 1000);
      } else {
        setCardData(cardData => {
          const data = [...cardData];

          const firstCardIdx = cardData.findIndex(({ id }) => id === selectedFirstCard);
          const secondCardIdx = cardData.findIndex(({ id }) => id === selectedSecondCard);

          data[firstCardIdx] = { ...data[firstCardIdx], isMatches: true };
          data[secondCardIdx] = { ...data[secondCardIdx], isMatches: true };

          return data;
        });

        setShowedCards([]);
        setMatchesCardCount(matchesCardCount => matchesCardCount + 1);
      }
    }
  }, [showedCards]);

  const handleCardClick = useCallback(
    cardId => {
      if(!cardData.find(({ id }) => id === cardId).isMatches) {
        if (showedCards.length === 1 && !showedCards.includes(cardId)) {
          setStep(step => step + 1);
          setShowedCards(showedCards => [...showedCards, cardId]);
        } else {
          clearTimeout(timerId.current);
          setShowedCards([cardId]);
        }
      }
    },
    [showedCards, cardData],
  );

  const handleResetGame = useCallback(() => {
    setStep(0);
    setTimer(0);
    setIsWin(false);
    setCardData([]);
    setStartGame(false);
    setShowedCards([]);
    setMatchesCardCount(0);
    setCardData(shuffle(data));

    clearInterval(indervalId.current);
  }, []);

  const handleStartGame = () => {
    setStartGame(true);

    indervalId.current = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 1000);
  };

  return (
    <>
      <h2>
        {isWin ? 'You Win !!!' : `Matches Card ${matchesCardCount}`} : Step {step}
      </h2>
      <p className="timer">Timer : {getTimePerSecond(timer)}</p>
      {startGame && (
        <div className="card-wrapper">
          {cardData.map(data => (
            <Card
              key={data.id}
              handleCardClick={handleCardClick}
              show={showedCards.includes(data.id) || data.isMatches}
              {...data}
            />
          ))}
        </div>
      )}
      <Button
        label={startGame ? 'Reset Game' : 'Start Game'}
        onClick={startGame ? handleResetGame : handleStartGame}
      />
    </>
  );
}

export default Game;
