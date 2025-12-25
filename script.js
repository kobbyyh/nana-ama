const YOUR_WHATSAPP_NUMBER = "233542367268";

const prefilledMessage = "Yes, I will be your girlfriend 💖 - nana ama";


document.querySelectorAll('.thumb').forEach(t => {
    t.addEventListener('click', e => {
        const full = t.dataset.full || t.src;
        document.getElementById('mainPhoto').src = full;
    });
});

const backdrop = document.getElementById('modalBackdrop');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const modalCancel = document.getElementById('modalCancel');
const modalConfirm = document.getElementById('modalConfirm');

function showModal() {
    backdrop.classList.add('show');
    backdrop.setAttribute('aria-hidden', 'false');
}
function hideModal() {
    backdrop.classList.remove('show');
    backdrop.setAttribute('aria-hidden', 'true');
}

noBtn.addEventListener('click', () => {
    const messageBox = document.getElementById('messageBox');
    messageBox.innerHTML = "<p style='margin:0 0 8px 0;'>No problem — take your time. If you change your mind, this little site will be here waiting with butterflies 🦋</p><div class='small'>You can refresh the page to see the original message again.</div>";
    const card = document.querySelector('.card');
    card.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(0)' }], { duration: 520 });
});

yesBtn.addEventListener('click', showModal);
modalCancel.addEventListener('click', hideModal);

modalConfirm.addEventListener('click', () => {
    hideModal();
    celebrate();

    setTimeout(() => {
        const phone = YOUR_WHATSAPP_NUMBER.trim();
        if (!phone || phone.includes("YOUR_PHONE")) {
            // If the user didn't update the placeholder, open a generic share link to whatsapp web with only text (it will prompt for a contact)
            const shareOnly = "https://api.whatsapp.com/send?text=" + encodeURIComponent(prefilledMessage);
            window.open(shareOnly, "_blank");
        } else {
            const url = "https://api.whatsapp.com/send?phone=" + encodeURIComponent(phone) + "&text=" + encodeURIComponent(prefilledMessage);
            window.open(url, "_blank");
        }
    }, 900);
});


const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let W = canvas.width = innerWidth;
let H = canvas.height = innerHeight;
window.addEventListener('resize', () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; });

function randomRange(min, max) { return Math.random() * (max - min) + min; }

function ConfettiParticle() {
    this.x = randomRange(0, W);
    this.y = randomRange(-H, 0);
    this.size = randomRange(6, 12);
    this.speed = randomRange(2, 6);
    this.angle = randomRange(0, Math.PI * 2);
    this.angularSpeed = randomRange(-0.1, 0.1);
    this.color = `hsl(${Math.floor(randomRange(0, 360))} 85% 65%)`;
    this.tilt = randomRange(-0.3, 0.3);
}
ConfettiParticle.prototype.update = function () {
    this.y += this.speed;
    this.x += Math.sin(this.y / 30) * 1.5;
    this.angle += this.angularSpeed;
    if (this.y > H + 30) { this.y = -10; this.x = randomRange(0, W); }
};
ConfettiParticle.prototype.draw = function () {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
};

let confetti = [];
function initConfetti(count) {
    confetti = [];
    for (let i = 0; i < count; i++) confetti.push(new ConfettiParticle());
}
initConfetti(80);

let confettiActive = false;
function animateConfetti() {
    if (!confettiActive) return;
    ctx.clearRect(0, 0, W, H);
    for (let p of confetti) { p.update(); p.draw(); }
    requestAnimationFrame(animateConfetti);
}

function celebrate() {
    confettiActive = true;
    initConfetti(120);
    animateConfetti();
    setTimeout(() => { confettiActive = false; ctx.clearRect(0, 0, W, H); }, 4000);
    const heart = document.querySelector('.heart');
    heart.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 800 });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideModal();
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === yesBtn) showModal();
});

window.onload = () => {
    document.querySelector('.card').animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 580, easing: 'cubic-bezier(.2,.9,.3,1)' });
};


window.addEventListener('load', () => {
    const intro = document.getElementById('intro');
    setTimeout(() => {
        intro.style.opacity = '0';
        setTimeout(() => intro.remove(), 800);
    }, 1600);
});

