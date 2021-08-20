import { useState, useEffect, useCallback, useRef } from 'react';

import { data } from 'config';
import { useMount } from 'utils/hooks';
import { shuffle, findCardById } from 'utils';
import Button from 'components/button';

import Card from './card';
import './index.scss';

function Game() {
  const timerId = useRef(null);
  const [isWin, setIsWin] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [showedCards, setShowedCards] = useState([]);
  const [matchesCardCount, setMatchesCardCount] = useState(0);

  useMount(() => {
    setCardData(shuffle(data));
  });

  useEffect(() => {
    if (matchesCardCount === 18) {
      setIsWin(true);
    }
  }, [matchesCardCount]);

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
      if (showedCards.length === 1) {
        !showedCards.includes(cardId) && setShowedCards(showedCards => [...showedCards, cardId]);
      } else {
        clearTimeout(timerId.current);
        setShowedCards([cardId]);
      }
    },
    [showedCards],
  );

  const handleResetGame = useCallback(() => {
    setCardData([]);
    setShowedCards([]);
    setMatchesCardCount(0);
    setCardData(shuffle(data));
  }, []);

  return (
    <>
      <h2>{isWin ? 'You Win !!!' : matchesCardCount}</h2>
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
      <Button onClick={handleResetGame} label="Reset Game" />
    </>
  );
}

export default Game;
