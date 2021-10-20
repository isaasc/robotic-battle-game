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

    var estados = {
      jogar: 0,
      jogando: 1,
      perdeu: 2,
    };

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
    console.log(life);

    let colisao = 0;
    function collision() {
      //o 5 aqui seria pq o jogo deve parar após 5 colisões e o ganhador seria o robô com mais vida.
      for (let j = 0; j < 5; j++) {
        if (
          robot1.posX < robot2.posX + robot2.width &&
          robot1.posX + robot1.width > robot2.posX &&
          robot1.posY < robot2.posY + robot2.height &&
          robot1.posY + robot1.height > robot2.posY
        ) {
          for (let i = 0; i < life.length; i++) {
              if (!robot2.counted) {
                life[i] = --life[i];
                robot2.counted = true;
                console.log(life);
                colisao++;
                console.log(colisao);
            }
          }
        }
      }
    }

    //showing
    function showRobot() {
      ctx.clearRect(0, 0, cnv.width, cnv.height);
      for (const i in robots) {
        const spr = robots[i];
        drawRobot(spr.img, spr.posX, spr.posY, spr.width, spr.height);
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
