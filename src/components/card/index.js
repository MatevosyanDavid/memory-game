import classNames from 'classnames';

import cardBack from 'assets/images/cardback.png';
import cardFront from 'assets/images/queen_of_spades.svg';
import './index.scss';

// style={{ maxWidth: '148px', maxHeight: '214px' }}

function Card({ show, cardImage = cardFront }) {
	return (
		<>
			<div className={classNames('flip-card', { show })}>
				<div className="flip-card-inner">
					<div className="flip-card-front">
						<img src={cardBack} alt="Avatar" />
					</div>
					<div className="flip-card-back">
						<div className="flip-card-front">
							<img src={cardFront} alt="Avatar" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Card;
