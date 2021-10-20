document.addEventListener(
  "load",
  (function () {
    const cnv = document.getElementById("canvas");
    const ctx = cnv.getContext("2d");
    cnv.width = 1000;
    cnv.height = 500;

    // arays
    const robots = [];
    const keys = [];
    let life = [];

    // sorting lifes of robots
    for (let i = 0; i < 2; i++) {
      numeros = Math.floor(Math.random() * 21);
      life.push(numeros);
    }

    // robots declaration
    const image1 = new Image();
    image1.src = "./assets/robotic-dog.png";
    const robot1 = new drawRobot(image1, 20, 20, 100, 100, 10, life[0], false);
    robots.push(robot1);
    console.log(robot1);

    const image2 = new Image();
    image2.src = "./assets/robotic.png";
    const robot2 = new drawRobot(
      image2,
      880,
      380,
      100,
      100,
      10,
      life[1],
      false
    );
    robots.push(robot2);

    let colisao = 0;
    let counter = 0;

    //movement
    window.addEventListener("keydown", function (e) {
      keys[e.key] = true;
    });

    window.addEventListener("keyup", function (e) {
      delete keys[e.key];
    });

    function movePlayer() {
      if (keys["ArrowUp"]) {
        robot1.posY -= robot1.speed;
      }
      if (keys["ArrowDown"]) {
        robot1.posY += robot1.speed;
      }
      if (keys["ArrowLeft"]) {
        robot1.posX -= robot1.speed;
      }
      if (keys["ArrowRight"]) {
        robot1.posX += robot1.speed;
      }
      robot1.posX = Math.max(
        0,
        Math.min(cnv.width - robot1.width, robot1.posX)
      );
      robot1.posY = Math.max(
        0,
        Math.min(cnv.height - robot1.height, robot1.posY)
      );
    }

    function movePlayer2() {
      if (keys["w"] || keys["W"]) {
        robot2.posY -= robot1.speed;
      }
      if (keys["s"] || keys["S"]) {
        robot2.posY += robot1.speed;
      }
      if (keys["a"] || keys["A"]) {
        robot2.posX -= robot1.speed;
      }
      if (keys["d"] || keys["D"]) {
        robot2.posX += robot1.speed;
      }
      robot2.posX = Math.max(
        0,
        Math.min(cnv.width - robot2.width, robot2.posX)
      );
      robot2.posY = Math.max(
        0,
        Math.min(cnv.height - robot2.height, robot2.posY)
      );
    }

    //Cada vez que acontecer uma colisão entre eles o nível de vida dos dois diminuirá. A vida de cada um foi sorteada e está na let life.
    //showing
    function showRobot() {
      ctx.clearRect(0, 0, cnv.width, cnv.height);
      for (const i in robots) {
        const spr = robots[i];
        drawRobot(spr.img, spr.posX, spr.posY, spr.width, spr.height);
      }
    }

    function collision() {
      if (
        counter == 0 &&
        colisao < 5 &&
        robot1.posX < robot2.posX + robot2.width &&
        robot1.posX + robot1.width > robot2.posX &&
        robot1.posY < robot2.posY + robot2.height &&
        robot1.posY + robot1.height > robot2.posY
      ) {
        for (let i = 0; i < 2; i++) {
          life[i] = --life[i];
        }
        colisao++;
        counter++;
        //console.log("life", life);
        //console.log("vezes que colidiram", colisao);
      }

      if (
        (counter == 1 && robot1.posX > robot2.posX + robot2.width) ||
        robot1.posX + robot1.width < robot2.posX ||
        robot1.posY > robot2.posY + robot2.height ||
        robot1.posY + robot1.height < robot2.posY
      ) {
        counter = 0;
        console.log(counter);
      }
    }

    function animate() {
      showRobot();
      movePlayer();
      movePlayer2();
      collision();
      requestAnimationFrame(animate, cnv);
    }

    animate();
  })()
);
