let board = document.getElementById("board-conatiner")
let blitz_btn = document.getElementById("blitz-btn")
let prompt_btn = document.getElementById("prompt-btn")
let normal_btn = document.getElementById("normal-btn")
let recent_btn = document.getElementById("recent-btn")
let play_btn = document.getElementById("play-btn")


play_btn.addEventListener("click" , e=>{
    let a = document.createElement("a")
    a.setAttribute("href","pickmode.html")
    a.click()
})
blitz_btn.addEventListener("click", e => {
    e.preventDefault()
    board.innerHTML = ""
    fetch("https://66ed37a9380821644cdbfeb4.mockapi.io/image?mode=blitz")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            data.map(item => createCard(item.username, item.accurecy, item.imgUrl, item.message, "none"))
            blitz_btn.classList.add("active")
            prompt_btn.classList.remove("active")
            normal_btn.classList.remove("active")
            recent_btn.classList.remove("active")
        })

})
prompt_btn.addEventListener("click", e => {
    e.preventDefault()
    board.innerHTML = ""
    fetch("https://66ed37a9380821644cdbfeb4.mockapi.io/image?mode=prompt")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            data.map(item => createCard(item.username, item.accurecy, item.imgUrl, item.message, "none"))
            blitz_btn.classList.remove("active")
            prompt_btn.classList.add("active")
            normal_btn.classList.remove("active")
            recent_btn.classList.remove("active")
        })

})
normal_btn.addEventListener("click", e => {
    e.preventDefault()
    board.innerHTML = ""
    fetch("https://66ed37a9380821644cdbfeb4.mockapi.io/image?mode=normal")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            data.map(item => createCard(item.username, item.accurecy, item.imgUrl, item.message, "none"))
            blitz_btn.classList.remove("active")
            prompt_btn.classList.remove("active")
            normal_btn.classList.add("active")
            recent_btn.classList.remove("active")
        })

})
recent_btn.addEventListener("click", e => {
    e.preventDefault()
    board.innerHTML = ""
    fetch("https://66ed37a9380821644cdbfeb4.mockapi.io/image")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.sort((a, b) => b.id - a.id)
            data.map(item => createCard(item.username, item.accurecy, item.imgUrl, item.message, item.mode))

            blitz_btn.classList.remove("active")
            prompt_btn.classList.remove("active")
            normal_btn.classList.remove("active")
            recent_btn.classList.add("active")
        })

})

recent_btn.click()



function createCard(username, score, imgUrl, message, mode) {
    // Create main card body div
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'secondary-color');
    // Create row div
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'g-0', 'd-flex', 'align-items-center', "pt-2");

    // Create username icon div
    const usernameIconDiv = document.createElement('div');
    usernameIconDiv.classList.add('col-2', 'username-icon');

    // Create img element for username icon
    const usernameImg = document.createElement('img');
    usernameImg.src = 'saudi-arabia.png';
    usernameImg.alt = '';

    // Append img to username icon div
    usernameIconDiv.appendChild(usernameImg);

    // Create comment div
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('col-4', 'comment-div');

    // Create username text div
    const usernameTextDiv = document.createElement('div');
    usernameTextDiv.classList.add('col-12', 'text-start', 'accent-text-color');
    usernameTextDiv.textContent = username + (mode === "none" ? "" : "-" + mode) //localStorage.getItem("username")//username;

    // Create comment text div
    const commentTextDiv = document.createElement('div');
    commentTextDiv.classList.add('col-12', 'text-start', 'accent-text-color', 'comment' ,"mt-2");
    commentTextDiv.textContent = message;

    // Append username and comment divs to commentDiv
    commentDiv.appendChild(usernameTextDiv);
    commentDiv.appendChild(commentTextDiv);

    // Create score and image div
    const scoreImgDiv = document.createElement('div');
    scoreImgDiv.classList.add( "col-4","col-sm-2","col-md-2","col-lg-2", 'score-img', "d-grid", "justify-content-center", "pb-2");

    // Create score text div
    const scoreTextDiv = document.createElement('div');
    scoreTextDiv.classList.add('accent-text-color', "text-center",'col-2','col-sm-4','col-md-4','col-lg-4',
                               "d-flex", "justify-content-lg-end", "justify-content-md-end",
                               "justify-content-sm-end","justify-content-center"
                            );
    scoreTextDiv.textContent = score + "/100";

    // Create img element for score
    const scoreImg = document.createElement('img');
    scoreImg.src = imgUrl;
    scoreImg.alt = 'art image';

    // Append score text and img to scoreImgDiv

    scoreImgDiv.appendChild(scoreImg);

    // Append all sections to the row div
    rowDiv.appendChild(usernameIconDiv);
    rowDiv.appendChild(commentDiv);
    rowDiv.appendChild(scoreTextDiv);
    rowDiv.appendChild(scoreImgDiv);

    // Append row to the card body
    cardBody.appendChild(rowDiv);

    board.appendChild(cardBody)
    // Return the complete card body element
    // return cardBody;
}



// fetch("https://66ed37a9380821644cdbfeb4.mockapi.io/image?")
// .then(res=>res.json())
// .then(data=>{
//     console.log(data)
//      data.map(data=>createCard(data.username,data.accurecy,data.imgUrl,data.message))
//   //  createCard(data.username,data.score,data.imgUrl,data.message)
// })