let board = document.getElementById("board-conatiner")


function createCard(username,score,imgUrl,message) {
    // Create main card body div
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'secondary-color');
    
    // Create row div
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'g-0', 'd-flex', 'align-items-center');
    
    // Create username icon div
    const usernameIconDiv = document.createElement('div');
    usernameIconDiv.classList.add('col-2', 'col-lg-2', 'username-icon');
    
    // Create img element for username icon
    const usernameImg = document.createElement('img');
    usernameImg.src = 'saudi-arabia.png';
    usernameImg.alt = '';

    // Append img to username icon div
    usernameIconDiv.appendChild(usernameImg);
    
    // Create comment div
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('col-7', 'col-lg-5', 'comment-div');
    
    // Create username text div
    const usernameTextDiv = document.createElement('div');
    usernameTextDiv.classList.add('col-12', 'text-start', 'accent-text-color');
    usernameTextDiv.textContent = username;

    // Create comment text div
    const commentTextDiv = document.createElement('div');
    commentTextDiv.classList.add('col-12', 'text-start', 'accent-text-color', 'comment');
    commentTextDiv.textContent = message;
    
    // Append username and comment divs to commentDiv
    commentDiv.appendChild(usernameTextDiv);
    commentDiv.appendChild(commentTextDiv);
    
    // Create score and image div
    const scoreImgDiv = document.createElement('div');
    scoreImgDiv.classList.add('col-3', 'col-lg-5', 'score-img',"d-grid","justify-content-center","mb-3");
    
    // Create score text div
    const scoreTextDiv = document.createElement('div');
    scoreTextDiv.classList.add('accent-text-color',"text-center");
    scoreTextDiv.textContent = score+"/100";
    
    // Create img element for score
    const scoreImg = document.createElement('img');
    scoreImg.src = imgUrl;
    scoreImg.alt = 'art image';
    
    // Append score text and img to scoreImgDiv
    scoreImgDiv.appendChild(scoreTextDiv);
    scoreImgDiv.appendChild(scoreImg);
    
    // Append all sections to the row div
    rowDiv.appendChild(usernameIconDiv);
    rowDiv.appendChild(commentDiv);
    rowDiv.appendChild(scoreImgDiv);
    
    // Append row to the card body
    cardBody.appendChild(rowDiv);
    
    board.appendChild(cardBody)
    // Return the complete card body element
   // return cardBody;
}



fetch("https://66ed37a9380821644cdbfeb4.mockapi.io/image?mode=blitz")
.then(res=>res.json())
.then(data=>{
    
     data.map(data=>createCard(data.username,data.accurecy,data.imgUrl,data.message))
  //  createCard(data.username,data.score,data.imgUrl,data.message)
})