let signup_nav = document.getElementById("signup-nav")
let all_content = document.getElementById("all-content-container")
let login_nav =document.getElementById("nav-login")
 
function homePage() {
    localStorage.clear()
    localStorage.setItem("username","guest")
    all_content.innerHTML=""

    let mainDiv = document.createElement('div');
    let leaderboardSplitContainer = document.createElement('div');
    let leaderboardRow = document.createElement('div');
    let leaderboardDiv = document.createElement('div');
    let leaderboardFilter = document.createElement('div');
    let leaderboardButton = document.createElement('button');

    mainDiv.className = 'row g-0 d-lg-flex d-md-flex d-sm-flex d-grid';
    mainDiv.style.width="100%"
    
    leaderboardButton.id = 'leaderboard-btn';
    leaderboardSplitContainer.id = 'leaderboard-split-container';

    leaderboardSplitContainer.className = 'split-container col-12 col-sm-6 col-md-6 col-lg-6';
    leaderboardRow.className = 'row justify-content-center align-items-center col-12 g-0 leaderboard-container';
    leaderboardDiv.className = 'leaderboard justify-content-center text-center';
    leaderboardFilter.className = 'leaderboard-filter';
    leaderboardButton.className = 'leaderboard-title btn btn-success col-5';
    leaderboardButton.textContent = 'Leaderboard';

    leaderboardDiv.appendChild(leaderboardFilter);
    leaderboardDiv.appendChild(leaderboardButton);
    leaderboardRow.appendChild(leaderboardDiv);
    leaderboardSplitContainer.appendChild(leaderboardRow);
    mainDiv.appendChild(leaderboardSplitContainer);

    let playSplitContainer = document.createElement('div');
    playSplitContainer.className = 'split-container col-12 col-sm-6 col-md-6 col-lg-6';
    playSplitContainer.id = 'play-split-container';

    let playRow = document.createElement('div');
    playRow.className = 'row justify-content-center align-items-center col-12 g-0 play-container';

    let playDiv = document.createElement('div');
    playDiv.className = 'play justify-content-center text-center';

    let playFilter = document.createElement('div');
    playFilter.className = 'play-filter';

    let playButton = document.createElement('button');
    playButton.className = 'play-title btn btn-info col-5';
    playButton.id = 'play-btn';
    playButton.textContent = 'Play';

    playDiv.appendChild(playFilter);
    playDiv.appendChild(playButton);
    playRow.appendChild(playDiv);
    playSplitContainer.appendChild(playRow);
    mainDiv.appendChild(playSplitContainer);
    all_content.appendChild(mainDiv);

    let play_btn = document.getElementById("play-btn")
    let leaderboard_btn = document.getElementById("leaderboard-btn")

    leaderboard_btn.addEventListener("click",e=> {
        let a = document.createElement("a")
       a.setAttribute("href","leaderboard.html")
       a.click()

    })
    
    play_btn.addEventListener("click",(e)=>{
      
       let a = document.createElement("a")
       a.setAttribute("href","pickmode.html")
       a.click()
    })
    
    leaderboard_btn.addEventListener("mouseover",e=>{
       
        let cont = document.getElementById("leaderboard-split-container")
 
        cont.style.transform ="scale(1.1)"
       
       cont.style.zIndex=" 5"
       cont.style.filter="grayscale(0)"
       
    })
    
    play_btn.addEventListener("mouseleave",e=>{
       
        let cont = document.getElementById("play-split-container")
        cont.style.border="0px solid white"
        cont.style.transform ="scale(1)"
       
       cont.style.zIndex=""
       cont.style.filter="grayscale(1)"
       
    })
    
    

    play_btn.addEventListener("mouseover",e=>{
       
        let cont = document.getElementById("play-split-container")
      
        cont.style.transform ="scale(1.1)"
       
       cont.style.zIndex="5"
       cont.style.filter="grayscale(0)"
       
    })
    
    leaderboard_btn.addEventListener("mouseleave",e=>{
       
        let cont = document.getElementById("leaderboard-split-container")
      
        cont.style.transform ="scale(1)"
       
       cont.style.zIndex=""
       cont.style.filter="grayscale(1)"
       
    })
    
}


homePage()