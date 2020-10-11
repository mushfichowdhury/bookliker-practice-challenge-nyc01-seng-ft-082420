document.addEventListener("DOMContentLoaded", function() {
    const baseURL = "http://localhost:3000/books/"
    const currentUser = {"id":1, "username":"pouros"}


// 1. getBooks --> fetch request for books
// 2. renderBooks --> Display book title on div.list-panel
// 3. .addEventListener to book title in order to display book details

    

    const getBooks = () => {
        fetch(baseURL)
        .then(resp => resp.json())
        .then(books => renderBooks(books))
    }

    const renderBooks = (books) => {
        for(const bookObj of books) {
            renderBook(bookObj)
        }
    }

    const renderBook = (bookObj) => {
        const bookList = document.querySelector('#list')
        const bookLi = document.createElement('li')

        bookLi.classList.add("book-class")
        bookLi.dataset.id = bookObj.id 

        bookLi.innerText = `${bookObj.title}`

        bookList.appendChild(bookLi)
        }
    
    const renderBookInfo = (clickedBook) => {
        let showPanel = document.querySelector('#show-panel')
        showPanel.dataset.id = clickedBook.id 
        const bookUsers = clickedBook.users

        
        showPanel.innerHTML = `
        <img src= ${clickedBook.img_url}>
        <h3>${clickedBook.description}</h3>
        <button class="like">Like</button>
        `
        
        bookUsers.forEach(user => {
            const li = document.createElement('li')
            li.textContent = user.username

            const bookUsersList = document.createElement('ul')
            let showPanel = document.querySelector('#show-panel')
            showPanel.appendChild(bookUsersList)
            bookUsersList.appendChild(li)
        })
    }

    
    const clickHandler = () => {
        document.addEventListener('click', function(e) {
            if(e.target.matches('.book-class')) {
                let clickedBook = e.target 
                let clickedBookId = clickedBook.dataset.id
                console.log(clickedBookId)

                fetch(baseURL + clickedBookId)
                .then(response => response.json())
                .then(clickedBook => renderBookInfo(clickedBook))
            }

            else if(e.target.matches(".like")) {
                const likeBtn = e.target 
                //assign likeBtn to the parent element ID

                getLike(&&&)
            }
        })



    }
    
 
    
    
    getBooks();
    clickHandler();
});
