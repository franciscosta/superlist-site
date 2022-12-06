console.log("It works!!");


// Elements I'm listening to

const heading = document.querySelector('.cl-headingtop');
const cursor = document.querySelector('.cursor');

// Color options

const color = ['#6B66DA', '#72718A', '#2590F2', '#242336', '#F84F39', '#2A966F', '#F84F39', '#6B66DA']
const words = ["Changelog", "Updates", "News", `🐞 Fixes`];

// Numbers
let nextWord = 0;

// Checkmarks

const done = 'https://uploads-ssl.webflow.com/625593a881b8ebd169835ca5/638934caccc9ac38164b2516_Checkbox.svg';
const undone = 'https://uploads-ssl.webflow.com/625593a881b8ebd169835ca5/638a538dffe73982a2044a59_unchecked.svg';



// Update color based on quadrant

function updateColor(quadrant) {
	let index = quadrant - 1;
	heading.style.color = color[index];
  cursor.style.backgroundColor = color[index];
}

// Listen to mouse quadrant

function getMouseQuadrant(mouseX, mouseY) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Split the window into 8 quadrants
  const quadrantWidth = windowWidth / 3;
  const quadrantHeight = windowHeight / 3;

  if (mouseX < quadrantWidth) {
    // Left quadrants
    if (mouseY < quadrantHeight) {
      return 1;
    } else if (mouseY < quadrantHeight * 2) {
      return 4;
    } else {
      return 7;
    }
  } else if (mouseX < quadrantWidth * 2) {
    // Middle quadrants
    if (mouseY < quadrantHeight) {
      return 2;
    } else if (mouseY < quadrantHeight * 2) {
      return 5;
    } else {
      return 8;
    }
  } else {
    // Right quadrants
    if (mouseY < quadrantHeight) {
      return 3;
    } else if (mouseY < quadrantHeight * 2) {
      return 6;
    } else {
      return 9;
    }
  }
}


// Call quadrant listener continuously

window.addEventListener('mousemove', (event) => {
	const mouseX = event.clientX;	
  const mouseY = event.clientY;
  const quadrant = getMouseQuadrant(mouseX, mouseY);
  updateColor(quadrant);
});

// Blinking cursor

function blinkCursor() {
  let isVisible = true;

  setInterval(() => {
    if (isVisible) {
      cursor.style.visibility = 'hidden';
    } else {
      cursor.style.visibility = 'visible';
    }

    isVisible = !isVisible;
  }, 500);
}

blinkCursor();


// Type-in words

function clearHeading() {
	heading.innerText = "";
}

function typeIn(word) {

	word = Array.from(word);

  const delay = 100;

  for (let i = 0; i < word.length; i++) {
    setTimeout(() => {
      heading.innerHTML += word[i];
    }, i * delay);
  }
  
}

// Select word and remove

function updateWord() {
  
	heading.classList.toggle('selected');
    
  setTimeout(() => {
    clearHeading()
    heading.classList.remove('selected');
  }, 1500);
  
  setTimeout(() => {
		typeIn(words[nextWord]);
  }, 2500);
  
  nextWord++;
  if (nextWord > words.length - 1) {
  	nextWord = 0;
  }

}

clearHeading()

setTimeout(() => typeIn("Changelog"), 2500);

setInterval(updateWord, 8000);

// Listen for clicks on the list items and toggle checkmark

function setupLists() {
	let unorderedLists = document.querySelectorAll('ul');

	unorderedLists.forEach( list => {
  	toggleClass(list, 'done');
  });
  
	let orderedLists = document.querySelectorAll('ol');
  
	orderedLists.forEach( list => {
  	toggleClass(list, 'undone');
  });

}


function toggleClass(list, classKeyword) {

	let items = list.querySelectorAll('li');
  
  for (let i = 0; i < items.length; i++) {
  	items[i].classList.add(classKeyword);  
    
    items[i].addEventListener('click', function() {
			if (this.classList.contains('done')) {
		  	items[i].classList.remove('done');  
		  	items[i].classList.add('undone');  
      } else {
		  	items[i].classList.remove('undone');  
		  	items[i].classList.add('done');  
      }
    });
  }

	
}
setupLists();

