export const getRandomColor = () => {
  const availableColors = [
    '#ffd966',
    '#6aa84f',
    '#2986cc',
    '#000',
    '#FFF',
    '#c90076',
    '#674ea7',
    '#783f04',
    '#5b5b5b',
    '#cc0000',
    '#FF6347',
  ]

  return availableColors[Math.floor(Math.random() * 11)]
}

export default getRandomColor()