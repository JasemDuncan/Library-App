//Constructor
class Book {
    constructor(title,author,pages,read){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.read=read;
    }
}

let libraryCollection=[];

function InitializePage(){
    if(localStorage.getItem('library')){
        libraryCollection=JSON.parse(localStorage.getItem('library'));
    }
    else{
        libraryCollection=[];
    }
    return libraryCollection;
}
