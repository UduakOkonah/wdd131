// Select elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Add click event listener to the button
button.addEventListener('click', function () {
  // Trim input to remove whitespace and check if it's not empty
  if (input.value.trim() !== '') {
    // Create list item and delete button
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    // Set the text of the list item to input value
    li.textContent = input.value;

    // Setup delete button
    deleteButton.textContent = '❌';
    deleteButton.setAttribute('aria-label', `Remove ${input.value}`);

    // Add delete functionality
    deleteButton.addEventListener('click', function () {
      list.removeChild(li);     // Remove li element
      input.focus();            // Send focus back to input
    });

    // Add delete button to the list item
    li.append(deleteButton);

    // Add list item to the unordered list
    list.append(li);

    // Reset input and refocus
    input.value = '';
    input.focus();
  } else {
    // If input is empty, keep focus there
    input.focus();
  }
});
