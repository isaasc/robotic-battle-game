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
    const names = ["ROBOT 1", "ROBOT 2"];
    const damage = [];

    //audios
    const boom = new Audio("./assets/atari_boom3.wav");
    const finish = new Audio("./assets/victory_sound.wav");

    // sorting damage of robots
    for (let i = 0; i < 2; i++) {
      numeros = Math.floor(Math.random() * 21);
      damage.push(numeros);
    }
    console.log(`Esses são os danos sorteados: ${damage}`);

    // robots declaration
    const image1 = new Image();
    image1.src = "./assets/robotic-dog.png";
    const robot1 = new drawRobot(
      image1,
      20,
      70,
      100,
      100,
      10,
      100,
      damage[0],
      names[0]
    );
    robots.push(robot1);

    const image2 = new Image();
    image2.src = "./assets/robotic.png";
    const robot2 = new drawRobot(
      image2,
      880,
      330,
      100,
      100,
      10,
      100,
      damage[1],
      names[1]
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

    function collision() {
      if (
        counter == 0 &&
        colisao < 5 &&
        robot1.posX < robot2.posX + robot2.width &&
        robot1.posX + robot1.width > robot2.posX &&
        robot1.posY < robot2.posY + robot2.height &&
        robot1.posY + robot1.height > robot2.posY
      ) {
        for (let i = 0; i < 1; i++) {
          robot1.life = robot1.life - damage[1];
          robot2.life = robot2.life - damage[0];
          console.log(`Vida do robô 1: ${robot1.life}`);
          console.log(`Vida do robô 2: ${robot2.life}`);
        }
        colisao++;
        counter++;
        console.log("vezes que colidiram", colisao);
        boom.play();
      }
      if (
        (counter == 1 && robot1.posX > robot2.posX + robot2.width) ||
        robot1.posX + robot1.width < robot2.posX ||
        robot1.posY > robot2.posY + robot2.height ||
        robot1.posY + robot1.height < robot2.posY
      ) {
        counter = 0;
      }
    }
    let theWinner = "";
    let empate = "Nenhum, deu empate :)";

    function winner() {
      if (colisao == 5) {
        if (damage[0] == damage[1]) {
          theWinner = empate;
          console.table(empate);
        } else {
          theWinner = Math.max(robot1.life, robot2.life);
          if (theWinner == robot1.life) {
            theWinner = names[0];
          } else {
            theWinner = names[1];
          }
        }
        colisao++;
        finish.play();
      }
    }

    //showing
    function showRobot() {
      if (colisao < 5) {
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        for (const i in robots) {
          const spr = robots[i];
          drawRobot(spr.img, spr.posX, spr.posY, spr.width, spr.height);
        }

        ctx.fillStyle = "#fff";
        ctx.font = "20px arial";
        ctx.fillText(`Life == ${robot1.life}`, 30, 38);
        ctx.fillText(`Dano == ${robot1.damage}`, 30, 60);
        ctx.fillText(`Life == ${robot2.life}`, 880, 463);
        ctx.fillText(`Dano == ${robot2.damage}`, 880, 483);
      } else {
        ctx.fillText(`O GRANDE GANHADOR É == ${theWinner}`, 260, 250);
      }
    }

    function animate() {
      showRobot();
      movePlayer();
      movePlayer2();
      winner();
      collision();
      requestAnimationFrame(animate, cnv);
    }

    animate();
  })()
);
