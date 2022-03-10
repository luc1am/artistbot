let bot = new RiveScript(); //new bot
let submitBttn, inputField, viewButton;
var strum = 0.5;

let frame;
//let points = '0';

let shapes = [];
let resp = 'start interaction with a greeting';

function preload() {
  bot.loadFile("bot.txt").then(loaded).catch(error);
  frame = loadImage('artistBotFrame1.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  inputField = createInput("");
  inputField.position(50, 140);
  submitBttn = createButton("send message to bot");
  submitBttn.mousePressed(botResponse);
  submitBttn.position(50, 170);
  viewButton = createButton("let's see it");
  viewButton.position(400, 100);
  viewButton.mousePressed(drawFinalPainting)
  viewButton.hide();
  let title = createP("artistBot");
  title.position(25,25);
  //background(237, 218, 202);
}


function draw() {
  textFont('Georgia')
  fill(0);
  background(237, 218, 202);
  text(resp, 250,145, 200,100);
  //bot.reply("local-user", 'points').then(respond1)
  //text(points, width-200,200);
  if (resp.includes("i see now") || resp.includes("call the met!")){
    viewButton.show();
    noLoop()
  }

}

function drawFinalPainting(){
  inputField.hide();
  submitBttn.hide();
  viewButton.hide();
  resp = '';
  background(237, 218, 202);
  //noLoop();
  console.log('in')
  fill(0);
  strokeWeight(2);
  //background(237, 218, 202);
  for (let i = 0; i< height; i+=20){
    drawCurve(i);
  }
  for (let i = 0; i<shapes.length; i++){
    noFill();
    if (shapes[i][0] == 0){
      ellipse(shapes[i][1],shapes[i][2],
        shapes[i][3],shapes[i][4]);
    } else
      rect(shapes[i][1],shapes[i][2],
        shapes[i][3],shapes[i][4]);
  }
  push()
  blendMode(LIGHTEST);
  noStroke();
  let colors = ['#fc035e','#5c52a1','#c4661d','#ff549e','#fc035e','#5c52a1','#c4661d','#ff549e']
  for(let i = 0; i<6; i++){
    fill(colors[i]);
    ellipse(random(width), random(height), 400,400);
  }
  ellipse(random(width), random(height), 400,400);
  pop();

  image(frame, 0,0, width, height);
}


function drawCurve(y){
  let a = 0.0;
  let freq = 25;
  let amp = 10;
  let incr = TWO_PI/freq;
  for (let i = 0; i< width; i++){
    point(i*4, y +sin(a)*amp)
    a = a+incr;
  }
}

function pushShapes(rand){
    noFill();
    let x = random(width);
    let y = random(height);
    let sizex = random(50);
    let sizey = random(50);
    shapes.push([rand, x,y,sizex,sizey]);
}

function createShape(){
   pushShapes(floor(random(2)));
   pushShapes(floor(random(2)));
   pushShapes(floor(random(2)));
   pushShapes(floor(random(2)));
   pushShapes(floor(random(2)));
   pushShapes(floor(random(2)));
}

function botResponse(){
  let input = inputField.value();
  // //if (input == "yes"){
  //   drawFinalPainting();
  // }
  console.log(input);
  bot.reply("local-user", input).then(respond);
  createShape();
  inputField.value('');
}

function respond(reply) {
  //strokeWeight(10);
  console.log(reply);
  resp = reply;

}

// function respond1(reply){
//   points = reply;
// }

function loaded() {
  bot.sortReplies();
  console.log("Chatbot ready!");
   //You must sort the replies before trying to fetch any!
}

function error(error) {
  console.log("There is an error.");
  console.log(error);
}

function keyPressed(){
  if (keyCode ==ENTER){
    botResponse();
  }
}
