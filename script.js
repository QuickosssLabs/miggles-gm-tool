let canvas = document.getElementById('imageCanvas');
let ctx = canvas.getContext('2d');
let img = new Image();
let overlay = new Image();
let imgLoaded = false;

// Adjust Overlay
let overlaySize = 100;
let insetX = 0;
let insetY = 0;

// Load image from PC or mobile
document.getElementById('imageLoader').addEventListener('change', function(e){
    let reader = new FileReader();
    reader.onload = function(event){
        img.onload = () => {
            imgLoaded = true;
            canvas.width = img.width;
            canvas.height = img.height;
            draw();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

// Select overlay with click
function selectOverlay(src) {
    overlay.src = src;
    overlay.onload = draw;
}

// Adjust the overlay size and inset
document.getElementById('overlaySize').addEventListener('input', function() {
    overlaySize = parseInt(this.value);
    draw();
});

document.getElementById('overlayInsetX').addEventListener('input', function() {
    insetX = parseInt(this.value);
    draw();
});

document.getElementById('overlayInsetY').addEventListener('input', function() {
    insetY = parseInt(this.value);
    draw();
});

// Draw the picture and overlay
function draw() {
    if (imgLoaded) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clean canva
        ctx.drawImage(img, 0, 0); // draw base image
        if (overlay.src) {
            let width = (canvas.width * overlaySize) / 100;
            let height = (canvas.height * overlaySize) / 100;
            ctx.drawImage(overlay, insetX, insetY, width, height); // draw overlay with adjustments
        }
    }
}

// download final GM picture
document.getElementById('downloadBtn').addEventListener('click', function() {
    let link = document.createElement('a');
    link.download = 'GmNoPunks.png'; link.href = canvas.toDataURL(); link.click(); });
