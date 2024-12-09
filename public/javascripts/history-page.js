
// HOVER AND TEXT CONTAINER WILL APPEAR
const hoverImage= document.querySelector('.hover-image');
const hoverText = document.querySelector('.hover-text');

hoverImage.addEventListener('mouseenter', () => {
  hoverText.style.opacity = '1';
  hoverText.style.visibility = 'visible';
  hoverText.style.left = '-450px';
});

hoverImage.addEventListener('mouseleave', () => {
  hoverText.style.opacity = '0';
  hoverText.style.visibility = 'hidden';
  hoverText.style.left = '-200px';
});

// HOVER EACH IMAGE THEN TEXT WILL BE HIDDEN AND NEW TEXT WILL APPEAR
const hoverGallery = document.querySelector('.gallery');
const rightPar = document.querySelector('.right-par');
const image1Hover = document.querySelector('.image1');
const image2Hover = document.querySelector('.image2');
const image3Hover = document.querySelector('.image3');
const image4Hover = document.querySelector('.image4');

const environmentalTitle = 'What is Environmental Science?';
const environmentalPar = 'Environmental science is an interdisciplinary academic field that integrates physics, biology, meteorology, mathematics and geography (including ecology, chemistry, plant science, zoology, mineralogy, oceanography, limnology, soil science, geology and physical geography, and atmospheric science) to the study of the environment, and the solution of environmental problems. Environmental science emerged from the fields of natural history and medicine during the Enlightenment. <br>Today it provides an integrated, quantitative, and interdisciplinary approach to the study of environmental systems. Environmental studies incorporates more of the social sciences for understanding human relationships, perceptions and policies towards the environment. Environmental engineering focuses on design and technology for improving environmental quality in every aspect.';


// Hovering over a specific image
// IMAGE 1
image1Hover.addEventListener('mouseenter', () => {
  document.querySelector('.environmental-title').innerHTML = 'Environmental Studies';  // Change the title
  document.querySelector('.environmental-par').innerHTML = 'Environmental studies is a multidisciplinary field that deals with the interactions between humans and the natural environment. It covers various aspects of physical, biological, social, and economic processes that affect the environment and human well-being. Environmental studies aims to understand, analyze, and solve environmental problems using scientific methods and ethical principles.  The main objectives of environmental studies are to create awareness, impart knowledge, develop attitude, motivate participation, and foster harmony with nature. Environmental studies helps to educate people about the environmental issues and challenges, provide them with relevant information and skills, cultivate a sense of concern and responsibility for the environment, encourage them to take action for environmental protection and improvement, and promote a sustainable and equitable use of resources.';  // Change the paragraph
});

// Restore
image1Hover.addEventListener('mouseleave', () => {
  document.querySelector('.environmental-title').innerHTML = environmentalTitle;  
  document.querySelector('.environmental-par').innerHTML = environmentalPar; 
});

// IMAGE 2
image2Hover.addEventListener('mouseenter', () => {
  document.querySelector('.environmental-title').innerHTML = 'Pollution';  // Change the title
  document.querySelector('.environmental-par').innerHTML = 'Pollution, the addition of any substance (solid, liquid, or gas) or any form of energy (such as heat, sound, or radioactivity) to the environment at a rate faster than it can be dispersed, diluted, decomposed, recycled, or stored in some harmless form. The major kinds of pollution, usually classified by environment, are air pollution, water pollution, and land pollution. Modern society is also concerned about specific types of pollutants, such as noise pollution, light pollution, and plastic pollution. Pollution of all kinds can have negative effects on the environment and wildlife and often impacts human health and well-being.';  // Change the paragraph
});

// Restore
image2Hover.addEventListener('mouseleave', () => {
  document.querySelector('.environmental-title').innerHTML = environmentalTitle;  
  document.querySelector('.environmental-par').innerHTML = environmentalPar; 
});

// IMAGE 3
image3Hover.addEventListener('mouseenter', () => {
  document.querySelector('.environmental-title').innerHTML = 'The Atmosphere';  // Change the title
  document.querySelector('.environmental-par').innerHTML = 'The atmosphere is a mixture of gases that surrounds the Earth. It helps make life possible by providing us with air to breathe, shielding us from harmful ultraviolet (UV) radiation coming from the Sun, trapping heat to warm the planet, and preventing extreme temperature differences between day and night. Without the atmosphere, temperatures would be well below freezing everywhere on Earths surface. Instead, the heat absorbed and trapped by our atmosphere keeps our planets average surface temperature at a balmy 15°C (59°F). Some of the atmospheres gases, like carbon dioxide, are particularly good at absorbing and trapping radiation. Changes in the amounts of these gases directly affect our climate. The atmosphere becomes thinner (less dense and lower in air pressure) the further it extends from the Earths surface. It gradually gives way to the vacuum of space. There is no precise top of the atmosphere, but the area between 100-120 km (62-75 miles) above the Earths surface is often considered the boundary between the atmosphere and space because the air is so thin here. However, there are measurable traces of atmospheric gases beyond this boundary, detectable for hundreds of kilometers/miles from Earths surface.';  // Change the paragraph
});

// Restore
image3Hover.addEventListener('mouseleave', () => {
  document.querySelector('.environmental-title').innerHTML = environmentalTitle;  
  document.querySelector('.environmental-par').innerHTML = environmentalPar; 
});

// IMAGE 4
image4Hover.addEventListener('mouseenter', () => {
  document.querySelector('.environmental-title').innerHTML = 'Population Ecology';  // Change the title
  document.querySelector('.environmental-par').innerHTML = 'Population ecology is a subfield of ecology that deals with the dynamics of species populations and how these populations interact with the environment, such as birth and death rates, and by immigration and emigration. Population ecology is the branch of ecology that works to understand the patterns and processes of change over time or space for populations of a single species. A species is typically defined as a group of organisms capable of interbreeding. The discipline is important in conservation biology, especially in the development of population viability analysis which makes it possible to predict the long-term probability of a species persisting in a given patch of habitat. Although population ecology is a subfield of biology, it provides interesting problems for mathematicians and statisticians who work in population dynamics.';  // Change the paragraph
});

// Restore
image4Hover.addEventListener('mouseleave', () => {
  document.querySelector('.environmental-title').innerHTML = environmentalTitle;  
  document.querySelector('.environmental-par').innerHTML = environmentalPar; 
});


