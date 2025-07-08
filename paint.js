const essentialColors = [
  "#FF5733",
  "#FFBD33",
  "#DBFF33",
  "#75FF33",
  "#33FF57",
  "#33FFBD",
  "#33DBFF",
  "#3357FF",
  "#5733FF",
  "#BD33FF",
  "#FF33DB",
  "#FF33A6",
  "#FF5733",
  "#FF8D33",
  "#FFE133",
  "#FFEA33",
  "#A3FF33",
  "#33FF86",
  "#33FFC4",
  "#33B0FF",
  "#335BFF",
  "#5A33FF",
  "#FF33B5",
  "#FF336E",
  "#FF5A33",
  "#FFE7B1",
  "#D6FF33",
  "#FF1F3D",
  "#FF9A33",
  "#FFD700",
  "#C0C0C0",
  "#A9A9A9",
  "#808080",
  "#404040",
  "#000000",
  "#FFFFFF",
  "#F5F5F5",
  "#DCDCDC",
  "#F0F8FF",
  "#FAEBD7",
  "#FFE4C4",
  "#FFDEAD",
  "#FFF0F5",
  "#E6E6FA",
  "#F0E68C",
  "#E6E6FA",
  "#FFFACD",
  "#FF69B4",
  "#CD5C5C",
  "#4B0082",
  "#20B2AA",
  "#778899",
  "#B0C4DE",
  "#32CD32",
];

const draw_prompts = [
  "King Abdullah",
  "Prince Mohammed bin Salman",
  "a Saudi Guy",
  "Arabic Coffee",
  "Al Madinah",
  " 100 Riyal Note",
  "a Camel",
  `the first thing you think of when you hear "national day"`,
  "Palm tree and dates",
  "Riyadh traffic",
  "Mecca",
  "Riyadh Tower",
  "Saudis Celebrating national day",
  "Saudi Pilots flying a plane",
  "The Saudi national Football team Win ",
  "Fireworks in the Capital",
  "Giant Truck with Giant Flags",
  "A Women carrying the Saudi flag",
  "Draw the Logo of your Favorite Saudi company",
];

const canvasSetup = document.getElementById("myCanvas");
const canvasSetup_2 = document.getElementById("myCanvas2");
const pixelit_canv = document.getElementById("pixelitcanvas");
const ctx = canvasSetup.getContext("2d");
const img = document.getElementById("my-img");

const ctx2 = canvasSetup_2.getContext("2d");
const colors = document.getElementById("colors");
const color_picker = document.getElementById("color-picker");
const brush_range = document.getElementById("brush-size-range");
let mouseDown = false;
const home_nav_button = document.getElementById("home-nav-btn");
const submit_nav_button = document.getElementById("submit-nav-btn");
const leaderboard_btn = document.getElementById("leaderboard-btn");
const time_span = document.getElementById("time");

const another_btn = document.getElementById("another-btn");
const dropper_btn = document.getElementById("dropper");
const user_span = document.getElementById("user-span");
let color_dropper = false;
let brush = true;
let isUploading = false;  // Add upload flag

const mode_nav_btn = document.getElementById("mode-nav-btn");

user_span.textContent = localStorage.getItem("username");

// Prevent navigation during upload
window.addEventListener('beforeunload', (e) => {
  if (isUploading) {
    e.preventDefault();
    e.returnValue = '';
    return '';
  }
});

// Prevent any accidental navigation during upload
window.addEventListener('popstate', (e) => {
  if (isUploading) {
    e.preventDefault();
    e.stopPropagation();
    history.pushState(null, null, location.href);
    return false;
  }
});

mode_nav_btn.addEventListener("click", (e) => {
  if (isUploading) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  e.preventDefault();
  e.stopPropagation();
  let temp_a = document.createElement("a");
  temp_a.setAttribute("href", "pickmode.html");
  temp_a.click();
});
dropper_btn.addEventListener("click", (e) => {
  if (color_dropper) {
    color_dropper = false;
    brush = true;
    dropper_btn.classList.remove("dropper-pressed");
  } else {
    color_dropper = true;
    brush = false;
    dropper_btn.classList.add("dropper-pressed");
  }
});

canvasSetup.style.backgroundColor = "black";

another_btn.addEventListener("click", (e) => {
  minutes = 5;
  seconds = 0;
  time_span.innerText = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  renewCanvas();
});

let init_time = Date.now();
var minutes = 5;
var seconds = 0;

let guessX = 0;
let guessY = 0;

let lines = [];
let timed_out = false;

setInterval(() => {
  if (Date.now() - init_time > 1000) {
    init_time = Date.now();
    time_span.innerText = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    seconds--;
    if (minutes <= 0 && seconds <= 0 && !timed_out && !isUploading) {
      time_span.innerText = "0:00";
      submit_nav_button.click();
      timed_out = true;
    }

    if (seconds < 0 && minutes > 0) {
      seconds = 59;
      minutes--;
    }

    if (seconds < 0) {
      seconds = 0;
    }
  }
}, 100);

window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    colors.innerHTML = "";
    for (let i = 0; i < 15; i++) {
      let div = document.createElement("div");
      div.classList.add("color-div", "card", "d-flex", "align-self-center");
      div.style.backgroundColor = essentialColors[i];
      colors.appendChild(div);

      div.addEventListener("click", (e) => {
        ctx2.strokeStyle = div.style.backgroundColor;
        color_picker.value = ctx2.strokeStyle;
      });
    }
  } else {
    colors.innerHTML = "";
    for (let i = 0; i < 50; i++) {
      let div = document.createElement("div");
      div.classList.add("color-div", "card", "d-flex", "align-self-center");
      div.style.backgroundColor = essentialColors[i];
      colors.appendChild(div);

      div.addEventListener("click", (e) => {
        ctx2.strokeStyle = div.style.backgroundColor;
        color_picker.value = ctx2.strokeStyle;
      });
    }
  }
});

let mode = localStorage.getItem("mode");
let username = localStorage.getItem("username");

function start() {
  if (window.innerWidth <= 768) {
    colors.innerHTML = "";
    for (let i = 0; i < 15; i++) {
      let div = document.createElement("div");
      div.classList.add("color-div", "card", "d-flex", "align-self-center");
      div.style.backgroundColor = essentialColors[i];
      colors.appendChild(div);

      div.addEventListener("click", (e) => {
        ctx2.strokeStyle = div.style.backgroundColor;
        color_picker.value = ctx2.strokeStyle;
      });
    }
  } else {
    for (let i = 0; i < 50; i++) {
      let div = document.createElement("div");
      div.classList.add("color-div", "card", "d-flex", "align-self-center");
      div.style.backgroundColor = essentialColors[i];
      colors.appendChild(div);

      div.addEventListener("click", (e) => {
        ctx2.strokeStyle = div.style.backgroundColor;
        color_picker.value = ctx2.strokeStyle;
      });
    }
  }

  time_span.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  ctx2.strokeStyle = "black";
  ctx2.strokeStyle = color_picker.value;
  color_picker.value = "black";

  color_picker.onchange = () => (ctx2.strokeStyle = color_picker.value);
  color_picker.onclick = () => color_picker.classList.remove("rainbow-border");

  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  brush_range.value = 1;

  canvasSetup_2.width = window.innerWidth * 0.45;
  canvasSetup.width = window.innerWidth * 0.45;

  canvasSetup_2.height = window.innerHeight * 0.85;
  canvasSetup.height = window.innerHeight * 0.85;

  if (window.innerWidth <= 650) {
    canvasSetup_2.width = window.innerWidth * 0.9;
    canvasSetup.width = window.innerWidth * 0.9;

    canvasSetup_2.height = window.innerHeight * 0.42;
    canvasSetup.height = window.innerHeight * 0.42;
  }

  if (localStorage.getItem("mode") === "prompt") {
    time_span.classList.add("hidden");
    canvasSetup.style.display = "none";
    canvasSetup_2.width = window.innerWidth * 0.9;
    canvasSetup_2.height = window.innerHeight * 0.85;
    another_btn.textContent = "next Prompt";
    let random_img = Math.floor(Math.random() * draw_prompts.length);
    Swal.fire("Draw " + draw_prompts[random_img]);
  }

  if (localStorage.getItem("mode") === "mirror") {
    time_span.classList.add("hidden");
    Swal.fire("Draw the image accurately");
  }

  if (localStorage.getItem("mode") === "quickdraw") {
    time_span.classList.remove("hidden");
    Swal.fire("Draw the image quickly! you only have 5 minutes").then(
      (res) => {}
    );
  }

  clearCanvas(canvasSetup_2.width, canvasSetup_2.height, ctx2);
  drawImageScaled(img, ctx);
}

document.getElementById("save-icon").onclick = () => {
  let a = document.createElement("a");
  let uri = canvasSetup_2.toDataURL("image/jpeg", 1.0);
  a.href = uri;
  a.download = Date.now() + "_image.jpeg";
  a.click();
};

document.getElementById("brush-size").textContent = brush_range.value;
home_nav_button.onclick = (e) => {
  if (isUploading) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  window.location = "index.html";
};

submit_nav_button.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  
  // Prevent multiple submissions during upload
  if (isUploading) {
    return false;
  }
  
  let counter = 0;

  imgData = ctx.getImageData(0, 0, canvasSetup.width, canvasSetup.height);
  imgData2 = ctx2.getImageData(0, 0, canvasSetup_2.width, canvasSetup_2.height);

  for (let i = 2; i < imgData.data.length; i++) {
    let isRedAcc = Math.abs(imgData.data[i] - imgData2.data[i]) < 20;
    let isBlueAcc = Math.abs(imgData.data[i - 1] - imgData2.data[i - 1]) < 20;
    let isGreebAcc = Math.abs(imgData.data[i - 2] - imgData2.data[i - 2]) < 20;
    if (isRedAcc && isBlueAcc && isGreebAcc) counter++;
  }
  let accurecy = Math.floor((counter / imgData.data.length) * 100);
  if (accurecy < 0) accurecy = 0;
  postImage(accurecy);
});

brush_range.addEventListener("mousemove", (e) => {
  let brush_size = document.getElementById("brush-size");
  brush_size.textContent = brush_range.value;
});

function postImage(accurecy) {
  if (localStorage.getItem("mode") === "mirror") {
    Swal.fire({
      title: "Your Accurecy is: ",
      text: accurecy + "/100",
      icon: accurecy > 50 ? "success" : "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#55cc14",
      cancelButtonText: "Try another image",
      confirmButtonText: "Post it on the Board",
    }).then((result) => {
      if (result.isConfirmed) {
        let temp_img = new Image();
        temp_img.src = canvasSetup_2.toDataURL("image/png");

       
 uploadImage(accurecy, temp_img);
         return false;
      }

      if (result.isDismissed && result.dismiss == "cancel") {
        renewCanvas();
      }
    });
  }

  if (localStorage.getItem("mode") === "quickdraw") {
    Swal.fire({
      title: "Your Accurecy is: ",
      text: accurecy + "/100",
      icon: accurecy > 50 ? "success" : "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#55cc14",
      cancelButtonText: "Try another image",
      confirmButtonText: "Post it on the Board",
    }).then((result) => {
      if (result.isConfirmed) {
        let temp_img = new Image();
        temp_img.src = canvasSetup_2.toDataURL("image/png");


        uploadImage(accurecy, temp_img);
      }

      if (result.isDismissed && result.dismiss == "cancel") {
        minutes = 5;
        seconds = 0;
        time_span.innerText =
          minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        renewCanvas();
      }

      if (
        result.isDismissed &&
        localStorage.getItem("mode") === "quickdraw" &&
        minutes === 0 &&
        seconds === 0
      ) {
        minutes = 5;
        seconds = 0;
        time_span.innerText =
          minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        renewCanvas();
      }
    });
  }
  if (localStorage.getItem("mode") === "prompt") {
    Swal.fire({
      title: "nice",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#55cc14",
      cancelButtonText: "Try Another Prompt",
      confirmButtonText: "Post it on the Board",
    }).then((result) => {
      if (result.isConfirmed) {
        let temp_img = new Image();
        temp_img.src = canvasSetup_2.toDataURL("image/png");



    uploadImage(0, temp_img);

      }

      if (result.isDismissed && result.dismiss == "cancel") {
        let random_img = Math.floor(Math.random() * draw_prompts.length);
        Swal.fire("Draw " + draw_prompts[random_img]);
        renewCanvas();
      }
    });
  }
}

function uploadImage(accurecy, temp_img) {
    isUploading = true;  // Set upload flag
    Swal.fire({
        imageUrl: "naDay.jpg",
        imageWidth: 300,
        imageHeight: 300,
        title: "Write a comment: ",
        color: "green",
        "font-weight": "500",
        input: "textarea",
        inputAttributes: {
            autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Post Art",
        showLoaderOnConfirm: true,

        preConfirm: async (comment) => {
            try {
                // Convert toBlob to a Promise
                const blob = await new Promise((resolve, reject) => {
                    canvasSetup_2.toBlob((blob) => {
                        if (blob) resolve(blob);
                        else reject(new Error("Failed to generate image blob"));
                    });
                });

               
                //  const formData = new FormData();
                //  formData.append('image', blob, 'userUpload.png');


                //  const uploadResponse = await fetch(
                //     "http://localhost:8080/uploadImage",
                //     {
                //         method: "POST",
                //         body: formData,
                //         mode: "cors",
                //         cache: 'no-cache',
                //         headers: {
                //             'Accept': 'application/json, text/plain, */*'
                //         }
                //     }
                // )

                
                const jsonResponse = await uploadResponse.json()
                const fileUrl = jsonResponse.imageUrl
                console.log(jsonResponse)

                
                const response = await fetch(
                    "https://66ed37a9380821644cdbfeb4.mockapi.io/image",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            username: username,
                            message: comment,
                            userId: 0,
                            imgUrl: fileUrl,
                            accurecy: accurecy,
                            mode: mode,
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                    }
                );

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to post image: ${response.status} ${response.statusText} - ${errorText}`);
                }

                // Handle the response properly
                const responseText = await response.text();
                console.log('Upload successful:', responseText);

                return true; // Signal success
            } catch (error) {
                Swal.showValidationMessage(`Request failed: ${error.message}`);
                return false; // Signal failure
            }
        },

        allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
        // Clear upload flag first
        isUploading = false;
        
        // Prevent any event bubbling or default actions
        try {
            if (window.event) {
                window.event.preventDefault();
                window.event.stopPropagation();
            }
        } catch (e) {
            // Ignore any event handling errors
        }
        
        ctx2.drawImage(
            temp_img,
            0,
            0,
            canvasSetup_2.width,
            canvasSetup_2.height
        );
        if (window.width < 400) {
            setTimeout(
                () => ctx2.drawImage(
                    temp_img,
                    0,
                    0,
                    canvasSetup_2.width,
                    canvasSetup_2.height
                ),
                1000
            );
        }

        if (result.isDismissed && result.dismiss == "cancel") {
            Swal.fire({
                title: "Post Cancelled",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }

        if (result.isConfirmed) {
            Swal.fire({
                title: "Image posted to leaderboard!",
                text: "Check out the leaderboard to see your post",
                icon: "success",
            });
        }
        return false;
    }).catch((error) => {
        // Ensure upload flag is cleared even on errors
        isUploading = false;
        console.error('Upload dialog error:', error);
    });
}

function randomImg() {
  let random = Math.floor(Math.random() * 18) + 1;

  img.setAttribute("src", `rand${random}.png`);
}
function renewCanvas() {
  if (localStorage.getItem("mode") === "prompt") {
    let random_img = Math.floor(Math.random() * draw_prompts.length);
    Swal.fire("Draw " + draw_prompts[random_img]);
  }
  canvasSetup.classList.add("zero-opacity");
  canvasSetup_2.classList.add("zero-opacity");

  randomImg();
  setTimeout(() => {
    clearCanvas(canvasSetup_2.width, canvasSetup_2.height, ctx2);
    drawImageScaled(img, ctx);

    canvasSetup.classList.remove("zero-opacity");
    canvasSetup_2.classList.remove("zero-opacity");
  }, 1700);
}

function clearCanvas(width, height, ctx) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
  ctx.fill();
}

function mousedownHandler(event) {
  mouseDown = true;
  if (event.touches) {
    const rect = event.target.getBoundingClientRect();
    const x_rel = event.touches[0].clientX - rect.left;
    const y_rel = event.touches[0].clientY - rect.top;

    const x = Math.round((x_rel * event.target.width) / rect.width);
    const y = Math.round((y_rel * event.target.height) / rect.height);

    guessX = parseInt(x);
    guessY = parseInt(y);
  } else {
    guessX =
      parseInt(
        (event.offsetX * canvasSetup_2.width) / canvasSetup_2.offsetWidth
      ) + 5;
    guessY =
      parseInt(
        (event.offsetY * canvasSetup_2.height) / canvasSetup_2.offsetHeight
      ) + 5;
  }

  if (color_dropper) {
    let img_data = ctx2.getImageData(
      0,
      0,
      canvasSetup.width,
      canvasSetup.height
    );
    let pixel = getPixel(img_data, guessX, guessY);
    ctx2.strokeStyle = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    color_picker.value = ctx2.strokeStyle;
    color_dropper = false;
    brush = true;
    dropper_btn.classList.remove("dropper-pressed");
  } else {
    ctx2.moveTo(guessX, guessY);
    ctx2.beginPath();
  }
}

canvasSetup_2.addEventListener("mousedown", (event) => mousedownHandler(event));
canvasSetup_2.addEventListener("touchstart", (event) =>
  mousedownHandler(event)
);

function mousemoveHandle(event) {
  user_span.style.left = event.clientX + 30 + "px";
  user_span.style.top = event.clientY + 30 + "px";

  if (mouseDown) {
    if (event.touches) {
      const rect = event.target.getBoundingClientRect();
      const x_rel = event.touches[0].clientX - rect.left;
      const y_rel = event.touches[0].clientY - rect.top;

      const x = Math.round((x_rel * event.target.width) / rect.width);
      const y = Math.round((y_rel * event.target.height) / rect.height);

      guessX = parseInt(x);
      guessY = parseInt(y);
    } else {
      guessX =
        parseInt(
          (event.offsetX * canvasSetup_2.width) / canvasSetup_2.offsetWidth
        ) + 5;
      guessY =
        parseInt(
          (event.offsetY * canvasSetup_2.height) / canvasSetup_2.offsetHeight
        ) + 5;
    }

    ctx2.lineTo(guessX, guessY);
    ctx2.lineWidth = brush_range.value;
    ctx2.stroke();
  }
}

canvasSetup.addEventListener("mousedown", (event) => {
  if (event.touches) {
    const rect = event.target.getBoundingClientRect();
    const x_rel = event.touches[0].clientX - rect.left;
    const y_rel = event.touches[0].clientY - rect.top;

    const x = Math.round((x_rel * event.target.width) / rect.width);
    const y = Math.round((y_rel * event.target.height) / rect.height);

    guessX = parseInt(x);
    guessY = parseInt(y);
  } else {
    guessX =
      parseInt(
        (event.offsetX * canvasSetup_2.width) / canvasSetup_2.offsetWidth
      ) + 5;
    guessY =
      parseInt(
        (event.offsetY * canvasSetup_2.height) / canvasSetup_2.offsetHeight
      ) + 5;
  }

  if (color_dropper) {
    let img_data = ctx.getImageData(
      0,
      0,
      canvasSetup.width,
      canvasSetup.height
    );
    let pixel = getPixel(img_data, guessX, guessY);
    ctx2.strokeStyle = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    color_picker.value = ctx2.strokeStyle;
    color_dropper = false;
    brush = true;
    dropper_btn.classList.remove("dropper-pressed");
  }
});

canvasSetup_2.addEventListener("mousemove", (event) => mousemoveHandle(event));
canvasSetup_2.addEventListener("touchmove", (event) => mousemoveHandle(event));

function mouseupHandle(event) {
  mouseDown = false;

  imgData = ctx.getImageData(0, 0, canvasSetup.width, canvasSetup.height);
  imgData2 = ctx2.getImageData(0, 0, canvasSetup_2.width, canvasSetup_2.height);

  let counter = 0;
  for (let i = 0; i < imgData.data.length; i++) {
    if (imgData.data[i] === imgData2.data[i]) counter++;
    else {
      counter--;
    }
  }
}
canvasSetup_2.addEventListener("mouseup", (event) => mouseupHandle(event));
canvasSetup_2.addEventListener("touchend", (event) => mouseupHandle(event));

window.addEventListener("resize", (e) => {
  canvasSetup_2.width = window.innerWidth * 0.45;
  canvasSetup.width = window.innerWidth * 0.45;

  if (window.innerWidth <= 650) {
    canvasSetup_2.width = window.innerWidth * 0.9;
    canvasSetup.width = window.innerWidth * 0.9;

    canvasSetup_2.height = window.innerHeight * 0.42;
    canvasSetup.height = window.innerHeight * 0.42;
  }

  drawImageScaled(img, ctx);
});

function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
  if (arguments.length === 2) {
    x = y = 0;
    w = ctx.canvas.width;
    h = ctx.canvas.height;
  }

  offsetX = typeof offsetX === "number" ? offsetX : 0.5;
  offsetY = typeof offsetY === "number" ? offsetY : 0.5;

  if (offsetX < 0) offsetX = 0;
  if (offsetY < 0) offsetY = 0;
  if (offsetX > 1) offsetX = 1;
  if (offsetY > 1) offsetY = 1;

  var iw = img.width,
    ih = img.height,
    r = Math.min(w / iw, h / ih),
    nw = iw * r,
    nh = ih * r,
    cx,
    cy,
    cw,
    ch,
    ar = 1;

  if (nw < w) ar = w / nw;
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;
  nw *= ar;
  nh *= ar;

  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;

  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
}

document.body.addEventListener(
  "touchstart",
  function (e) {
    if (e.target == canvasSetup_2) {
      e.preventDefault();
    }
  },
  false
);
document.body.addEventListener(
  "touchend",
  function (e) {
    if (e.target == canvasSetup_2) {
      e.preventDefault();
    }
  },
  false
);
document.body.addEventListener(
  "touchmove",
  function (e) {
    if (e.target == canvasSetup_2) {
      e.preventDefault();
    }
  },
  false
);

leaderboard_btn.addEventListener("click", (e) => {
  if (isUploading) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  e.preventDefault();
  e.stopPropagation();
  let a = document.createElement("a");
  a.setAttribute("href", "leaderboard.html");
  a.click();
});

randomImg();

setTimeout(() => {
  start();
}, 1000);

function drawImageScaled(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.min(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}

function getPixel(imageData, x, y) {
  index = (x + y * imageData.width) * 4;
  return [
    imageData.data[index + 0],
    imageData.data[index + 1],
    imageData.data[index + 2],
    imageData.data[index + 3],
  ];
}


