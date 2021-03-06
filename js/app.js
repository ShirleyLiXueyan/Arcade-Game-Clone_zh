// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.speed = 100 + Math.random() * (300 - 100);
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt * this.speed;
    //若虫子跑出画框则从左侧重新进入
    if(this.x >= 505) {
        this.x = -101;
    };
    this.checkCollisions();
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.renderEntities;
};

Enemy.prototype.checkCollisions = function() {
    if(this.y == player.y && (this.x <= player.x + 55 && this.x >= player.x - 55)) {
        player.x = 202;
        player.y = 83 * 3 + 55;
    }
};


// 现在实现你自己的玩家类
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    //玩家的图片，用工具函数加载文件
    this.sprite = 'images/char-cat-girl.png';
};

// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
//更新玩家位置
Player.prototype.update = function() {
};

//在屏幕上画出玩家
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.renderEntities;
};

//移动
Player.prototype.handleInput = function(movement) {
    switch(movement) {
        case 'left': if (this.x >= 101) {this.x -= 101;} break;
        case 'up': if (this.y >= 55) {this.y -= 83;} break;
        case 'right': if (this.x <= 303) {this.x += 101;} break;
        case 'down': if (this.y <= 304) {this.y += 83}; break;
    };
    if(this.y < 0) {
        setTimeout(function() {
            alert('You Win!');
            player.x = 202;
            player.y = 83 * 3 + 55;
        },600);
    };
};



// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies =[
    new Enemy(-101, 83 * 0 + 55), new Enemy(202, 83 * 0 + 55),
    new Enemy(-101, 83 * 1 + 55), new Enemy(303, 83 * 1 + 55),
    new Enemy(-101, 83 * 2 + 55), new Enemy(0, 83 * 2 + 55)
];
var player = new Player(202, 83 * 3 + 55);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
