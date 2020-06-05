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

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
for (let i = 0; i < sections.length; i++) {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.innerHTML = `section ${i + 1}`;
  // this data-nave attribue used for attach the anchor tage with specific section by index
  a.setAttribute("data-nav", `${i}`);
  a.classList.add("menu__link");

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
  const anchorsTags = document.querySelectorAll("a");
  // remove active class from all anchor tags
  for (let i = 0; i < anchorsTags.length; i++) {
    const anchorTag = anchorsTags[i];
    anchorTag.classList.remove("active__link");
  }
  const element = event.target;
  if (element.tagName == "A") {
    // add active class to the target anchor tage
    element.classList.add("active__link");
    // get the section attached to the anchor tag
    const section = sections[element.getAttribute("data-nav")];
    // scroll to the section 
    section.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    });
  }
});