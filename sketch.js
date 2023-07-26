var backgroundImg,bgSprite, canvas, gamestate="play";
var gelatoImg, birdImg, chocoImg, arrowImg, fireballImg;
var wallt, wallb, wallr, walll;

var gSprite;

function preload(){
    backgroundImg= loadImage("assets/background.jpg");
    birdImg= loadAnimation("assets/bird1.png", "assets/bird2.png", "assets/bird3.png");
    chocoImg=loadImage("assets/chocochip.png");
    arrowImg=loadImage("assets/arrow.png");
    fireballImg=loadImage("assets/fireball.png");
    gelatoImg=loadImage("assets/gelatoball.png")
}

function setup(){
    canvas=createCanvas(windowWidth, windowHeight);

    //SPRITES
    gSprite=createSprite(width/2,462 ,100,100);
    gSprite.addImage(gelatoImg);
    gSprite.scale=0.7;
    gSprite.velocityY=0;
    gSprite.velocityX=0;
    gSprite.debug=false;
    gSprite.setCollider("circle",0,0,80);

    //WALLS
    wallt=createSprite(width/2, 0, width, 1);
    wallb=createSprite(width/2, height-90, width, 1);
    wallb.visible=false;
    wallr=createSprite(width, height/2, 1, height);
    walll=createSprite(0, height/2, 1, height);
}

function draw(){
    background(backgroundImg);
    gSprite.velocityY+=0.8;

    gelatoMove();
    birdSpawn();
    chocoSpawn();
    fireSpawn();

    drawSprites();
}

function gelatoMove(){
    gSprite.collide(walll);
    gSprite.collide(wallb);
    gSprite.collide(wallr);
    gSprite.collide(wallt);

    if(keyDown("up_arrow")){
        gSprite.velocityY-=10;
    }
    if(keyDown("left_arrow")){
        gSprite.velocityX-=1;
    }
    if(keyDown("right_arrow")){
        gSprite.velocityX+=1;
    }
    if(gSprite.y>460){
        if(gSprite.velocityX>0){
            gSprite.velocityX-=0.3;
        }
        if(gSprite.velocityX<0){
            gSprite.velocityX+=0.3;
        }
    }
}

function birdSpawn(){
    if(frameCount%150==0){
        bird= createSprite(width+100, random(50,height-300));
        bird.velocityX=random(-3,-7);
        bird.lifetime=700;
        bird.depth=gSprite.depth-1;
        bird.addAnimation("birdImg", birdImg);
        bird.scale= random(1,0.2);
    }
}

function chocoSpawn(){
    if(frameCount%100==0){
        choco= createSprite(random(100,width-100), random(50,height-300),20,20);
        choco.lifetime=350;
        choco.addImage("chocoImg", chocoImg);
        choco.scale= 0.2;
        choco.depth=gSprite.depth;
    }
}

function fireSpawn(){
    if(frameCount%120==0){
        var side= random(1,3);
        side=Math.round(side);
        switch(side){
            case 1:
                fire= createSprite(-100,random(50, height-300), 30,30);
                fire.velocityX=random(3,5);
                fire.velocityY=random(3,5);
                fire.lifetime=800;
                break;
            case 2:
                fire= createSprite(width+100,random(50, height-300), 30,30);
                fire.velocityX=random(-3,-5);
                fire.velocityY=random(3,5);
                fire.lifetime=800;
                break;
            case 3:
                fire= createSprite(random(100,width-100),-100, 30,30);
                fire.velocityX=random(-5,5);
                fire.velocityY=random(3,5);
                fire.lifetime=800;
                break;
        }
    }
}