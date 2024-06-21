import { initNav } from "./module/nav.js";
import { initSlider } from "./module/sliders.js";
import { initCurrentYear } from "./module/current-year.js";
// import { initScrollToTop } from "./module/scroll-to-top.js";
import { initScroll } from "./module/scroll.js";
import { initCalendar } from "./module/calendar.js";
import { initAnimation } from "./module/animation.js";

window.addEventListener('DOMContentLoaded', () => {
    console.log('подключен скрипт main.js');

    initNav();
    initSlider();
    initCurrentYear();
    // initScrollToTop();
    initScroll();
    initAnimation();

    if (document.querySelector('calendar')) {
        initCalendar();
    }

    baguetteBox.run('.gallery-wrapper');

    // DOMContentLoaded
    // Canvas film grain by Szenia Zadvornykh https://codepen.io/zadvorsky/pen/PwyoMm?editors=0100

    const noiseSection = document.querySelector('#noise-section');
    if (noiseSection) {
        const noise = () => {
            let viewWidth,
                viewHeight,
                canvas = document.getElementById("canvas"),
                ctx;

            // film grain config
            let patternSize = 100,
                patternScaleX = 1,
                patternScaleY = 1,
                patternRefreshInterval = 1,
                patternAlpha = 19; // int between 0 and 255 -> 19

            let patternPixelDataLength = patternSize * patternSize * 4,
                patternCanvas,
                patternCtx,
                patternData,
                frame = 0;

            window.onload = function () {
                initCanvas();
                initGrain();
                requestAnimationFrame(loop);

                window.addEventListener("resize", () => {
                    viewWidth = canvas.width = canvas.clientWidth;
                    viewHeight = canvas.height = canvas.clientHeight;
                });
            };

            // create a canvas which will render the grain
            function initCanvas() {
                viewWidth = canvas.width = canvas.clientWidth;
                viewHeight = canvas.height = canvas.clientHeight;
                ctx = canvas.getContext("2d");
                ctx.scale(patternScaleX, patternScaleY);
            }

            // create a canvas which will be used as a pattern
            function initGrain() {
                patternCanvas = document.createElement("canvas");
                patternCanvas.width = patternSize;
                patternCanvas.height = patternSize;
                patternCtx = patternCanvas.getContext("2d");
                patternData = patternCtx.createImageData(patternSize, patternSize);
            }

            // put a random shade of gray into every pixel of the pattern
            function update() {
                let value;
                for (let i = 0; i < patternPixelDataLength; i += 4) {
                    value = (Math.random() * 255) | 0;
                    patternData.data[i] = value;
                    patternData.data[i + 1] = value;
                    patternData.data[i + 2] = value;
                    patternData.data[i + 3] = patternAlpha;
                }
                patternCtx.putImageData(patternData, 0, 0);
            }

            // fill the canvas using the pattern
            function draw() {
                ctx.clearRect(0, 0, viewWidth, viewHeight);
                ctx.fillStyle = ctx.createPattern(patternCanvas, "repeat");
                ctx.fillRect(0, 0, viewWidth, viewHeight);
            }

            function loop() {
                if (++frame % patternRefreshInterval === 0) {
                    update();
                    draw();
                }
                requestAnimationFrame(loop);
            }
        };
        noise();
    }
});
