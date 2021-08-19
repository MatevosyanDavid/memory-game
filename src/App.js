import { useState, useEffect } from 'react';

import shuffle from 'utils/shuffle';
import Card from 'components/card';

import './App.css';

import { data } from 'config';

const findItemLabel = (data, elem) => data.find(({ id }) => id === elem);

function App() {
  const [cardData, setCardData] = useState([]);
  const [showedCards, setShowedCards] = useState([]);

  useEffect(() => {
    setCardData(data);
  }, []);

  useEffect(() => {
    if (showedCards.length === 2) {
      const firstCard = findItemLabel(data, showedCards[0]);
      const secondCard = findItemLabel(data, showedCards[1]);

      if (firstCard.label !== secondCard.label) {
        const timerId = setTimeout(() => {
          setShowedCards([]);

          clearTimeout(timerId);
        }, 1000);
      } else {
        setCardData(cardData => {
          const data = [...cardData];

          const firstCardIdx = cardData.findIndex(({ id }) => id === showedCards[0]);
          const secondCardIdx = cardData.findIndex(({ id }) => id === showedCards[1]);

          data[firstCardIdx] = { ...data[firstCardIdx], isEqual: true };
          data[secondCardIdx] = { ...data[secondCardIdx], isEqual: true };

          return data;
        });

        setShowedCards([]);
      }
    }
  }, [showedCards]);

  return (
    <div className="App">
      <div className="card-wrapper">
        {cardData.map(data => (
          <Card
            key={data.id}
            show={showedCards.includes(data.id) || data.isEqual}
            handleCardClick={cardId => setShowedCards(showedCards => [...showedCards, cardId])}
            {...data}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
