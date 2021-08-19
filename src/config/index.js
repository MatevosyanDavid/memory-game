const getCardData = image => ({
	image: `assets/images/cards/${image}.svg`,
	isEqual: false,
});

export const data = [
	'ace_1',
	'ace_2',
	'ace_3',
	'ace_4',
	'jack_1',
	'jack_2',
	'jack_3',
	'jack_4',
	'queen_1',
	'queen_2',
	'queen_3',
	'queen_4',
	'king_1',
	'king_2',
	'king_3',
	'king_4',
].map(cardName => getCardData(cardName));
