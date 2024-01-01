// Функція створення компонента ігрового поля.
export function PlayField(columns,rows,className) {
	const playingField = document.createElement('div');
	playingField.classList.add(className);
	for (let i = 0; i < columns * rows; i++) {
		playingField.append(document.createElement('div'));
	}
  return playingField
};