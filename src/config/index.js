const importAllImages = context =>
	context.keys().reduce((acc, item) => {
		acc[item.replace('./', '')] = context(item);
		return acc;
	}, {});

const images = importAllImages(
	require.context('assets/images/cards/', false, /\.(png|jpe?g|svg)$/),
);

const getCardData = label => ({
	label,
	isMatches: false,
	id: Math.random() * 100,
	image: images[`${label}.svg`].default,
});

const imageNames = [
	'10_1',
	'10_2',
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
];

export const data = [...imageNames, ...imageNames].map(cardName => getCardData(cardName));
