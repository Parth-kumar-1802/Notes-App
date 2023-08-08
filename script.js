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
    // adds css 

    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    //. -> u r talking about a class
    //# -> u r talking about an id
    //if nothing then u r selecting a tag

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked(text)

    deleteBtn.addEventListener('click', () => {
        note.remove()    

        updateLS()
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
