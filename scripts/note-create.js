let notes = getSavedNotes();
const timeStamp = moment().valueOf();

document.getElementById('create-note').addEventListener('click', () =>{
    const id = uuidv4();
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timeStamp,
        updatedAt: timeStamp,
    });
    saveNotes(notes);
    location.assign(`./edit.html#${id}`);
});

const filters = {
    searchText: '',
    sortBy: 'byEdited'
};

renderNotes(notes, filters);
'use strict'

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value;
    renderNotes(notes, filters);
});

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value;
    renderNotes(notes, filters);
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue);
        renderNotes(notes, filters);
    }
});
