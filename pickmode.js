let mirror_btn = document.getElementById("mirror-btn")
let prompt_btn = document.getElementById("prompt-btn")
let quickdraw_btn = document.getElementById("quickdraw-btn")




let logout_btn = document.getElementById("log-out")
let username_btn = document.getElementById("username")

let signup_nav = document.getElementById('signup-nav')
let nav_login = document.getElementById('nav-login')

username_btn.textContent = localStorage.getItem("username")

console.log(localStorage.getItem("username"))
if (localStorage.getItem("username") === "guest") {

    username_btn.classList.add("hidden")
    logout_btn.classList.add("hidden")

    signup_nav.classList.remove("hidden")
    nav_login.classList.remove("hidden")
}
else if (localStorage.getItem("username") !== undefined) {

    username_btn.classList.remove("hidden")
    logout_btn.classList.remove("hidden")

    signup_nav.classList.add("hidden")
    nav_login.classList.add("hidden")
}

logout_btn.addEventListener("click", e => {
    e.preventDefault()
    localStorage.clear()
    localStorage.setItem("username", "guest")

    username_btn.textContent = localStorage.getItem("username")
    username_btn.classList.add("hidden")
    logout_btn.classList.add("hidden")
    signup_nav.classList.remove("hidden")
    nav_login.classList.remove("hidden")

})

mirror_btn.addEventListener("click", e => {
    e.preventDefault()
    localStorage.setItem("mode", "mirror")
    window.location = "paint.html"
})
prompt_btn.addEventListener("click", e => {
    e.preventDefault()
    localStorage.setItem("mode", "prompt")
    window.location = "paint.html"
})
quickdraw_btn.addEventListener("click", e => {
    e.preventDefault()
    localStorage.setItem("mode", "quickdraw")
    window.location = "paint.html"
})