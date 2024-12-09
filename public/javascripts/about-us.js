// Scroll when clicked the button
document.addEventListener('DOMContentLoaded', () => {
  const btnVanessa = document.getElementById('btn-vanessa');
  const btnBenji = document.getElementById('btn-benji');
  
  const firstProfileContent = document.getElementById('first-profile-content');
  const secondProfileContent = document.getElementById('second-profile-content'); 

  function scrollToFirstProfile() {
    firstProfileContent.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }

  function scrollToSecondProfile() {
    secondProfileContent.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }

  btnVanessa.addEventListener('click', scrollToFirstProfile);
  btnBenji.addEventListener('click', scrollToSecondProfile);



    // Get a reference to the 'View Projects' button and the project container
  const viewProjectsBtn1 = document.getElementById('view-projects-btn1');
  const viewProjectsBtn2 = document.getElementById('view-projects-btn2');
  const projectContainer = document.getElementById('project-container');
  
  viewProjectsBtn1.addEventListener('click', (event) => {
      event.preventDefault();
      
      projectContainer.scrollIntoView({
          behavior: 'smooth'
      });
  });

  viewProjectsBtn2.addEventListener('click', (event) => {
    event.preventDefault();
    
    projectContainer.scrollIntoView({
        behavior: 'smooth'
    });
  });

  // Button scroll to top function
  const buttonTop = document.getElementById('button-top');
  const topPage = document.querySelector('.welcome-page');

  function scrollToTop() {
    topPage.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }

  buttonTop.addEventListener('click', scrollToTop);


  // Get all images with class 'toggle-image'
  const toggleImages = document.querySelectorAll('.toggle-image');
      
  toggleImages.forEach(image => {
      // Add click event to each image
      image.addEventListener('click', () => {
          // Get the target element (project details)
          const targetSelector = image.getAttribute('data-target');
          const targetElement = document.querySelector(targetSelector);
          
          // Toggle visibility of the project details
          if (targetElement.style.display === 'none' || targetElement.style.display === '') {
              targetElement.style.display = 'block';
          } else {
              targetElement.style.display = 'none';
          }
      });
  });
});
