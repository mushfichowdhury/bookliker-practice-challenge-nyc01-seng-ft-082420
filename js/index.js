document.addEventListener("DOMContentLoaded", function() {
    const baseURL = "http://localhost:3000/books/"
    const currentUser = {"id":1, "username":"pouros"}

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

        bookLi.textContent = bookObj.title
        bookList.appendChild(bookLi)
        }
    
    const renderBookInfo = (clickedBook) => {
        const showPanel = document.querySelector('#show-panel')
        showPanel.dataset.id = clickedBook.id 
        const bookUsers = clickedBook.users
        const alreadyLiked = bookUsers.find(users => users.username === currentUser.username)
        
        showPanel.innerHTML = `
        <img src= ${clickedBook.img_url}>
        <h2>${clickedBook.title}</h2>
        <h2>${clickedBook.subtitle}</h2>
        <h2>${clickedBook.author}</h2>
        <p>${clickedBook.description}</p>
        <h4>Likes</h4>
        `
        
        bookUsers.forEach(user => {
            const li = document.createElement('li')
            li.textContent = user.username

            const bookUsersList = document.createElement('ul')
            let showPanel = document.querySelector('#show-panel')
            showPanel.appendChild(bookUsersList)
            bookUsersList.appendChild(li)
        })

        const likeBtn = document.createElement('button')
        likeBtn.id = 'like-btn'
        showPanel.append(likeBtn)
        
        if(!alreadyLiked) {
            likeBtn.textContent = 'LIKE'
        } 
        else {
            likeBtn.textContent = 'UNLIKE'
        }
    }

    const getLikes = (bookId) => {

        fetch(baseURL + bookId)
        .then(response => response.json())
        .then(book => {
            let usersLiked = book.users
            const alreadyLiked = usersLiked.find(user => user.username === currentUser.username)
            
            if(!alreadyLiked) {
                usersLiked.push(currentUser)
                addLike(usersLiked, book.id)
            } else {
                usersLiked.pop(currentUser)
                addLike(usersLiked, book.id)
            }
        })
    }

    const addLike = (usersLiked, book) => {
        const options = {
            method: "PATCH",
            headers: {
            "content-type": "application/json",
            "accept": "application/json"
            }, 
            body: JSON.stringify({
            users: usersLiked
            })
        }
    
        fetch(baseURL + book, options)
            .then(response => response.json())
            .then(clickedBook => renderBookInfo(clickedBook))
        
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
        })
    }
            
    const likeHandler = () => {
        document.addEventListener('click', function(e) {
            if(e.target.id === "like-btn") {
                const likeBtn = e.target
                const bookId = likeBtn.parentElement.dataset.id
                getLikes(bookId)
            }
        })
    }
    

    
    getBooks();
    clickHandler();
    likeHandler();
});
