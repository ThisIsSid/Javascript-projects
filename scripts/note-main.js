'use strict'

// Read notes from local storage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes');

    try{
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e){
        return [];
    }   
};

// Save notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
};

// Generate the last edited message
const generateLastEdited = (timestamp) =>`Last edited ${moment(timestamp).fromNow()}`;

//remove notes by id
const removeNote = (id) => {
    const index = notes.findIndex((note) => note.id === id);

    if (index > -1) {
        notes.splice(index,1);
    }
};

//generate DOM for Note
const generateNote= (createNote)=>{
    const note = document.createElement('a');
    const text = document.createElement('p');
    const status = document.createElement('p');

    // note title
    if (createNote.title.length>0){
        text.textContent=createNote.title;
    }
    else{
        text.textContent='----NO TITLE----';
    }

    text.classList.add('list-item-title');
    note.appendChild(text);

    //setup the link
    note.setAttribute('href', `edit.html#${createNote.id}`);
    note.classList.add('list-item');

    //setup the message
    status.textContent=generateLastEdited(createNote.updatedAt);
    status.classList.add('list-item-subtitle');
    note.appendChild(status);

    return note;
    
};

const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited'){
        return notes.sort((a,b) => {
            if (a.updatedAt > b.updatedAt){
                return -1;
            } else if (a.updatedAt < b.updatedAt){
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === 'byCreated') {
        return notes.sort( (a,b) => {
            if (a.createdAt > b.createdAt){
                return -1;
            } else if (a.createdAt < b.createdAt){
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === 'alphabetical'){
        return notes.sort( (a,b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()){
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()){
                return 1;
            } else {
                return 0;
            }
        });
    } else {
        return notes;
    }
};

// Render application notes
const renderNotes = (notes, filters) => { 
    const notesEl = document.querySelector('#notes') 
    notes = sortNotes(notes, filters.sortBy);
    const filteredNotes = notes.filter( (note) => {
        const title = note.title.toLowerCase();
        const filter = filters.searchText.toLowerCase();
        return title.includes(filter);
    });

    notesEl.innerHTML = '';

    if (filteredNotes.length > 0){
        filteredNotes.forEach( (note) => {
            const p = generateNote(note);
            notesEl.appendChild(p);
        })
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No notes to show';
        emptyMessage.classList.add('empty-message');
        notesEl.appendChild(emptyMessage);
    }
};