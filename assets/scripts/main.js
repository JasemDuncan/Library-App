//Constructor
class Book {
    constructor(title,author,pages,read){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.read=read;
    }
}

let myLibrary=[];

function InitializePage(){
    alert('InitializePage function Start');
    if(localStorage.getItem('lsLibraryApp')){

        myLibrary=JSON.parse(localStorage.getItem('lsLibraryApp'));

    }
    else{
        alert('has not local Storege library');
        myLibrary=[];
    }
    return myLibrary;
}

function reloadPage(){
    alert('start Reload');

    localStorage.setItem('lsLibraryApp',JSON.stringify(myLibrary));
    document.location.reload();
}



//------

function insertBookLibraryCollection(){
    const title=document.getElementById('title').value;
    const author=document.getElementById('author').value;
    const pages=document.getElementById('pages').value;
    const read=document.getElementById('read').checked;
    alert(title+author+pages+read);
    const nuevoBook = new Book(title, author, pages, read);
    alert(title+author+pages+read);

    
    if (title && author && pages){
        myLibrary.push(nuevoBook);
        reloadPage();
    }
}

let libraryCollection=[];
libraryCollection=InitializePage();

function readButtonText(index) {
    alert('Start readButtonText');
    let text = '';
    text = (libraryCollection[index].read) ? 'Set as Unread' : 'Set as Read';
    return text;
}

function createNewRow(text,tr){
    const newRow=document.createElement('td');
    newRow.textContent=text;
    tr.appendChild(newRow);
}


function displayForm() { // eslint-disable-line no-unused-vars
    const dform = document.getElementById('bookForm');
    dform.classList.toggle('d-none');
}

function eraseBook(index){
    alert('erase function start');
    alert('fila a elminar '+index);

    myLibrary.splice(index,1);
    alert('erase function end');
    reloadPage();
}

function createButton(idText, eraseButton, text='Erase'){
    const newButton=document.createElement('button');
    newButton.textContent= text;
    newButton.setAttribute('id',idText);
    eraseButton.appendChild(newButton);
}

function changeReadStatus(index) { // eslint-disable-line no-unused-vars
    alert('start changeReadStatus-->'+index);
    alert('libraryCollection-->'+libraryCollection[index].read);
    libraryCollection[index].read = !(libraryCollection[index].read);
    reloadPage();
}

function displayBook(book,index){
    const table = document.getElementById('result-table');
    const newRow = document.createElement('tr');
    table.appendChild(newRow);
    createNewRow(book.title, newRow);
    createNewRow(book.author, newRow);
    createNewRow(book.pages, newRow);
    let status='';
    if (book.read==false){
        status='Not read';
    }
    else{
        status='Read'
    }
    createNewRow(status, newRow);

    const eraseRow=document.createElement('td');
    newRow.appendChild(eraseRow);
    alert('index'+index);
    let idText='Remove'+index;
    createButton(idText,eraseRow);
    // CreateBUtton to change Status
    const statusTd=document.createElement('td');
    newRow.appendChild(statusTd);
    const textReadButton = readButtonText(index);
    idText='changeStatus'+index;
    createButton(idText, statusTd, textReadButton);

}

function showBooks(){
    libraryCollection.forEach(displayBook);
}

showBooks();

document.addEventListener('click', (e) => {
    if(e.target && e.target.id === 'd-form'){
        displayForm();
    }
    else if(e.target && e.target.id ==='submitForm'){
        
        insertBookLibraryCollection();
    }
    else if(e.target && (e.target.id).includes('Remove')){
        alert('Press eraseee');
        const buttonIndex=(e.target.id).substr(e.target.id.length - 1);
        alert('Print e.target.id -->  '+e.target.id);
        eraseBook(buttonIndex);
    }
    else if (e.target && (e.target.id).includes('changeStatus')){
        const buttonIndex=(e.target.id).substr(e.target.id.length-1);
        alert('ButtonIndex'+buttonIndex+'----'+'e.target.id ' +e.target.id);
        changeReadStatus(buttonIndex);
    }
});