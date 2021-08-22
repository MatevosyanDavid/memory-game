import { memo } from 'react';
import classNames from 'classnames';

import cardBack from 'assets/images/cardback.png';
import './index.scss';

const Card = ({ id, show, handleCardClick, image }) => (
  <>
    <div onClick={() => handleCardClick(id)} className={classNames('flip-card', { show })}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img loading="lazy" src={cardBack} alt="Card Back" />
        </div>
        <div className="flip-card-back">
          <div className="flip-card-front">
            <img loading="lazy" src={image} alt="Card Front" />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default memo(Card);
