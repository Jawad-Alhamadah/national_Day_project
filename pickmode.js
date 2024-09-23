let mirror_btn = document.getElementById("mirror-btn")
let prompt_btn = document.getElementById("prompt-btn")
let quickdraw_btn = document.getElementById("quickdraw-btn")

mirror_btn.addEventListener("click", e=>{
    e.preventDefault()
    // let a = document.createElement("a")
    // a.setAttribute("href","")
    // a.click()
    localStorage.setItem("mode","mirror")
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
quickdraw_btn.addEventListener("click", e=>{
    e.preventDefault()
    // let a = document.createElement("a")
    // a.setAttribute("href","")
    // a.click()
    localStorage.setItem("mode","quickdraw")
    window.location="paint.html"
})