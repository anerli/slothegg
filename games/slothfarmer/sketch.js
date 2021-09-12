income = 0;
money = 50;
sloths = 0;
caretakers = 0;
trees = 0;

//assets = ["Tree", "Sloth", "Caretaker"]; 
// add Assets to this in Setup (?)
var assets = [];

cost_increase = 1.05;

crystal_gain = 0;
crystals = 0;

sloth_price = 100;
tree_price = 10;
caretaker_price = 1000;

/*
function calculate_income(){
  // should get more with a balance of things
  var i = trees*0.1 + sloths + caretakers*10;
  return i;
}
*/
class Asset{
  constructor(name, img, price){
    this.name, this.image, this.price = name, img, price;
    this.quantity = 0;
  }
}

function set_cookie(name, value){
  document.cookie = name+"="+value+"; expires=Thu, 18 Dec 2070 12:00:00 UTC";
}
// w3schools
function get_cookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function update(){
  income = (trees*0.1 + sloths + caretakers*10)*(1+crystals*0.01);
  //crystal_gain = Math.floor(income/10);
  //crystal_gain = Math.floor((Math.pow(income, 0.1)*(Math.log(income)/Math.log(1.05)))/100);
  crystal_gain = Math.floor((Math.pow(income, 0.3)*(Math.log(income+1)))/1);
  money += income;
  set_cookie("income",income);
  set_cookie("money",money);
  set_cookie("sloths",sloths);
  set_cookie("trees",trees);
  set_cookie("caretakers",caretakers);
  set_cookie("sloth_price",sloth_price);
  set_cookie("tree_price",tree_price);
  set_cookie("caretaker_price",caretaker_price);
  set_cookie("crystals",crystals);
  set_cookie("crystal_gain",crystal_gain);
}

function prestige(){
  crystals+=crystal_gain
  reset()
}
function full_reset(){
  reset();
  crystals = 0;
}
function reset(){
  income = 0;
  money = 50;
  sloths = 0;
  caretakers = 0;
  trees = 0;
  sloth_price = 100;
  tree_price = 10;
  caretaker_price = 1000;
}
function buy_sloth(){
  if(money >= sloth_price){
    sloths += 1;
    money -= sloth_price;
    sloth_price *= cost_increase;
  }
}
function buy_tree(){
  if(money >= tree_price){
    trees += 1;
    money -= tree_price;
    tree_price *= cost_increase;
  }
}
function buy_caretaker(){
  if(money >= caretaker_price){
    caretakers += 1;
    money -= caretaker_price;
    caretaker_price *= cost_increase;
  }
}
function setup() {
  print(parseFloat(get_cookie("income")));
  //print(isNaN(get_cookie("income")));
  if(!isNaN(parseFloat(get_cookie("income")))){
    print("retrieving cookies");
    print(get_cookie("income"))
    print(isNaN(get_cookie("income")));
    income=parseFloat(get_cookie("income"));
    money=parseFloat(get_cookie("money"));
    sloths=parseFloat(get_cookie("sloths"));
    trees=parseFloat(get_cookie("trees"));
    caretakers=parseFloat(get_cookie("caretakers"));
    sloth_price=parseFloat(get_cookie("sloth_price"));
    tree_price=parseFloat(get_cookie("tree_price"));
    caretaker_price=parseFloat(get_cookie("caretaker_price"));
    crystals=parseFloat(get_cookie("crystals"));
    crystal_gain=parseFloat(get_cookie("crystal_gain"));
  }else{
    // initialize variables
    print("initializing variables");
    income=0;
    money=50;
    sloths=0;
    trees=0;
    caretakers=0;
    sloth_price=100;
    tree_price=10;
    caretaker_price=1000;
    crystals=0;
    crystal_gain=0;
  }
  //print(income);
  createCanvas(850, 600);
  colorMode(HSB);
  
  //c = document.cookie;

  // below important
  frameRate(1);
  img_sloth = loadImage("sloth.png");
  img_tree = loadImage("oak_tree.png");
  img_casey = loadImage("casey.png");
  sloth_button = createButton('Buy Sloth');
  sloth_button.position(25, 400);
  sloth_button.mousePressed(buy_sloth);
  tree_button = createButton('Buy Tree');
  tree_button.position(275, 400);
  tree_button.mousePressed(buy_tree);
  caretaker_button = createButton('Buy Caretaker');
  caretaker_button.position(550, 400);
  caretaker_button.mousePressed(buy_caretaker);
  prestige_button = createButton('Prestige (RESET AND GAIN CRYSTALS)');
  prestige_button.position(400, 550);
  prestige_button.mousePressed(prestige);
  
  reset_button = createButton('CLEAR ALL DATA');
  reset_button.position(width - 130, 0);
  reset_button.mousePressed(full_reset);
}

function draw() {
  update();
  
  //if (keyIsDown(68) && keyIsDown(69) && keyIsDown(86) && keyIsDown(84) && keyIsDown(79) && keyIsDown(76)) {
    //devtools
  if (keyIsDown(68) && keyIsDown(69) && keyIsDown(86)){
	money += 10000000;
  }
  // color values are 0-100 for some reason
  background(color(20, 60, 100));
  image(img_sloth, 25, 50, 250, 250);
  image(img_tree, 275, 50, 250, 250);
  image(img_casey, 550, 50, 250, 250);
  
  // textSize(10)
  // fill("black");
  // text("If all your values say 'NaN', just refresh the page", 5, 10);
  
  
  textSize(30)
  fill("blue");
  text("Sloths: " + sloths, 25, 350)
  text("Trees: " + trees, 275, 350)
  text("Caretakers: " + caretakers, 550, 350)
  
  textSize(20);
  fill("red")
  text("Sloth price: $" + sloth_price.toFixed(2), 25, 375)
  text("Tree price: $" + tree_price.toFixed(2), 275, 375)//
  text("Caretaker price: $" + caretaker_price.toFixed(2), 550, 375)
  
  textSize(40);
  fill("green");
  text("Money: $" + money.toFixed(2), 25, 475)
  textSize(25);
  text("Income: +$" + income.toFixed(2), 25, 505)
  
  textSize(40);
  fill("purple");
  text("Crystals: " + crystals, 400, 475)
  textSize(25);
  text("Added on prestige: +" + crystal_gain, 400, 505)
  textSize(15);
  text("(Each crystal increases income by 1%)", 400, 525)  
  
}