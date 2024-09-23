let board = document.getElementById("board-conatiner")
let quickdraw_btn = document.getElementById("quickdraw-btn")
let prompt_btn = document.getElementById("prompt-btn")
let mirror_btn = document.getElementById("mirror-btn")
let recent_btn = document.getElementById("recent-btn")
let play_btn = document.getElementById("play-btn")

let logout_btn = document.getElementById("log-out")
let username_btn = document.getElementById("username")

let signup_nav = document.getElementById('signup-nav')
let nav_login = document.getElementById('nav-login')



username_btn.textContent = localStorage.getItem("username")

if (localStorage.getItem("username")==="guest"){

    username_btn.classList.add("hidden")
    logout_btn.classList.add("hidden")
    
    signup_nav.classList.remove("hidden")
    nav_login.classList.remove("hidden")
}
else if(localStorage.getItem("username")!==undefined){

    username_btn.classList.remove("hidden")
    logout_btn.classList.remove("hidden")

    signup_nav.classList.add("hidden")
    nav_login.classList.add("hidden")
}



logout_btn.addEventListener("click",e=>{
    e.preventDefault()
    localStorage.clear()
    localStorage.setItem("username","guest")

    username_btn.textContent = localStorage.getItem("username")
    username_btn.classList.add("hidden")
    logout_btn.classList.add("hidden")
    signup_nav.classList.remove("hidden")
    nav_login.classList.remove("hidden")

})






play_btn.addEventListener("click", e => {
    let a = document.createElement("a")
    a.setAttribute("href", "pickmode.html")
    a.click()
})
quickdraw_btn.addEventListener("click", e => {
    e.preventDefault()
    board.innerHTML = ""
    fetch("https://66ed37a9380821644cdbfeb4.mockapi.io/image?mode=quickdraw")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            data.map(item => createCard(item.username, item.accurecy, item.imgUrl, item.message, "quickdraw"))
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

            data.map(item => createCard(item.username, item.accurecy, item.imgUrl, item.message, "prompt"))
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

            data.map(item => createCard(item.username, item.accurecy, item.imgUrl, item.message, "mirror"))
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
            data.map(item => createCard(item.username, item.accurecy, item.imgUrl, item.message, item.mode,"recent"))

            quickdraw_btn.classList.remove("active")
            prompt_btn.classList.remove("active")
            mirror_btn.classList.remove("active")
            recent_btn.classList.add("active")
        })

})

recent_btn.click()



function createCard(username, score, imgUrl, message, mode,isRecent) {

    const cardBody = document.createElement('div');
    const rowDiv = document.createElement('div');
    const usernameIconDiv = document.createElement('div');
    const usernameImg = document.createElement('img');
    const commentDiv = document.createElement('div');
    const usernameTextDiv = document.createElement('div');
    const commentTextDiv = document.createElement('div');
    const scoreImgDiv = document.createElement('div');
    const scoreTextDiv = document.createElement('div');
    const scoreImg = document.createElement('img');

    cardBody.classList.add('card-body', 'secondary-color');
    rowDiv.classList.add('row', 'g-0', 'd-flex', 'align-items-center', "pt-2");
    usernameIconDiv.classList.add('col-2', 'username-icon');
    commentDiv.classList.add('col-4', 'comment-div');
    usernameTextDiv.classList.add('col-12', 'text-start', 'accent-text-color');
    commentTextDiv.classList.add('col-12', 'text-start', 'accent-text-color', 'comment', "mt-2");
    scoreImgDiv.classList.add("col-4", "col-sm-2", "col-md-2", "col-lg-2", 'score-img', "d-grid", "justify-content-center", "pb-2");
    scoreTextDiv.classList.add('accent-text-color', "text-center", 'col-2', 'col-sm-4', 'col-md-4', 'col-lg-4',
        "d-flex", "justify-content-lg-end", "justify-content-md-end",
        "justify-content-sm-end", "justify-content-center"
    );



    usernameImg.src = 'saudi-arabia.png';
    usernameImg.alt = '';
    scoreImg.src = imgUrl;
    scoreImg.alt = 'art image';


    usernameTextDiv.textContent = username + (isRecent === undefined ? "" : "-" + mode)
    commentTextDiv.textContent = message;
    scoreTextDiv.textContent = mode === "prompt" ? "" : score + "/100";

    usernameIconDiv.appendChild(usernameImg);
    commentDiv.appendChild(usernameTextDiv);
    commentDiv.appendChild(commentTextDiv);

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