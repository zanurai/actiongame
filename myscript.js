//alert("hello")
const gameOverSound = new Audio("death.mp3");
const musicSound = new Audio("music.mp3");
score = 0;
cross = true;


//define the onclick keybotton

document.onkeydown = function (e) {
    console.log("key code is:", e.keyCode)
    setTimeout(() => {
        musicSound.play()
    }, 1000)

    //display the dino and obstacle
    if (e.keyCode == 38) {
        dino = document.querySelector(".dino");
        dino.classList.add("animateDino");

        setTimeout(() => {
            dino.classList.remove("animateDino");
        }, 700);
    }

    //dino moving forward


    if (e.keyCode == 39) {
        dino = document.querySelector(".dino");
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = dinoX + 112 + "px";
    }

    // dino moving backward 
    if (e.keyCode == 37) {
        dino = document.querySelector(".dino");
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = dinoX - 112 + "px";
    }

}


//display the gameover of game
setInterval(() => {
    dino = document.querySelector(".dino")
    gameOver = document.querySelector(".gameOver");
    obstacle = document.querySelector(".obstacle");


    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"))
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"))

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("left"))
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("top"))

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    console.log(offsetX, offsetY);
    if (offsetX < 73 && offsetY < 52) {

        //gameOver.style.visibility = "visible";
        gameOver.innerHTML = "Game Over - Reload to play again"
        obstacle.classList.remove("obstacleAni")
        gameOverSound.play();

        setTimeout(() => {
            gameOverSound.pause()
            musicSound.pause()
        }, 1000)


    } else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);//score call
        cross = false;//score


        //score update
        setTimeout(() => {
            cross = true;
        }, 1000)

        //remove the distracted of dino
        //update the speed of obstacle
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue("animation-duration"));
            newDur = aniDur - 0.1;
            obstacle.style.animationduration = newDur + "s";

            console.log("new animation-duration:" + newDur);
        }, 500)

        //update the speed of obstacle

        /*aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue("animation-duration"));
        newDur = aniDur - 0.1;
        obstacle.style.animationduration = newDur + "s";*/
    }
}, 100)

//updating score

function updateScore(score) {
    scoreCount.innerHTML = " your score: " + score;
}
