// Select elements
const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');

// Load notes from LocalStorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Function to display all notes
function displayNotes() {
  notesContainer.innerHTML = '';
  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.innerHTML = `
      <p>${note}</p>
      <button class="deleteBtn" onclick="deleteNote(${index})">X</button>
    `;
    notesContainer.appendChild(noteDiv);
  });
}

// Add note function
addNoteBtn.addEventListener('click', () => {
  const noteText = noteInput.value.trim();
  if (noteText === '') return alert('Please write something!');
  notes.push(noteText);
  localStorage.setItem('notes', JSON.stringify(notes));
  noteInput.value = '';
  displayNotes();
});

// Delete note function
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  displayNotes();
}

// Display existing notes on page load
displayNotes();
