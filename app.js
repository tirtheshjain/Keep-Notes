let addButton = document.getElementById('addBtn');

let searchText = document.getElementById('searchText');

let showNotes = function(){
    let notes = localStorage.getItem("notes");
    let notesObj, text = "";
    if (notes == null) 
        notesObj = [];
    else 
        notesObj = JSON.parse(notes);

    if (notesObj.length == 0) 
        text = 'No notes! use "add a note" section to add notes';
    else {
        notesObj.forEach(function (element, index) {
            text += `
            <div class="card mx-2 my-2 addedNotes" style="width: 18rem;">
                <div class="card-body">
                    <p class="card-text">${element}</p>
                    <textarea class="edit-box" oninput="autoResize(this)"></textarea>
                    <button  onclick="deleteNote(${index})" class="btn btn-warning my-3">Delete</button>
                    <button  onclick="editNote(this,${index})" class="btn btn-warning mx-3 my-3">Edit</button>
                </div>
            </div>`
        });
    }
    document.getElementById('notes').innerHTML = text;
}

let addNote = function () {
    let addText = document.getElementById('addText');
    let notes = localStorage.getItem("notes");
    let notesObj;
    if (notes == null)
        notesObj = [];
    else 
        notesObj = JSON.parse(notes);

    notesObj.push(addText.value);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addText.value = "";
    showNotes();
};

let deleteNote = function (index) {
    let notesObj = JSON.parse(localStorage.getItem("notes"));
    notesObj.splice(index, 1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

let searchNote = function(){
    let inputText = searchText.value;
    let addedNotes = document.getElementsByClassName('addedNotes');
    Array.from(addedNotes).forEach(function(element){
        let note = element.getElementsByTagName('p')[0].innerText;
        if(note.includes(inputText))    
            element.style.display = 'block';
        else 
            element.style.display = 'none';           
    });
}

let editNote = function(editBtn, index){

    let card = editBtn.parentNode;

	let editInput = card.querySelector('textarea');
	let cardText = card.querySelector("p");
	let containsClass = card.classList.contains("editMode");
	
	// If class of the parent is .editmode
	if (containsClass){
        let notesObj = JSON.parse(localStorage.getItem("notes"));
        notesObj.splice(index, 1, editInput.value);
        localStorage.setItem("notes",JSON.stringify(notesObj));
        showNotes();
	}
	else {
		editInput.value = cardText.innerText;
		editBtn.innerText="Save";
	}
	
	card.classList.toggle("editMode");
    autoResize(editInput);
}

let autoResize = function(textarea){
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

showNotes();
addBtn.onclick = addNote;
searchText.oninput = searchNote;
