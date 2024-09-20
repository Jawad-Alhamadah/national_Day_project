 

const canvasSetup = document.getElementById("myCanvas");
const canvasSetup_2 = document.getElementById("myCanvas2");
const pixelit_canv = document.getElementById("pixelitcanvas")
const ctx = canvasSetup.getContext("2d");
const img = document.getElementById("my-img")

const ctx2=  canvasSetup_2.getContext("2d");
const colors = document.getElementById("colors")
const color_picker = document.getElementById("color-picker")
const brush_range = document.getElementById("brush-size-range")
let mouseDown = false
const home_nav_button = document.getElementById("home-nav-btn")

home_nav_button.onclick= ()=> window.location = "home.html"

ctx2.strokeStyle= "black"
ctx2.strokeStyle= color_picker.value
color_picker.value= "black"

color_picker.onchange = function(){
    ctx2.strokeStyle= color_picker.value
    console.log(color_picker.value)
}
ctx.strokeStyle = "black";
ctx.lineWidth = 3;


const essentialColors = [
    "#FF5733", "#FFBD33", "#DBFF33", "#75FF33", "#33FF57",
    "#33FFBD", "#33DBFF", "#3357FF", "#5733FF", "#BD33FF",
    "#FF33DB", "#FF33A6", "#FF5733", "#FF8D33", "#FFE133",
    "#FFEA33", "#A3FF33", "#33FF86", "#33FFC4", "#33B0FF",
    "#335BFF", "#5A33FF", "#FF33B5", "#FF336E", "#FF5A33",
    "#FFE7B1", "#D6FF33", "#FF1F3D", "#FF9A33", "#FFD700",
    "#C0C0C0", "#A9A9A9", "#808080", "#404040", "#000000",
    "#FFFFFF", "#F5F5F5", "#DCDCDC", "#F0F8FF", "#FAEBD7",
    "#FFE4C4", "#FFDEAD", "#FFF0F5", "#E6E6FA"
];


for(let i =0 ; i <40; i ++){
    let div = document.createElement("div")
    div.classList.add("color-div","card","d-flex",'align-self-center')
    div.style.backgroundColor=essentialColors[i]
    colors.appendChild(div)

    div.addEventListener("click", e=>{
        ctx2.strokeStyle= div.style.backgroundColor
        color_picker.value=ctx2.strokeStyle
    })
}




setTimeout(()=>{
    // if(pixelit_canv.width>canvasSetup.width){
       
    // }

//    ctx.drawImage(img,0,0,canvasSetup.width,canvasSetup.height)
//    ctx2.drawImage(img,0,0,canvasSetup_2.width,canvasSetup_2.height)
    canvasSetup_2.width=window.innerWidth*0.45
    canvasSetup.width=window.innerWidth*0.45

    canvasSetup_2.height=window.innerHeight*0.85
    canvasSetup.height=window.innerHeight*0.85
 
    if(window.innerWidth<=650){
        canvasSetup_2.width=window.innerWidth*0.90
        canvasSetup.width=window.innerWidth*0.90
    
        canvasSetup_2.height=window.innerHeight*0.40
        canvasSetup.height=window.innerHeight*0.40
    }
    

// ctx.drawImage(img, 0,0, img.width, img.height, 0,0,img.width*ratio, img.height*ratio);
  //  drawImageScaled(img,ctx)
    // drawImageProp(ctx,img,0,0,canvasSetup.width/2,canvasSetup.height/2,0,0)
    // drawImageProp(ctx2,img,0,0,canvasSetup_2.width/2,canvasSetup_2.height/2,0,0)
    drawImageProp(ctx,img,0,0,canvasSetup.width,canvasSetup.height,0,0)
    drawImageProp(ctx2,img,0,0,canvasSetup_2.width,canvasSetup_2.height,0,0)


},2000)

guessX = 0; //stores user's click on canvas
guessY = 0; //stores user's click on canvas
//canvasSetup.height= window.innerHeight
// canvasSetup_2.height=window.innerHeight

//  if(window.innerWidth<570){
//   //  canvasSetup.height= window.innerHeight/4
//     canvasSetup_2.height=window.innerHeight/4
//     drawImageProp(ctx,img,0,0,canvasSetup.width,canvasSetup.height,0,0)
//     drawImageProp(ctx2,img,0,0,canvasSetup_2.width,canvasSetup_2.height,0,0)
//  }

let lines = []

// canvasSetup_2.drawImage()

brush_range.addEventListener("mousemove",e=>{
    let brush_size = document.getElementById("brush-size")
    brush_size.textContent=brush_range.value
    console.log(brush_range.value)
})


function mousedownHandler (){
    console.log("inside canv click")
    mouseDown=true
        guessX = parseInt(event.offsetX*canvasSetup_2.width/canvasSetup_2.offsetWidth)+5;
        guessY = parseInt(event.offsetY*canvasSetup_2.height/canvasSetup_2.offsetHeight)+5;
        console.log(`coords:${guessX}x${guessY}`);
        ctx2.moveTo(guessX,guessY)
        ctx2.beginPath()
    }

canvasSetup_2.addEventListener("mousedown",event=> mousedownHandler(event)) 

canvasSetup_2.addEventListener("touchstart",event=> mousedownHandler(event)) 



function mousemoveHandle(event){
    
    if(mouseDown){
        guessX = parseInt(event.offsetX*canvasSetup_2.width/canvasSetup_2.offsetWidth)+5;
        guessY = parseInt(event.offsetY*canvasSetup_2.height/canvasSetup_2.offsetHeight)+5;
        console.log(`coords:${guessX}x${guessY}`);
       // ctx.strokeRect(guessX,guessY,10,10);
       ctx2.lineTo(guessX, guessY);
      ctx2.lineWidth=10
       ctx2.stroke();
    //    ctx2.fillRect(guessX,guessY,10,10)
    }

}


canvasSetup_2.addEventListener("mousemove",event =>mousemoveHandle(event))
canvasSetup_2.addEventListener("touchmove",event =>mousemoveHandle(event))



function mouseupHandle(event){
    mouseDown=false
  
    
   imgData = ctx.getImageData(0, 0, canvasSetup.width, canvasSetup.height);
   imgData2 = ctx2.getImageData(0, 0, canvasSetup_2.width, canvasSetup_2.height);

    let counter =0;
   console.log(imgData.data.length)
   for (let i = 0; i <imgData.data.length; i++){
        if(imgData.data[i]===imgData2.data[i])
            counter++
        else{
            counter--
        }
   }
  
//   canvasSetup_2.toBlob(blob=>{

//     const onFileSelected = async event => {
//         const uploadManager = new Bytescale.UploadManager({
//             apiKey: "public_FW25cDF3oZ4j2gSvXHYzeUB8Pto5" // This is your API key.
//           });
//           const { fileUrl, filePath } = await uploadManager.upload({ data: blob });
//           console.log(filePath)
//           alert(`File uploaded:\n${fileUrl}`);
//     }
//     onFileSelected()
   

//   })
   console.log("counter: " + counter)
   console.log("Percent: " +((counter/imgData.data.length)*100)+"%" )
//    canvasSetup_2.toBlob(blob=>{
//     const formData = new FormData();
//     formData.append('file', blob, 'image.png');
//     formData.append("upload_preset","ml_default")
//     fetch("https://api.cloudinary.com/v1_1/dfyhyddcy/upload",{
//         method: 'POST',
//         body:formData ,
//       headers: {
//        'Content-type': 'multi-part/form-data',
//     },
//       })
//       .then((response) => response.json())
//       .then((json) => console.log(json))
//       .catch(e=>{
//           console.log(e)
//       })


//    })
 
//    fetch("https://66ed37a9380821644cdbfeb4.mockapi.io/image/",{
//     method: 'POST',
//     body: JSON.stringify({
//       title: 'john',
//       data:[]
//     }),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
//     .then((response) => response.json())
//     .then((json) => console.log(json))
//     .catch(e=>{
//         console.log(e)
//     })
}
canvasSetup_2.addEventListener("mouseup",event =>mouseupHandle())
canvasSetup_2.addEventListener("touchend",event =>mouseupHandle())

window.addEventListener("resize",e=>{

    // if(window.innerWidth<=575){
    //     canvasSetup.height= window.innerHeight/4
    //     canvasSetup_2.height=window.innerHeight/4
    //     drawImageProp(ctx,img,0,0,canvasSetup.width,canvasSetup.height,0,0)
    //     drawImageProp(ctx2,img,0,0,canvasSetup_2.width,canvasSetup_2.height,0,0)
    //     return 
    //  }

    //  if(window.innerWidth<=550){
    //     canvasSetup.height= window.innerHeight/3
    //     canvasSetup_2.height=window.innerHeight/3
    //     drawImageProp(ctx,img,0,0,canvasSetup.width,canvasSetup.height,0,0)
    //     drawImageProp(ctx2,img,0,0,canvasSetup_2.width,canvasSetup_2.height,0,0)
    //     return 
    //  }
 
     
    //  if(window.innerWidth<=510){
    //     canvasSetup.height= window.innerHeight/2
    //     canvasSetup_2.height=window.innerHeight/2
    //     drawImageProp(ctx,img,0,0,canvasSetup.width,canvasSetup.height,0,0)
    //     drawImageProp(ctx2,img,0,0,canvasSetup_2.width,canvasSetup_2.height,0,0)
    //     return 
    //  }

    // canvasSetup.height= window.innerHeight
    // canvasSetup_2.height=window.innerHeight
    //  ctx.drawImage(img,0,0,canvasSetup.width,canvasSetup.height)
    //  ctx2.drawImage(img,0,0,canvasSetup_2.width,canvasSetup_2.height)
    canvasSetup_2.width=window.innerWidth*0.45
    canvasSetup.width=window.innerWidth*0.45

    if(window.innerWidth<=650){
        canvasSetup_2.width=window.innerWidth*0.90
        canvasSetup.width=window.innerWidth*0.90
    
        canvasSetup_2.height=window.innerHeight*0.40
        canvasSetup.height=window.innerHeight*0.40
    }

    drawImageProp(ctx,img,0,0,canvasSetup.width,canvasSetup.height,0,0)
    drawImageProp(ctx2,img,0,0,canvasSetup_2.width,canvasSetup_2.height,0,0)

})



function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill    
    if (nw < w) ar = w / nw;                             
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}



function drawImageScaled(img, ctx) {
    var canvas = ctx.canvas ;
    var hRatio = canvas.width  / img.width    ;
    var vRatio =  canvas.height / img.height  ;
    var ratio  = Math.min ( hRatio, vRatio );
    var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
    var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
  

    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(img, 0,0, img.width, img.height,
                       centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  
 }