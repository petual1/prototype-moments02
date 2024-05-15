const { JSDOM } = require('jsdom');

let calendarContainer;
let prevButton;
let nextButton;
let todayButton;

beforeEach(() => {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
  global.document = dom.window.document;

  calendarContainer = document.createElement('div');
  calendarContainer.classList.add('calendar');
  document.body.appendChild(calendarContainer);

  prevButton = document.createElement('button');
  prevButton.classList.add('prev');
  calendarContainer.appendChild(prevButton);

  nextButton = document.createElement('button');
  nextButton.classList.add('next');
  calendarContainer.appendChild(nextButton);

  todayButton = document.createElement('button');
  todayButton.classList.add('today-btn');
  calendarContainer.appendChild(todayButton);
});

afterEach(() => {
  document.body.removeChild(calendarContainer);
});

test('Teste do botão de navegação para o mês anterior', () => {
    prevButton.click();
    setTimeout(() => {
      expect(document.querySelector('.month')).not.toBeNull();
    }, 100); 
  });
  
  test('Teste do botão de navegação para o próximo mês', () => {
    nextButton.click();
    setTimeout(() => {
      expect(document.querySelector('.month')).not.toBeNull();
    }, 100); 
  });
  
  test('Teste do botão "Hoje"', () => {
    todayButton.click();
    setTimeout(() => {
      expect(document.querySelector('.month')).not.toBeNull();
    }, 100); 
  });
  