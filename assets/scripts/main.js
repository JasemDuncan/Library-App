class Book {
    constructor(title,author,pages,read){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.read=read;
    }
}

function InitializePage(){
    if(localStorage.getItem('lsLibraryApp')){

        libraryCollection=JSON.parse(localStorage.getItem('lsLibraryApp'));

    }
    else{
        libraryCollection=[];
    }
    return libraryCollection;
}

function reloadPage(){
    localStorage.setItem('lsLibraryApp',JSON.stringify(libraryCollection));
    document.location.reload();
}

function insertBookLibraryCollection(){
    const title =document.getElementById('title').value;
    const author=document.getElementById('author').value;
    const pages =document.getElementById('pages').value;
    const read  =document.getElementById('read').checked;
    const nuevoBook = new Book(title, author, pages, read);

    if (title && author && pages){
        libraryCollection.push(nuevoBook);
        reloadPage();
    }
}

function readButtonText(index) {
    let text = (libraryCollection[index].read) ? 'Set as Unread' : 'Set as Read';
    return text;
}

function createNewTd(text,tr){
    const newRow=document.createElement('td');
    newRow.textContent=text;
    tr.appendChild(newRow);
}

function newTdForRowButton(tr){
    const newTd=document.createElement('td');
    tr.appendChild(newTd);
    return newTd;
}

function displayForm() { 
    const dform = document.getElementById('bookForm');
    dform.classList.toggle('d-none');
}

function eraseBook(index){
    libraryCollection.splice(index,1);
    reloadPage();
}

function createNewButton(idText, eraseButton, text='Erase'){
    const newButton=document.createElement('button');
    newButton.textContent= text;
    newButton.setAttribute('id',idText);
    eraseButton.appendChild(newButton);
}

function changeReadToUnread(index) {
    libraryCollection[index].read = !(libraryCollection[index].read);
    reloadPage();
}

function displayBook(book,index){
    const table = document.getElementById('result-table');
    const newRow = document.createElement('tr');
    table.appendChild(newRow);
    createNewTd(book.title, newRow);
    createNewTd(book.author, newRow);
    createNewTd(book.pages, newRow);

        let status='';
        if (book.read==false){
            status='Not read';
        }
        else{
            status='Read'
        }

    createNewTd(status, newRow);
    
    //Create Erase Button
    let idbtn='btnErase'+index;
    let eraseRow=newTdForRowButton(newRow);
    createNewButton(idbtn,eraseRow);
    
    //Create ReadUnread Button
    idbtn='btnReadUnread'+index;
    let statusTd=newTdForRowButton(newRow);
    const textReadButton = readButtonText(index);
    createNewButton(idbtn, statusTd, textReadButton);
}

function showBooks(){
    libraryCollection.forEach(displayBook);
}


document.addEventListener('click', (e) => {
    if(e.target && e.target.id === 'd-form'){
        displayForm();
    }
    else if(e.target && e.target.id ==='submitForm'){
        insertBookLibraryCollection();
    }
    else if(e.target && (e.target.id).includes('btnErase')){
        const buttonIndex=(e.target.id).substr(e.target.id.length - 1);
        eraseBook(buttonIndex);
    }
    else if (e.target && (e.target.id).includes('btnReadUnread')){
        const buttonIndex=(e.target.id).substr(e.target.id.length-1);
        changeReadToUnread(buttonIndex);
    }
});

let libraryCollection=[];
InitializePage();
showBooks();