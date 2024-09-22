let normal_btn = document.getElementById("normal-btn")
let prompt_btn = document.getElementById("prompt-btn")
let blitz_btn = document.getElementById("blitz-btn")

normal_btn.addEventListener("click", e=>{
    e.preventDefault()
    // let a = document.createElement("a")
    // a.setAttribute("href","")
    // a.click()
    localStorage.setItem("mode","normal")
    window.location="paint.html"
})
prompt_btn.addEventListener("click", e=>{
    e.preventDefault()
    // let a = document.createElement("a")
    // a.setAttribute("href","")
    // a.click()
    localStorage.setItem("mode","prompt")
    window.location="paint.html"
})
blitz_btn.addEventListener("click", e=>{
    e.preventDefault()
    // let a = document.createElement("a")
    // a.setAttribute("href","")
    // a.click()
    localStorage.setItem("mode","blitz")
    window.location="paint.html"
})