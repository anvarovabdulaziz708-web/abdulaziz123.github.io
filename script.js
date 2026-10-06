/* =========================================================
   ABDULAZIZ ANVAROV
   PREMIUM PORTFOLIO ENGINE
========================================================= */


/* =========================================================
   DOM
========================================================= */

const body = document.body;

const themeButton =
    document.getElementById("themeButton");

const typingText =
    document.getElementById("typingText");

const playGame =
    document.getElementById("playGame");


/* =========================================================
   TYPING
========================================================= */

const words = [
    "Web Developer",
    "Programmer",
    "Game Developer",
    "Creative Coder",
    "Future Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typingAnimation() {

    if (!typingText) return;

    const word = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            word.substring(
                0,
                charIndex + 1
            );

        charIndex++;

        if (charIndex >= word.length) {

            deleting = true;

            setTimeout(
                typingAnimation,
                1400
            );

            return;
        }

    } else {

        typingText.textContent =
            word.substring(
                0,
                charIndex - 1
            );

        charIndex--;

        if (charIndex <= 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1) %
                words.length;
        }
    }

    setTimeout(
        typingAnimation,
        deleting ? 45 : 85
    );
}


typingAnimation();


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const savedTheme =
    localStorage.getItem(
        "abdulaziz-theme"
    );


if (savedTheme === "light") {
    body.classList.add("light");
}


function updateThemeIcon() {

    if (!themeButton) return;

    const icon =
        themeButton.querySelector("i");

    if (!icon) return;

    if (body.classList.contains("light")) {

        icon.className =
            "fa-solid fa-sun";

    } else {

        icon.className =
            "fa-solid fa-moon";
    }
}


updateThemeIcon();


if (themeButton) {

    themeButton.addEventListener(
        "click",
        () => {

            body.classList.toggle("light");

            const theme =
                body.classList.contains("light")
                    ? "light"
                    : "dark";

            localStorage.setItem(
                "abdulaziz-theme",
                theme
            );

            updateThemeIcon();

        }
    );
}


/* =========================================================
   NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-menu a"
    );


function updateNavigation() {

    let current = "";

    sections.forEach(section => {

        const top =
            section.offsetTop - 200;

        if (
            window.scrollY >= top
        ) {

            current = section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateNavigation
);


/* =========================================================
   SMOOTH SCROLL
========================================================= */

navLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const target =
                link.getAttribute("href");

            if (
                !target ||
                !target.startsWith("#")
            ) return;

            const element =
                document.querySelector(target);

            if (!element) return;

            event.preventDefault();

            element.scrollIntoView({
                behavior: "smooth"
            });

        }
    );

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(`
        .section-title,
        .about-grid,
        .skill-card,
        .project-card,
        .game-card,
        .timeline-item,
        .contact-box,
        .contact-card,
        .erp
    `);


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(35px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

    observer.observe(element);

});


/* =========================================================
   SKILL 3D EFFECT
========================================================= */

document
    .querySelectorAll(".skill-card")
    .forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateX =
                    -(y - rect.height / 2) / 18;

                const rotateY =
                    (x - rect.width / 2) / 18;

                card.style.transform =
                    `
                    perspective(700px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-10px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "translateY(0)";

            }
        );

    });


/* =========================================================
   PROJECT GLOW
========================================================= */

document
    .querySelectorAll(".project-card")
    .forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                card.style.background =
                    `
                    radial-gradient(
                        350px circle at
                        ${x}px ${y}px,
                        rgba(0,245,255,.09),
                        rgba(255,255,255,.018)
                        45%
                    )
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.background = "";

            }
        );

    });


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const progressBar =
    document.createElement("div");


Object.assign(
    progressBar.style,
    {
        position: "fixed",
        top: "0",
        left: "0",
        width: "0%",
        height: "2px",
        zIndex: "99999",
        pointerEvents: "none",
        background:
            "linear-gradient(90deg,#1677ff,#00f5ff)",
        boxShadow:
            "0 0 15px rgba(0,245,255,.8)"
    }
);


document.body.appendChild(
    progressBar
);


window.addEventListener(
    "scroll",
    () => {

        const total =
            document.documentElement
                .scrollHeight -
            document.documentElement
                .clientHeight;

        const percent =
            total > 0
                ? window.scrollY / total * 100
                : 0;

        progressBar.style.width =
            percent + "%";

    }
);


/* =========================================================
   CONTACT CARD EFFECT
========================================================= */

document
    .querySelectorAll(".contact-card")
    .forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateX =
                    -(y - rect.height / 2) / 25;

                const rotateY =
                    (x - rect.width / 2) / 25;

                card.style.transform =
                    `
                    perspective(700px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-6px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


/* =========================================================
   SKILL BAR ANIMATION
========================================================= */

const skillBars =
    document.querySelectorAll(
        ".progress span"
    );


const skillObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;

                const bar =
                    entry.target;

                const finalWidth =
                    bar.style.width;

                bar.style.width = "0%";

                setTimeout(() => {

                    bar.style.transition =
                        "width 1.4s ease";

                    bar.style.width =
                        finalWidth;

                }, 100);

                skillObserver.unobserve(bar);

            });

        },
        {
            threshold: .5
        }
    );


skillBars.forEach(
    bar => skillObserver.observe(bar)
);


/* =========================================================
   REAL MINI RACING GAME
========================================================= */

function createRacingGame() {

    if (
        document.getElementById(
            "racingGame"
        )
    ) {
        return;
    }


    const game =
        document.createElement("div");

    game.id = "racingGame";


    game.innerHTML = `

        <div class="game-modal">

            <div class="game-top">

                <strong>
                    🏎️ NEON RACING
                </strong>

                <button id="closeGame">
                    ✕
                </button>

            </div>


            <div class="game-hud">

                <span>
                    SCORE:
                    <b id="gameScore">0</b>
                </span>

                <span>
                    SPEED:
                    <b id="gameSpeed">0</b>
                </span>

            </div>


            <canvas
                id="racingCanvas"
            ></canvas>


            <div class="game-controls">

                <button id="leftControl">
                    ←
                </button>

                <button id="nitroControl">
                    NITRO
                </button>

                <button id="rightControl">
                    →
                </button>

            </div>


            <p class="game-help">
                ← → yoki A / D — boshqarish
            </p>

        </div>
    `;


    document.body.appendChild(game);


    startRacingGame();

}


/* =========================================================
   RACING ENGINE
========================================================= */

function startRacingGame() {

    const canvas =
        document.getElementById(
            "racingCanvas"
        );

    const ctx =
        canvas.getContext("2d");


    const scoreElement =
        document.getElementById(
            "gameScore"
        );

    const speedElement =
        document.getElementById(
            "gameSpeed"
        );


    canvas.width = 700;
    canvas.height = 500;


    let playerX = 350;

    let score = 0;

    let speed = 6;

    let nitro = false;

    let running = true;


    const enemies = [];


    function spawnEnemy() {

        enemies.push({

            x:
                180 +
                Math.random() * 340,

            y:
                -100,

            speed:
                4 +
                Math.random() * 3

        });

    }


    const keys = {};


    document.addEventListener(
        "keydown",
        keyDown
    );


    document.addEventListener(
        "keyup",
        keyUp
    );


    function keyDown(event) {

        keys[
            event.key.toLowerCase()
        ] = true;

        if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight"
        ) {
            event.preventDefault();
        }

    }


    function keyUp(event) {

        keys[
            event.key.toLowerCase()
        ] = false;

    }


    function drawRoad() {

        ctx.fillStyle =
            "#02050b";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        /* road */

        ctx.fillStyle =
            "#111923";

        ctx.beginPath();

        ctx.moveTo(150, 0);

        ctx.lineTo(550, 0);

        ctx.lineTo(680, 500);

        ctx.lineTo(20, 500);

        ctx.closePath();

        ctx.fill();


        /* neon edges */

        ctx.strokeStyle =
            "#00f5ff";

        ctx.lineWidth = 5;

        ctx.beginPath();

        ctx.moveTo(150, 0);

        ctx.lineTo(20, 500);

        ctx.stroke();


        ctx.beginPath();

        ctx.moveTo(550, 0);

        ctx.lineTo(680, 500);

        ctx.stroke();


        /* road lines */

        ctx.strokeStyle =
            "rgba(255,255,255,.65)";

        ctx.lineWidth = 5;

        for (
            let y = -100;
            y < 600;
            y += 90
        ) {

            const offset =
                (score * 3) % 90;

            ctx.beginPath();

            ctx.moveTo(
                350,
                y + offset
            );

            ctx.lineTo(
                350,
                y + 45 + offset
            );

            ctx.stroke();

        }

    }


    function drawCar(
        x,
        y,
        color,
        size = 1
    ) {

        ctx.save();

        ctx.translate(x, y);

        ctx.scale(
            size,
            size
        );


        ctx.fillStyle =
            color;

        ctx.shadowColor =
            color;

        ctx.shadowBlur =
            20;


        ctx.beginPath();

        ctx.roundRect(
            -22,
            -38,
            44,
            76,
            10
        );

        ctx.fill();


        ctx.shadowBlur = 0;


        ctx.fillStyle =
            "#07111b";


        ctx.fillRect(
            -15,
            -17,
            30,
            25
        );


        ctx.fillStyle =
            "#dffcff";


        ctx.fillRect(
            -17,
            22,
            9,
            7
        );


        ctx.fillRect(
            8,
            22,
            9,
            7
        );


        ctx.restore();

    }


    function update() {

        if (!running) return;


        if (
            keys["arrowleft"] ||
            keys["a"]
        ) {

            playerX -=
                nitro ? 9 : 6;

        }


        if (
            keys["arrowright"] ||
            keys["d"]
        ) {

            playerX +=
                nitro ? 9 : 6;

        }


        playerX =
            Math.max(
                80,
                Math.min(
                    620,
                    playerX
                )
            );


        if (
            Math.random() <
            .025
        ) {

            spawnEnemy();

        }


        enemies.forEach(enemy => {

            enemy.y +=
                enemy.speed *
                (nitro ? 1.8 : 1);

        });


        for (
            let i = enemies.length - 1;
            i >= 0;
            i--
        ) {

            const enemy =
                enemies[i];


            if (
                enemy.y >
                canvas.height + 100
            ) {

                enemies.splice(
                    i,
                    1
                );

                score += 10;

                continue;
            }


            const distance =
                Math.hypot(
                    playerX -
                    enemy.x,

                    420 -
                    enemy.y
                );


            if (
                distance < 55
            ) {

                running = false;

                showGameOver();

            }

        }


        score++;

        speed =
            Math.min(
                250,
                70 +
                Math.floor(
                    score / 20
                )
            );


        scoreElement.textContent =
            score;

        speedElement.textContent =
            speed;

    }


    function draw() {

        drawRoad();


        enemies.forEach(
            enemy => {

                drawCar(
                    enemy.x,
                    enemy.y,
                    "#ff356d",
                    .85
                );

            }
        );


        drawCar(
            playerX,
            420,
            "#00f5ff",
            1
        );

    }


    function loop() {

        update();

        draw();

        if (running) {

            requestAnimationFrame(
                loop
            );

        }

    }


    const left =
        document.getElementById(
            "leftControl"
        );

    const right =
        document.getElementById(
            "rightControl"
        );

    const nitroButton =
        document.getElementById(
            "nitroControl"
        );


    left.addEventListener(
        "mousedown",
        () => keys["arrowleft"] = true
    );


    left.addEventListener(
        "mouseup",
        () => keys["arrowleft"] = false
    );


    right.addEventListener(
        "mousedown",
        () => keys["arrowright"] = true
    );


    right.addEventListener(
        "mouseup",
        () => keys["arrowright"] = false
    );


    nitroButton.addEventListener(
        "mousedown",
        () => nitro = true
    );


    nitroButton.addEventListener(
        "mouseup",
        () => nitro = false
    );


    loop();


    function showGameOver() {

        const modal =
            document.querySelector(
                ".game-modal"
            );


        const over =
            document.createElement(
                "div"
            );


        over.className =
            "game-over";


        over.innerHTML = `

            <div>

                <h2>
                    GAME OVER
                </h2>

                <p>
                    Score:
                    <strong>
                        ${score}
                    </strong>
                </p>

                <button id="restartGame">
                    PLAY AGAIN
                </button>

            </div>
        `;


        modal.appendChild(
            over
        );


        document
            .getElementById(
                "restartGame"
            )
            .addEventListener(
                "click",
                () => {

                    document
                        .getElementById(
                            "racingGame"
                        )
                        .remove();

                    createRacingGame();

                }
            );

    }


    document
        .getElementById(
            "closeGame"
        )
        .addEventListener(
            "click",
            () => {

                running = false;

                document
                    .getElementById(
                        "racingGame"
                    )
                    .remove();

            }
        );

}


/* =========================================================
   PLAY BUTTON
========================================================= */

if (playGame) {

    playGame.addEventListener(
        "click",
        createRacingGame
    );

}


/* =========================================================
   GAME MODAL CSS
========================================================= */

const gameStyle =
    document.createElement("style");


gameStyle.textContent = `

#racingGame {

    position: fixed;

    inset: 0;

    z-index: 999999;

    display: grid;

    place-items: center;

    padding: 20px;

    background:
        rgba(0,0,0,.82);

    backdrop-filter:
        blur(15px);

}


.game-modal {

    position: relative;

    width: min(
        760px,
        100%
    );

    padding: 18px;

    border:
        1px solid
        rgba(0,245,255,.25);

    border-radius: 24px;

    background:
        #030812;

    box-shadow:
        0 30px 100px
        rgba(0,0,0,.7),
        0 0 60px
        rgba(0,245,255,.08);

}


.game-top {

    display: flex;

    align-items: center;

    justify-content: space-between;

    color: #f4fbff;

    padding:
        5px 5px 15px;

}


.game-top strong {

    color: #00f5ff;

    font-family:
        "Space Grotesk";

    letter-spacing: 1px;

}


.game-top button {

    width: 35px;

    height: 35px;

    border: 0;

    border-radius: 10px;

    color: white;

    background:
        rgba(255,255,255,.06);

    cursor: pointer;

}


.game-hud {

    display: flex;

    justify-content: space-between;

    padding: 10px 15px;

    margin-bottom: 10px;

    color: #7890a4;

    font-size: 11px;

}


.game-hud b {

    color: #00f5ff;

}


#racingCanvas {

    display: block;

    width: 100%;

    height: auto;

    border-radius: 16px;

    background: #02050b;

}


.game-controls {

    display: flex;

    justify-content: center;

    gap: 15px;

    margin-top: 15px;

}


.game-controls button {

    min-width: 75px;

    padding: 12px 18px;

    border: 1px solid
        rgba(0,245,255,.2);

    border-radius: 12px;

    color: #00f5ff;

    background:
        rgba(0,245,255,.05);

    cursor: pointer;

    font-weight: 800;

}


.game-controls button:hover {

    background:
        rgba(0,245,255,.12);

}


.game-help {

    text-align: center;

    margin: 12px 0 3px;

    color: #617383;

    font-size: 10px;

}


.game-over {

    position: absolute;

    inset: 60px 18px 80px;

    display: grid;

    place-items: center;

    border-radius: 16px;

    background:
        rgba(2,5,11,.88);

    backdrop-filter:
        blur(8px);

    text-align: center;

}


.game-over h2 {

    margin-bottom: 10px;

    color: #ff356d;

    font-family:
        "Space Grotesk";

    font-size: 38px;

}


.game-over p {

    color: #9aaaba;

    margin-bottom: 20px;

}


.game-over strong {

    color: #00f5ff;

}


.game-over button {

    padding: 13px 22px;

    border: 0;

    border-radius: 12px;

    color: #001015;

    background:
        linear-gradient(
            135deg,
            #00f5ff,
            #4d8fff
        );

    font-weight: 900;

    cursor: pointer;

}


@media (max-width: 600px) {

    .game-modal {

        padding: 10px;

    }

    .game-controls button {

        min-width: 65px;

        padding: 10px;

    }

}

`;

document.head.appendChild(
    gameStyle
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c🚀 ABDULAZIZ ANVAROV",
    "font-size:22px;font-weight:bold;color:#00f5ff"
);

console.log(
    "%cPremium Portfolio Engine loaded.",
    "font-size:13px;color:#35f59b"
);