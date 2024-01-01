const titleText = "O н л а й н - г р а &nbsp;' Т е т р і с '";

const letter = (str) => {
  const res = str.split(' ').map(el => {
    return `<span class="title_letter">${el}</span>`;
  });
  return res.join('')
};

// Функція створення компонента Заголовок.
export function Title() {
  return `
  <h1 class="title">
    ${letter(titleText)}
  </h1>`;
};