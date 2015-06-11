var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1400;
canvas.height = 700;
document.body.appendChild(canvas);
//window now has a view of the variable canvas
var picReady = false;
var picImage = new Image();
picImage.onload = function()
{
	picReady=true;
} 
picImage.src="logo.png";


var nameReady = false;
var nameImage = new Image();
nameImage.onload = function()
{
	nameReady=true;
} 
nameImage.src="name.png";

var qualitiesReady = false;
var qualitiesImage = new Image();
qualitiesImage.onload = function()
{
	qualitiesReady=true;
} 
qualitiesImage.src="qualities.png";
var x1 = 100;
var y1=100;
var f=0;
var myVideo = document.getElementById("bgvid"); 
function playPause()
{
    if (myVideo.paused) 
        myVideo.play(); 
    else 
        myVideo.pause(); 
}

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	f=0;
}, false);
var flag1=0;
var update = function(modifier)
{	
	var now1 = Date.now();
	if(now1-then1>6000)
	{
		flag1=1;
	}
	else
		x1=x1+100*modifier;
	if (38 in keysDown&&f==0)
	{ f=1;
		playPause();
	}
	if (39 in keysDown)
	{
		x1=x1+100*modifier;
	}
}
var render = function () {
	ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
	var now1=Date.now();
	if (now1-then1>6000)
	{
		if(nameReady)
			ctx.drawImage(nameImage,100,150);
		if(qualitiesReady)
			ctx.drawImage(qualitiesImage,100,290);
	}
	if (picReady) 
	{
		ctx.drawImage(picImage, 1250,0);
	}
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;
	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then1 = Date.now();
var then=then1;
main();