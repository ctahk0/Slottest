var game = new Phaser.Game(850, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });

var items = ['bell', 'cherry', 'diamond', 'emerald', 'goldbar', 'goldclover', 'goldenseven', 'grape', 
                'greenbar', 'greenclover', 'heart', 'horseshoe', 'lemon', 'plum', 'redbar', 'redseven', 'ruby', 'watermelon'];

var items_b = ['bell_b', 'cherry_b', 'diamond_b', 'emerald_b', 'goldbar_b', 'goldclover_b', 'goldenseven_b', 'grape_b', 
                'greenbar_b', 'greenclover_b', 'heart_b', 'horseshoe_b', 'lemon_b', 'plum_b', 'redbar_b', 'redseven_b', 'ruby_b', 'watermelon_b'];

var button, btnStop;
var speed = 0, SPEED_MAX = 50;
var sb1, sb2, sb3, sb4, sb5;
var text = 0;
var tocakBlur1;
var tocakBlur1tmp;
var tocakBlur2;
var tocakBlur3;
var tocak1, tocak1tmp;
var tocak2, tocak2tmp;
var tocak3, tocak3tmp;
var tocak4, tocak4tmp;
var tocak5, tocak5tmp;
var spinning1 = false, spinning2 = false, spinning3 = false;
var slow = false;
var kocnica1 = false, kocnica2 = false, kocnica3 = false;
var linija;
var brojac = 0, bs;
var coor_y;
var key1, key2;
var fx, fxs, fxroll;

var myLoop, mainLoop;

function preload() {

    game.load.image('machine_body', 'img/machine_body.png');
    game.load.image('machine_body_over', 'img/machine_body_over.png');
    game.load.image('platform', 'img/platform.png');
    game.load.image('bell', 'img/bell.png');
    game.load.image('bell_b', 'img/bell_b.png');
    game.load.image('cherry', 'img/cherry.png');
    game.load.image('cherry_b', 'img/cherry_b.png');
    game.load.image('diamond', 'img/diamond.png');
    game.load.image('diamond_b', 'img/diamond_b.png');
    game.load.image('emerald', 'img/emerald.png');
    game.load.image('emerald_b', 'img/emerald_b.png');
    game.load.image('goldbar', 'img/goldbar.png');
    game.load.image('goldbar_b', 'img/goldbar_b.png');
    game.load.image('goldclover', 'img/goldclover.png');
    game.load.image('goldclover_b', 'img/goldclover_b.png');
    game.load.image('goldenseven', 'img/goldenseven.png');
    game.load.image('goldenseven_b', 'img/goldenseven_b.png');
    game.load.image('grape', 'img/grape.png');
    game.load.image('grape_b', 'img/grape_b.png');
    game.load.image('greenbar', 'img/greenbar.png');
    game.load.image('greenbar_b', 'img/greenbar_b.png');
    game.load.image('greenclover', 'img/greenclover.png');
    game.load.image('greenclover_b', 'img/greenclover_b.png');
    game.load.image('heart', 'img/heart.png');
    game.load.image('heart_b', 'img/heart_b.png');
    game.load.image('horseshoe', 'img/horseshoe.png');  
    game.load.image('horseshoe_b', 'img/horseshoe_b.png');  
    game.load.image('lemon', 'img/lemon.png');  
    game.load.image('lemon_b', 'img/lemon_b.png');  
    game.load.image('plum', 'img/plum.png');
    game.load.image('plum_b', 'img/plum_b.png');  
    game.load.image('redbar', 'img/redbar.png'); 
    game.load.image('redbar_b', 'img/redbar_b.png');  
    game.load.image('redseven', 'img/redseven.png');  
    game.load.image('redseven_b', 'img/redseven_b.png');  
    game.load.image('ruby', 'img/ruby.png');   
    game.load.image('ruby_b', 'img/ruby_b.png');     
    game.load.image('watermelon', 'img/watermelon.png'); 
    game.load.image('watermelon_b', 'img/watermelon_b.png');    
    game.load.image('button', 'img/start.png');
    game.load.image('btnStop', 'img/stop.png');
    game.load.audio('sfx', 'audio/start-1.wav');
    game.load.audio('stop', 'audio/stop-1.wav');
    game.load.audio('roll', 'audio/roll.wav');

}


function create() {
    game.stage.disableVisibilityChange = true;      //----------------- ovo je ako zelimo da se vrti i kad prozor izgubi fokus
    
    //game.stage.backgroundColor = '#ffffff' 
    //var body = game.add.sprite(0,0, 'machine_body'); 

    fx = game.add.audio('sfx');
    fxs = game.add.audio('stop');
    fxroll = game.add.audio('roll');
    
    //fx.addMarker('start', 9, 0.2);
    
    vockice();

    game.stage.backgroundColor = '#182d3b';

    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT; //Scale menadzer, za full scren ili slicno
    game.input.onDown.add(gofull, this);

    myLoop = game.time.events.loop(Phaser.Timer.SECOND/100, updateCounter, this);
    
}

function gofull() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }

}

function actionOnClick () {
    fx.play('');
    fxroll.play('');
    povuci();
    fxroll.loopFull(0.6);

}

function actionOnClickStop () {
    //fx.play('');
    //fxroll.play('');
    //povuci();
    spinning1 = false;
    kocnica1 = true;
    stop(1);

    spinning2 = false;
    kocnica2 = true;
    stop(2);

    kocnica3 = true;
    spinning3 = false;
    stop(3);

}
function update() {
//....

}
function render() {
    game.debug.text("Time until event: " + game.time.events.duration.toFixed(2), 32, 32);
    game.debug.text("Broj spinova: " + bs, 32, 62);
    game.debug.text(game.world.centerX + " - " + game.world.centerY, 700, 30, "#00ff00");
    game.debug.text(tocak1.height, 500, 410);
    game.debug.text("Tocak1.y " + tocak1.y, 500, 440);
    game.debug.text("Tocak1tmp.y " + tocak1tmp.y, 500, 470);
    game.debug.text("brojac " + brojac, 500, 500);
    game.debug.text("coor_y " + coor_y, 500, 530);

    //game.debug.text("Tocak2.y " + tocak2.y, 700, 500);
    //game.debug.text("Tocak3.y " + tocak3.y, 700, 530);

    //game.debug.text("Game world height " + game.world.height, 700, 560);
    //game.debug.text("Game world width " + game.world.width, 700, 590);

    //game.debug.inputInfo(520, 128);
}

function updateCounter() {
//.......
    brojac ++;

    if (brojac >= 20) {
        button.visible = false;
        btnStop.visible = true;

    }
    if (spinning3 === false) {
        button.visible = true;
        btnStop.visible = false;
    }

    if ((brojac >=150) && (spinning1 === true)) {
        spinning1 = false;
        kocnica1 = true;
        stop(1);
    }
    if ((brojac >200) && (spinning2 === true)) {
        spinning2 = false;
        kocnica2 = true;
        stop(2);
    }
    if ((brojac >250) && (spinning3 === true)) {
        fxroll.stop();
        kocnica3 = true;
        spinning3 = false;
        stop(3);
    }

    if (spinning1 === true) {
        if (kocnica1 === false) {
            tocak1tmp.y +=30;
            tocak1.y = tocak1tmp.y;
            if (tocak1tmp.y > 80) {
                tocak1tmp.y = -1000;
            }
        }
    }
    if (spinning2 === true) {
        if (kocnica2 === false) {
            tocak2tmp.y +=35;
            tocak2.y = tocak2tmp.y;
            if (tocak2tmp.y > 80) {
                tocak2tmp.y = -1000;
            }
        }
    }
    if (spinning3 === true) {
        if (kocnica3 === false) {
            tocak3tmp.y +=30;
            tocak3.y = tocak3tmp.y;
            if (tocak3tmp.y > 80) {
                tocak3tmp.y = -1000;
            }
        }   
    }


}


function vockice() {
    var body = game.add.sprite(10,75, 'machine_body');

    tocak1 = game.add.group(); // prvi tocak.
    tocak1tmp = game.add.group();
    tocak2 = game.add.group();
    tocak2tmp = game.add.group();
    tocak3 = game.add.group();
    tocak3tmp = game.add.group();
    tocak4 = game.add.group();
    tocak4tmp = game.add.group();
    tocak5 = game.add.group();
    tocak5tmp = game.add.group();
    
    for(var i = 0; i < 12; i++) {
        sprite1 = tocak1.create(115, i * 150 +50, items[game.rnd.integerInRange(0,17)]);
        sprite1t = tocak1tmp.create(sprite1.x, sprite1.y, items_b[game.rnd.integerInRange(0,17)]);

        sprite2 = tocak2.create(345, i * 150 +50, items[game.rnd.integerInRange(0,17)]);
        sprite2t = tocak2tmp.create(sprite2.x, sprite2.y, items_b[game.rnd.integerInRange(0,17)]);
        
        sprite3 = tocak3.create(605, i * 150 +50, items[game.rnd.integerInRange(0,17)]);
        sprite3t = tocak3tmp.create(sprite3.x, sprite3.y, items_b[game.rnd.integerInRange(0,17)]);

        // sprite4 = tocak4.create(425, i * 150 +50, items[game.rnd.integerInRange(0,16)]);
        // sprite4t = tocak4tmp.create(sprite4.x, sprite4.y, sprite4.key, sprite4.frame);

        // sprite5 = tocak5.create(565, i * 150 +50, items[game.rnd.integerInRange(0,16)]);
        // sprite5t = tocak5tmp.create(sprite5.x, sprite5.y, sprite5.key, sprite5.frame);
    };

    var graphics = game.add.graphics(0, 0);
    graphics.beginFill(0x182D3B);
    graphics.drawRect(0, 0, 850, 75);
    graphics.drawRect(0, 435, 850, 600);
    var body_over = game.add.sprite(10,75, 'machine_body_over');
    
    tocak1tmp.visible = false;
    tocak2tmp.visible = false;
    tocak3tmp.visible = false;

    button = game.add.button(game.world.centerX + 265, game.world.height-150, 'button', actionOnClick, this, 2, 1, 0);
    btnStop  = game.add.button(game.world.centerX + 265, game.world.height-150, 'btnStop', actionOnClickStop, this, 2, 1, 0);
    //button.anchor.setTo(0.5,0.5);  
    btnStop.visible = false;

}
function stop(i) {

    var otklon = 30; //ovo je ukoliko mreza nije po PS, tj. ako nije pocela od 0, 150, 300
    var gridsize = 150;  //kao sto samo ime kaze..
    coor_y = gridsize * (Math.round(eval("tocak" + i + ".y")/gridsize))-otklon;
    
    bs = (game.rnd.integerInRange(0,9)*100) + 600; //brzina

    tween = game.add.tween(tocak1)
        .to({y: coor_y}, bs, Phaser.Easing.Elastic.Out);

    tween2 = game.add.tween(tocak2)
        .to({y: coor_y}, bs, Phaser.Easing.Elastic.Out);

    tween3 = game.add.tween(tocak3)
        .to({y: coor_y}, bs, Phaser.Easing.Elastic.Out);

    if ((i == 1) && (kocnica1 === true)) {
        i = 10; //daje mu neku ludu vrijednost da ne ponavlja ponovo ovu rutinu
        tocak1tmp.visible = false;
        tocak1.visible = true;
        tween.start();
        fxs.play('');
    }else if ((i == 2) && (kocnica2 === true)) {
        i = 10;
        tocak2tmp.visible = false;
        tocak2.visible = true;
        tween2.start();
        fxs.play('');
    }else if ((i == 3) && (kocnica3 === true)) {
        i = 10;
        tocak3tmp.visible = false;
        tocak3.visible = true;
        tween3.start();
        fxs.play('');
    }
}

function povuci() {
    //ovdje proceduru za spinn
            //generate a random offset value divisible by 100
    /*        var newNumber:Number = (randomNumber(0, 9) * 100) + 1200;

            //tween to the relative value of newNumber
            TweenMax.to(strip1, 4, {y:String(newNumber), onComplete:showBtn});
    */
    tocak1.destroy();
    tocak1tmp.destroy();
    tocak2.destroy();
    tocak2tmp.destroy();
    tocak3.destroy();
    tocak3tmp.destroy();
    vockice();
    brojac = 0;
    spinning1 = true;
    spinning2 = true;
    spinning3 = true;
    kocnica1 = false; 
    kocnica2 = false; 
    kocnica3 = false;
    
    tocak1.visible = false;
    tocak1tmp.visible = true;
    tocak2.visible = false;
    tocak2tmp.visible = true;
    tocak3.visible = false;
    tocak3tmp.visible = true;

    //tween = game.add.tween(ball).to( { y: game.world.height - ball.height }, 1500, Phaser.Easing.Bounce.Out, true, 2500, 10);

    //  There is a 2.5 second delay at the start, then it calls this function
    //tween.onStart.add(onStart, this);

    //  This tween will loop 10 times, calling this function every time it loops
    //tween.onLoop.add(onLoop, this);

    //  When it completes it will call this function
    //tween.onComplete.add(onComplete, this);
}

function onStart() {

    //  Turn off the delay, so it loops seamlessly from here on
   //tween.delay(2.5);


}

function onLoop() {

/*    tocak1.y--;

    if (tocak1.y >= 800)
    {
        tocak1.y = -920;
    }
    else
    {
        tocak1.y++;
    }
*/
}

function onComplete() {

    //tween = game.add.tween(tocak1).to( { x: 0, y: -180}, 2000, Phaser.Easing.Quadratic);

}