const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');
const li = document.createElement('li');
const deleteButton = document.createElement('button');

button.addEventListener('click', function (){
  if(input.value.trim() !== ''){
  li.textContent = input.value;
  deleteButton.textContent = '❌';
  li.append(deleteButton);
  list.append(li);

  // Clear the input field
  input.value = '';

      // Set focus back to the input field
      input.focus();
    } else {
      alert('Please enter a chapter name.');
    }
});

deleteButton.addEventListener('click', function () {
  list.removeChild(li);
  input.focus();
});43