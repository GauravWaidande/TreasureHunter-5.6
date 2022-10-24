var canvas,back,back2;
var form,game,player,playerImg,playerCount;
var gameState=0,kScore=0,bScore=4,lScore=3;
var keyImg,kLogo,k,Ktouching=0,lifeImg,lLogo,life,Ltouching=0,bLogo,Btouching=0;
var stoneGroup,stoneImg,stone1,stone2,stone3,stone4,stone5,stone6,stone7,stone8,stone9,stone10;
var stone11,stone12,stone13,stone14,stone15,stone16,stone17,stone18,stone19,stone20,stone;
var thornsImg,thorns,treasureImg1,treasureImg2,treasure,gunImg,gun,bulletImg,bSound,bullet,lock,lock2,lockImg,skullImg,skull;

function preload() {
  back=loadImage("./Images/cave.jpg");
  back2=loadImage("./Images/back1.jpg");
  playerImg=loadImage("./Images/hunter.png");
  keyImg=loadImage("./Images/key.png");
  lifeImg=loadImage("./Images/heart.png");
  stoneImg=loadImage("./Images/stone.png");
  thornsImg=loadImage("./Images/thorns.png");
  treasureImg1=loadImage("./Images/chest2.png");
  treasureImg2=loadImage("./Images/chest.png");
  rubyImg=loadImage("./Images/ruby.png");
  gunImg=loadImage("./Images/gun.png");
  bulletImg=loadImage("./Images/bullet.png");
  lockImg=loadImage("./Images/OIP.png");
  skullImg=loadImage("./Images/skull.png");
  bSound=loadSound("shooting.mp3");
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  game = new Game();
  game.start();

}

function draw() {

  background(back2);

  switch (gameState) {
    case 0:
      fill("red");
      textSize(40);
      text("Treasure Hunter",width/2-125,height/2-75);    
    break;

    //rules
    case 1:
      fill("yellow");
      textSize(30);
      text("Hello " + this.form.input.value(),width/2-300,150);
      text("You have been assigned to go in the cave and collect",width/2-300,185);
      text("the treasures and the most precious. To reach there",width/2-300,220);
      text("use the arrow keys to control the player. Each time you fall",width/2-300,255);
      text("1 life gets destroyed. To open the treasure box you have",width/2-300,290);
      text("to collect 3 keys. But beware it will not be that easy.",width/2-300,325);

      game.setElementsPosition();
      game.setElementsStyle();
      game.handlemousePressed();
    break;

    //main level
    case 2:
      background(back);

      push();
        fill("yellow");
        textSize(25);
        text(""+bScore,width-280,28);
        text(""+kScore,width-70,28);
        text(""+lScore,width-180,28);
      pop();
      push();
      fill("yellow");
      textSize(15);
      text("" + this.form.input.value(),player.position.x-5,player.position.y-90);
      pop();
      
      game.handleControl1();
      game.display();

      if(player.isTouching(k)||k.x<0){
        if(player.isTouching(k)){
          kScore+=1;
          Ktouching+=1;
        }
        if(Ktouching===1){
         k.position.x=stone8.x-25;
         k.position.y=stone8.y-150;
        }
        if(Ktouching===2){
          k.position.x=stone13.x-25;
          k.position.y=stone13.y-150;
         }
         if(Ktouching===3){
          k.position.x=-100;
          k.position.y=-100;
         }
      }

      if(player.isTouching(life)||life.x<0){
        if(player.isTouching(life)&&lScore<3){
         lScore+=1;
        }
        Ltouching+=1;
        if(Ltouching===1){
          life.position.x=stone15.x;
          life.position.y=stone15.y-100;
        }
        if(Ltouching===2){
          life.position.x=-100;
          life.position.y=-100;
        }
      }

      if((player.y>height||player.y<0||player.x<0||player.x>width)&&stone.x!=width-150){
        lScore-=1;
        gameState=3;
      }
      
      if(player.isTouching(thorns)){
        lScore-=1;
        gameState=3;
      }

      if(player.isTouching(skull)){
        lScore-=1;
        gameState=3;
      }

      if(thorns.x<0){
        if(thorns.y===443){
          thorns.x=2202;
          thorns.y=418;
        }
        thorns.x=5402;
        thorns.y=518;
      }

      if(skull.x<0){
        if(skull.x===stone4.x){
          skull.x=stone10.x;
          skull.y=stone10.y-100;
        }
        skull.x=stone17.x;
        skull.y=stone17.y-100;
      }

      if(skull.isTouching(bullet)){
        if(Btouching===1){
          skull.x=stone10.x;
          skull.y=stone10.y-100;
        }
        if(Btouching===2){
          skull.x=stone17.x;
          skull.y=stone17.y-100;
        }
        if(Btouching===3){
          skull.destroy();
        }
        }

      if(lScore===0){
        gameState=4;
      }

      if(treasure.x<width-250){
        gameState=6;
      }

    break;

// another chance
   case 3:
      background(back);

      textSize(25);
      fill("yellow");   
      text("Press Up Arrow to restart",300,200);
     
     Position();

     if(keyDown(UP_ARROW)){
      gameState=2;
    }

    break;

    //the end
    case 4:
      background("black");
      textSize(50);
      fill("red");
      text("Sorry "+this.form.input.value()+" Game Over",200,200);
      stoneGroup.destroyEach();
      kLogo.destroy();
      k.destroy();
      lLogo.destroy();
      life.destroy();
      thorns.destroy();
    break;

    //steady
    case 5:
      background(back);

      Position();

      game.setElementsPosition();
      game.setElementsStyle();
      game.handlemousePressed();
      game.handleControl1();
      
      push();
      fill("yellow");
      textSize(25);
      text(""+bScore,width-280,28);
      text(""+kScore,width-70,28);
      text(""+lScore,width-180,28);

    pop();
    push();
    fill("yellow");
    textSize(15);
    text("" + this.form.input.value(),player.position.x-5,player.position.y-90);
    pop();

    if(keyDown(RIGHT_ARROW)){
      gameState=2;
    }

    break;

    case 6:
      game.handlemousePressed();
      game.display();

      Destroy();

      player.velocityX=0;
      player.x=width/2-150;
      player.y=width/2-400;
      player.scale=0.75;

      treasure.velocityX=0;
      treasure.x=width/2+50;
      treasure.y=width/2-300;
      

      if(kScore<3){
        textSize(30);
        fill("red");
        text("Congrates You have found the chest",90,140);
        text("But Ohh No! You don't have enough keys to unlock the treasure box",90,200);
        treasure.scale=0.15;
      }else{
        textSize(30);
        fill("red");
        text("Congrates You have found the chest",90,140);
        text("You have successfully unlocked the treasure",90,200);
        treasure.changeAnimation("open",treasureImg2);
        treasure.scale=0.6;
      }
    break;

    default:

    break;
  }

  if(gameState!=0){
   fill("red");
   textSize(30);
   text("Treasure Hunter",width/2-100,50);
  }
  
}

function Destroy(){
  stoneGroup.destroyEach();
  gun.destroy();
  bullet.destroy(); 
  life.destroy();
  thorns.destroy();
  skull.destroy();
  k.destroy();
  kLogo.destroy();
  lLogo.destroy();
  bLogo.destroy();
}

function Position(){
  player.position.x=50;
  player.position.y=400;
  gun.position.x=player.x;
  gun.position.y=player.y+10;
  life.position.x=1925;
  life.position.y=185;
  k.position.x=975;
  k.position.y=410;
  skull.position.x=stone4.x;
  skull.position.y=325;
  thorns.position.x=998;
  thorns.position.y=493;
  stone1.position.x=48;
  stone2.position.x=575;
  stone3.position.x=1000;
  stone4.position.x=1400;
  stone5.position.x=1925;
  stone6.position.x=2425;
  stone7.position.x=2800;
  stone8.position.x=3200;
  stone9.position.x=3625;
  stone10.position.x=4000;

  stone11.position.x=4400;
  stone12.position.x=4825;
  stone13.position.x=5200;
  stone14.position.x=5600;
  stone15.position.x=6025;
  stone16.position.x=6400;
  stone17.position.x=6800;
  stone18.position.x=7225;
  stone19.position.x=7600;
  stone20.position.x=8050;

  stone.position.x=8485;
  treasure.position.x=8485;
  lock.x=stone.x-237;
  lock.y=treasure.y-250;
  lock2.x=stone.x-237;
  lock2.y=treasure.y-300;

  kScore=0;
  Ktouching=0;
  Ltouching=0;
  Btouching=0;

  game.display();

}

function shootF(){
 if(bScore>0){

  bullet.x=gun.position.x+50;
  bullet.y=gun.position.y-8;
  bullet.velocityX=20;
  bScore-=1;
  bSound.play();
  Btouching+=1;

 }
}