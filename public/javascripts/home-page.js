const homePageImage = document.querySelector('.home-page-img');
const sciquizPageImage = document.querySelector('.sciquiz-page-img');
const historyPageImage = document.querySelector('.history-page-img');
const aboutUsPageImage = document.querySelector('.about-us-page-img');

// Decrease border size when hover to image
homePageImage.addEventListener('mouseenter', () => {
  homePageImage.style.border = '10px solid rgb(240, 76, 76)';
});

homePageImage.addEventListener('mouseleave', () => {
  homePageImage.style.border = '20px solid rgb(245, 132, 132)';
});

sciquizPageImage.addEventListener('mouseenter', () => {
  sciquizPageImage.style.border = '10px solid rgb(234, 175, 65)';
});

sciquizPageImage.addEventListener('mouseleave', () => {
  sciquizPageImage.style.border = '20px solid rgb(247, 207, 134)';
});

historyPageImage.addEventListener('mouseenter', () => {
  historyPageImage.style.border = '10px solid rgb(178, 241, 51)';
});

historyPageImage.addEventListener('mouseleave', () => {
  historyPageImage.style.border = '20px solid rgb(198, 231, 131)';
});

aboutUsPageImage.addEventListener('mouseenter', () => {
  aboutUsPageImage.style.border = '10px solid rgb(45, 156, 235)';
});

aboutUsPageImage.addEventListener('mouseleave', () => {
  aboutUsPageImage.style.border = '20px solid rgb(111, 191, 248)';
});