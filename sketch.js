const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var edges;
 
var waterImage,bgImage,fishImg;
var water,fish;
var waterLevel;

var wasteSprite;
var wasteImg,waste1Img;
var wasteGroup;

var fishHealth=100;

var gameState = "PLAY";

function preload() {

    waterImage=loadImage("Images/download.png");
    bgImage=loadImage("Images/grass.jpg");
    fishImg=loadImage("Images/fish3.png");
    wasteImg=loadImage("Images/waste.jpg");
    // waste1Img=loadImage("Images/waste2.png");
}

function setup(){
    var canvas = createCanvas(windowWidth-150,windowHeight-100);
    engine = Engine.create();
    world = engine.world;

    //to create water background
    water=createSprite(width/2,height/2,width-100,height-20);
    water.addImage("waterImage",waterImage);
    water.scale=3;
    water.velocityX=-2;

    //to create waterLevel sprite
    waterLevel=createSprite(width/2,height/4+60,width,1);
    waterLevel.visible=false;

    //create fish sprite
    fish=createSprite(120,200,40,40);
    fish.addImage("fishImg",fishImg);
    fish.scale=0.08;
    
    edges=createEdgeSprites();

    wasteGroup=new Group();

    

}

function draw(){
    background(bgImage);



    //to reset the background to center
    if(water.x<(width/2)-500){
    water.x=width/2+473;
    }
    
    //to collide fish with edges
    fish.collide(edges[0]);
    fish.collide(edges[1]);
    fish.collide(edges[2]);
    fish.collide(edges[3]);
    fish.collide(waterLevel);
   
    wasteGeneration();

    //logic when fish touches barrel
    if(fish.isTouching(wasteGroup) && fishHealth>=4){
        fishHealth=fishHealth-4;
        //fish.displace();
    }


    drawSprites();

    //to display FishHealth
    textSize(20);
    if(fishHealth>=50){
      stroke("green");
    }else{
        stroke("red");
     }
        
    text("Fish Health:"+ fishHealth + "%", 100,100);


    //to display gameover
     if(fishHealth===0){
    gameState="END"
     }
     
     if(gameState==="END"){
     fish.velocityX=0;
     fish.velocityY=0;
     wasteGroup.setVelocityXEach(0);
     wasteGroup.destroyEach();
     textSize(80);
     fill("red");
     textFont("Helvetica");
     text("Game Over",width/2,height/2)
     }
}

function keyPressed(){

    //for up arrow
    if(keyCode===38 && gameState==="PLAY"){
        fish.velocityY=-2;
        fish.velocityX=0;
    }
    if(keyCode===DOWN_ARROW && gameState==="PLAY"){
        fish.velocityY=2;
        fish.velocityX=0;
    }
    if(keyCode===RIGHT_ARROW && gameState==="PLAY"){
        fish.velocityY=0;
        fish.velocityX=2;
    }
    if(keyCode===LEFT_ARROW && gameState==="PLAY"){
        fish.velocityY=0;
        fish.velocityX=-2;
    }
}

function wasteGeneration(){
    //to generate waste when frameCount is multiple of 60
    if(frameCount%80===0 && gameState==="PLAY"){
         wasteSprite=createSprite(width+10,random(height/2,height),20,20);
         wasteSprite.velocityX=-2;
         wasteSprite.addImage("wasteImg",wasteImg);
         wasteSprite.scale=0.1;

        wasteGroup.add(wasteSprite);
         wasteSprite.lifetime=width/2;
  
    }
  

}