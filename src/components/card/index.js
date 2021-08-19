import classNames from 'classnames';

import cardBack from 'assets/images/cardback.png';
import './index.scss';

function Card({ id, show, handleCardClick, image, label }) {
	return (
		<>
			<div onClick={() => handleCardClick(id)} className={classNames('flip-card', { show })}>
				<div className="flip-card-inner">
					<div className="flip-card-front">
						<img src={cardBack} alt="Avatar" />
					</div>
					<div className="flip-card-back">
						<div className="flip-card-front">
							<img src={image} alt="Avatar" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Card;
