const addBtn = document.getElementById('add')  
//constant variable holds the value-> document refers to html doc -> we are calling in doc by id value the reference to add button

//get any prev notes that are stored in local storage
const notes = JSON.parse(localStorage.getItem('notes'))
// javascript-obj-notation 
// json.parse-- stored local data to javascipt
// from local storage getting previously stored notes in 'notes' array

//if any prev exists, then add them to the current list
// iterate through the notes array and for each element call addnew-note fn, adding it to user interface
if(notes) {
    notes.forEach(note => addNewNote(note))
}

//listens for users event
//in this case mouse click
addBtn.addEventListener('click', () => addNewNote())  
// (a,b) when a happens do b

function addNewNote(text = '') {  
    
    const note = document.createElement('div')
    // createElement: dom functionality:creates a new element node
    note.classList.add('note')
    // adds css elements to div element  

    // setup inner html of note 
    note.innerHTML = `
    <div class="tools">       // div tags can be maipulated by css
        <button class="edit"><i class="fas fa-edit"></i></button>    // using font awesome edit button css 
        <button class="delete"><i class="fas fa-trash-alt"></i></button>   // using font awesome delete button css
    </div>
     // applying css based on condition
     // main: main content of notes will be displayed here
     // textarea: where editing will happen 
    <div class="main ${text ? "" : "hidden"}"></div>  // if text is present show main area
    <textarea class="${text ? "hidden" : ""}"></textarea>  // if text is absent show text area
    `
    // for queryselector:dom
    //. -> u r talking about a class
    //# -> u r talking about an id
    //if nothing then u r selecting a tag
    // selecting specific elements with in note div

    const editBtn = note.querySelector('.edit') // select edit class within note div
    const deleteBtn = note.querySelector('.delete') // select delete class
    const main = note.querySelector('.main')   // select main class 
    const textArea = note.querySelector('textarea') // select textarea element

    textArea.value = text  // changing text area content with the text inserted 
    main.innerHTML = marked(text)  // using marked js functionality to convert inserted text to html code 

    deleteBtn.addEventListener('click', () => {  // eventlistener to delete button
        note.remove()     // removes the note 

        updateLS()   // updates data in local storage 
    })

    editBtn.addEventListener('click', () => {  
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = marked(value)

        updateLS()
    })

    document.body.appendChild(note)


    
} // ends 



function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}
