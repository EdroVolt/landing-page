/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const navBarList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");
const frame = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function isSectionNearTopOfViewPort(sectionElement) {
  const bounding = sectionElement.getBoundingClientRect();

  return bounding.top >= -50 && bounding.top < 300;
}

// get coordinates of the element relative to the document
function getCoordinates(element) {
  const bounding = element.getBoundingClientRect();

  return {
    y: bounding.top + window.pageYOffset,
    x: bounding.left + window.pageXOffset,
  };
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
for (let i = 0; i < sections.length; i++) {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.innerHTML = `a ${i + 1}`;
  // this data-nave attribue used for attach the anchor tage with specific section by index
  a.setAttribute("data-nav", `${i}`);

  li.appendChild(a);
  frame.appendChild(li);
}
navBarList.appendChild(frame);

/**
 * End Main Functions
 * Begin Events
 *
 */

window.addEventListener("scroll", function (event) {
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];

    // Add class 'active' to section when near top of viewport
    if (isSectionNearTopOfViewPort(section)) {
      section.classList.add("your-active-class");
    } else {
      section.classList.remove("your-active-class");
    }
  }
});

// scroll to specific section when clicking on anchor tage by the data-nav value
navBarList.addEventListener("click", function (event) {
  const element = event.target;
  if (element.tagName == "A") {
    const section = sections[element.getAttribute("data-nav")];
    window.scrollTo(0, getCoordinates(section).y);
  }
});
