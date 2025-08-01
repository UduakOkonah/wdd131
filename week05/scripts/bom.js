// Select elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Load chapters array from localStorage or start empty
let chaptersArray = getChapterList() || [];

// Display saved chapters on load
chaptersArray.forEach(chapter => {
  displayList(chapter);
});

// Handle add chapter
button.addEventListener('click', function () {
  const chapter = input.value.trim();

  if (chapter !== '') {
    // ✅ Check for duplicates (case-insensitive)
    if (chaptersArray.some(item => item.toLowerCase() === chapter.toLowerCase())) {
      alert(`"${chapter}" is already in your favorites!`);
      input.value = '';
      input.focus();
      return;
    }

    displayList(chapter);               // 1. Add to DOM
    chaptersArray.push(chapter);        // 2. Add to array
    setChapterList();                   // 3. Save to localStorage
    input.value = '';                   // 4. Reset input
    input.focus();                      // 5. Refocus
  } else {
    input.focus(); // keep focus if empty
  }
});

// Display a single list item
function displayList(item) {
  const li = document.createElement('li');
  const deleteButton = document.createElement('button');

  li.textContent = item;
  deleteButton.textContent = '❌';
  deleteButton.setAttribute('aria-label', `Remove ${item}`);

  // Delete functionality
  deleteButton.addEventListener('click', function () {
    list.removeChild(li);
    deleteChapter(item); // remove from array and localStorage
    input.focus();
  });

  li.append(deleteButton);
  list.append(li);
}

// Save array to localStorage
function setChapterList() {
  localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// Get array from localStorage
function getChapterList() {
  return JSON.parse(localStorage.getItem('myFavBOMList'));
}

// Delete chapter and update localStorage
function deleteChapter(chapter) {
  chaptersArray = chaptersArray.filter(item => item.toLowerCase() !== chapter.toLowerCase());
  setChapterList();
}
