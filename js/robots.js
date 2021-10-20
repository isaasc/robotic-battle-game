const cnv = document.getElementById('canvas');
const ctx = cnv.getContext('2d');

const drawRobot = function(img, posX, posY, width, height, speed, life, counted) {
    this.img = img;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.life = life;
    this.counted = counted;
    ctx.drawImage(img, posX, posY, width, height);
};

