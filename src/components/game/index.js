import { useState, useEffect, useRef } from 'react';

import { data } from 'config';
import { useMount } from 'utils/hooks';
import { shuffle, findCardById } from 'utils';
import Card from 'components/card';

import './index.scss';

function Game() {
  const timerId = useRef(null);
  const [cardData, setCardData] = useState([]);
  const [showedCards, setShowedCards] = useState([]);

  useMount(() => {
    setCardData(shuffle(data));
  });

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
      }
    }
  }, [showedCards]);

  const handleCardClick = cardId => {
    if (showedCards.length === 1) {
      setShowedCards(showedCards => [...showedCards, cardId]);
    } else {
      clearTimeout(timerId.current);
      setShowedCards([cardId]);
    }
  };

  const handleResetGame = () => {
    setCardData([]);
    setShowedCards([]);
    setCardData(shuffle(data));
  };

  return (
    <>
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
      <button onClick={handleResetGame}>Reset Game</button>
    </>
  );
}

export default Game;
