const noBtn = document.querySelector('.btn-no');
const yesBtn = document.querySelector('.btn-yes');
const container = document.querySelector('.buttons');
const sheSaidYes = document.querySelector('.she-said-yes');
const returnBtn = document.querySelector('.btn-return');

const GAP = 16;

function placeButtonsCentered() {
    const contRect = container.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();

    const totalWidth = yesRect.width + GAP + noRect.width;
    const startX = Math.max(0, (contRect.width - totalWidth) / 2);

    const yesX = startX;
    const noX = startX + yesRect.width + GAP;

    yesBtn.style.left = `${yesX}px`;
    yesBtn.style.top = `50%`;
    noBtn.style.left = `${noX}px`;
    noBtn.style.top = `50%`;
}

function overlapsYes(x, y) {
    const yesRect = yesBtn.getBoundingClientRect();
    const contRect = container.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();

    const noLeft = contRect.left + x;
    const noTop = contRect.top + y;
    const noRight = noLeft + noRect.width;
    const noBottom = noTop + noRect.height;

    return !(
        noRight < yesRect.left ||
        noLeft > yesRect.right ||
        noBottom < yesRect.top ||
        noTop > yesRect.bottom
    );
}

const MIN_MOVE = 120;

function moveNoButton() {
    const contRect = container.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();

    const maxX = contRect.width - noRect.width;
    const maxY = contRect.height - noRect.height;

    const currentX = parseFloat(noBtn.style.left) || 0;
    const currentY = parseFloat(noBtn.style.top) || 0;

    let x, y, dist = 0, tries = 0;
    do {
        x = Math.floor(Math.random() * Math.max(1, maxX));
        y = Math.floor(Math.random() * Math.max(1, maxY));
        const dx = x - currentX;
        const dy = y - currentY;
        dist = Math.sqrt(dx * dx + dy * dy);
        tries++;
    } while ((overlapsYes(x, y) || dist < MIN_MOVE) && tries < 50);

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

function showYesMessage() {
    sheSaidYes.style.display = 'flex';
    container.style.display = 'none';
}

function reset() {
    sheSaidYes.style.display = 'none';
    container.style.display = 'flex';
    placeButtonsCentered();
}

window.addEventListener('load', placeButtonsCentered);
window.addEventListener('resize', placeButtonsCentered);
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('click', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);
yesBtn.addEventListener('click', showYesMessage);
returnBtn.addEventListener('click', reset);