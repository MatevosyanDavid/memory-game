const getTimePrefix = time => (time < 10 ? `0${time}` : time);

export const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const findCardById = (data, elem) => data.find(({ id }) => id === elem);

export const getTimePerSecond = seconds => {
  const secs = getTimePrefix(seconds % 60);
  const mins = getTimePrefix(Math.floor(seconds / 60) % 60);
  const hours = getTimePrefix(Math.floor(seconds / 60 / 60) % 24);

  return `${hours}:${mins}:${secs}`;
};
