'use strict'

const titleElement = document.querySelector('#note-title');
const timeElement = document.querySelector('#time-stamp');
const bodyElement = document.querySelector('#note-body');
const noteId = location.hash.substr(1);
let notes = getSavedNotes();
let note = notes.find( (note) => note.id === noteId);
//alert(note);

if (!note){
    location.assign('project.html');
}

//Get the existing note's info from the page
timeElement.textContent = generateLastEdited(note.updatedAt);
titleElement.value = note.title;
bodyElement.value = note.body;

//when there is a change in input element value
titleElement.addEventListener('input', () => {
    note.title = titleElement.value;
    note.updatedAt = moment().valueOf();
    timeElement.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
});

bodyElement.addEventListener('input', () => {
    note.body = bodyElement.value;
    note.updatedAt = moment().valueOf();
    timeElement.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
});

document.querySelector('#remove-note').addEventListener('click', () =>{
    removeNote(note.id);
    saveNotes(notes);
    location.assign('project.html');
});

window.addEventListener('storage', (e) =>{
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue);
        note = notes.find( (note) => note.id === noteId);
        
        if (!note){
            location.assign('project.html');
        }
        timeElement.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`;
        titleElement.value = note.title;
        bodyElement.value = note.body;
    }
});