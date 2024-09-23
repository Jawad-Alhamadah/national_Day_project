let board = document.getElementById("board-conatiner")
let quickdraw_btn = document.getElementById("quickdraw-btn")
let prompt_btn = document.getElementById("prompt-btn")
let mirror_btn = document.getElementById("mirror-btn")
let recent_btn = document.getElementById("recent-btn")
let play_btn = document.getElementById("play-btn")


play_btn.addEventListener("click" , e=>{
    let a = document.createElement("a")
    a.setAttribute("href","pickmode.html")
    a.click()
})
quickdraw_btn.addEventListener("click", e => {
    e.preventDefault()
    board.innerHTML = ""
    fetch("https://66ed37a9380821644cdbfeb4.mockapi.io/image?mode=quickdraw")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            data.map(item => createCard(item.username, item.accurecy, item.imgUrl, item.message, "none"))
            quickdraw_btn.classList.add("active")
            prompt_btn.classList.remove("active")
            mirror_btn.classList.remove("active")
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
            quickdraw_btn.classList.remove("active")
            prompt_btn.classList.add("active")
            mirror_btn.classList.remove("active")
            recent_btn.classList.remove("active")
        })

})
mirror_btn.addEventListener("click", e => {
    e.preventDefault()
    board.innerHTML = ""
    fetch("https://66ed37a9380821644cdbfeb4.mockapi.io/image?mode=mirror")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            data.map(item => createCard(item.username, item.accurecy, item.imgUrl, item.message, "none"))
            quickdraw_btn.classList.remove("active")
            prompt_btn.classList.remove("active")
            mirror_btn.classList.add("active")
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

            quickdraw_btn.classList.remove("active")
            prompt_btn.classList.remove("active")
            mirror_btn.classList.remove("active")
            recent_btn.classList.add("active")
        })

})

recent_btn.click()



function createCard(username, score, imgUrl, message, mode) {

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'secondary-color');

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'g-0', 'd-flex', 'align-items-center', "pt-2");


    const usernameIconDiv = document.createElement('div');
    usernameIconDiv.classList.add('col-2', 'username-icon');

    const usernameImg = document.createElement('img');
    usernameImg.src = 'saudi-arabia.png';
    usernameImg.alt = '';

    usernameIconDiv.appendChild(usernameImg);


    const commentDiv = document.createElement('div');
    commentDiv.classList.add('col-4', 'comment-div');


    const usernameTextDiv = document.createElement('div');
    usernameTextDiv.classList.add('col-12', 'text-start', 'accent-text-color');
    usernameTextDiv.textContent = username + (mode === "none" ? "" : "-" + mode) 


    const commentTextDiv = document.createElement('div');
    commentTextDiv.classList.add('col-12', 'text-start', 'accent-text-color', 'comment' ,"mt-2");
    commentTextDiv.textContent = message;


    commentDiv.appendChild(usernameTextDiv);
    commentDiv.appendChild(commentTextDiv);


    const scoreImgDiv = document.createElement('div');
    scoreImgDiv.classList.add( "col-4","col-sm-2","col-md-2","col-lg-2", 'score-img', "d-grid", "justify-content-center", "pb-2");


    const scoreTextDiv = document.createElement('div');
    scoreTextDiv.classList.add('accent-text-color', "text-center",'col-2','col-sm-4','col-md-4','col-lg-4',
                               "d-flex", "justify-content-lg-end", "justify-content-md-end",
                               "justify-content-sm-end","justify-content-center"
                            );
    scoreTextDiv.textContent = mode === "prompt" ? "" :  score + "/100";


    const scoreImg = document.createElement('img');
    scoreImg.src = imgUrl;
    scoreImg.alt = 'art image';


    scoreImgDiv.appendChild(scoreImg);

    rowDiv.appendChild(usernameIconDiv);
    rowDiv.appendChild(commentDiv);
    rowDiv.appendChild(scoreTextDiv);
    rowDiv.appendChild(scoreImgDiv);

    cardBody.appendChild(rowDiv);

    board.appendChild(cardBody)

}



// fetch("https://66ed37a9380821644cdbfeb4.mockapi.io/image?")
// .then(res=>res.json())
// .then(data=>{
//     console.log(data)
//      data.map(data=>createCard(data.username,data.accurecy,data.imgUrl,data.message))
//   //  createCard(data.username,data.score,data.imgUrl,data.message)
// })