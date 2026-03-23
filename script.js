const slides = [
    {
        image: "assets/Panel1.1-IDLE.jpg",
        text: "Jamie and Ryan are two best friends, and they agree on most things, however, one things lingers. Jamie, who's a business student, and Ryan, who studies engineering, were talking in D2. The difficultness of their majors came up in their conversation, prompting an argument.",
        speechLeft: "assets/1.png",
        speechRight: null
    },
    {
        image: "assets/Panel1.2-ANNOYED.jpg",
        text: "Jamie clenched his fists, clearly annoyed. Ryan snapped as well. Soon the argument escalated to a fight.",
        speechLeft: "assets/2.png",
        speechRight: "assets/3.png"
    },
    {
        image: "assets/Panel1.3-FIGHT.jpg",
        text: "They hit each other until both of them fell to the ground.",
        speechLeft: null,
        speechRight: null
    },
    {
        image: "assets/Panel1.4-AFTERFIGHT.jpg",
        text: "Their heads were pounding and that pain carried on throughout the night.",
        speechLeft: null,
        speechRight: null
    }
];

let currentSlide = 0;
let isAnimating = false;

const panelImage = document.getElementById("panel-image");
const panelText = document.getElementById("panel-text");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const nextPanel = document.getElementById("panel2");
const panelBox = document.getElementById("panelBox");
const speechLeft = document.getElementById("speech-left");
const speechRight = document.getElementById("speech-right");

function triggerAnimation(el, className) {
    el.classList.remove(
        'speech-pop-center', 'speech-slide-left', 'speech-slide-right',
        'speech-pop-scale', 'speech-dismiss', 'speech-dismiss-center'
    );
    void el.offsetWidth; // reflow to restart
    el.classList.add(className);
}

function showSlide(index) {
    panelImage.src = slides[index].image;
    panelText.textContent = slides[index].text;

    const sl = slides[index].speechLeft;
    const sr = slides[index].speechRight;

    if (sl) {
        speechLeft.src = sl;
        if (index === 0) {
            speechLeft.style.left = "50%";
            speechLeft.style.transform = "translateX(-50%)";
            speechLeft.style.width = "25%";
            speechLeft.style.display = "";
            triggerAnimation(speechLeft, 'speech-pop-center');
        } else {
            speechLeft.style.left = "30%";
            speechLeft.style.transform = "";
            speechLeft.style.width = "18%";
            speechLeft.style.display = "";
            triggerAnimation(speechLeft, 'speech-slide-left');
        }
    } else {
        if (speechLeft.style.display !== "none") {
            const isCentered = speechLeft.style.left === "50%";
            triggerAnimation(speechLeft, isCentered ? 'speech-dismiss-center' : 'speech-dismiss');
            setTimeout(() => { speechLeft.style.display = "none"; }, 200);
        }
    }

    if (sr) {
        speechRight.src = sr;
        speechRight.style.right = "30%";
        speechRight.style.width = "18%";
        speechRight.style.display = "";
        triggerAnimation(speechRight, 'speech-slide-right');
    } else {
        if (speechRight.style.display !== "none") {
            triggerAnimation(speechRight, 'speech-dismiss');
            setTimeout(() => { speechRight.style.display = "none"; }, 200);
        }
    }
}

nextBtn.addEventListener("click", () => {
    if (isAnimating) return;

    // special transition: slide 3 -> slide 4
    if (currentSlide === 2) {
        isAnimating = true;

        panelBox.classList.remove("impact-active");
        void panelBox.offsetWidth; // restart animation cleanly
        panelBox.classList.add("impact-active");

        setTimeout(() => {
            currentSlide = 3;
            showSlide(currentSlide);
        }, 450);

        setTimeout(() => {
            panelBox.classList.remove("impact-active");
            isAnimating = false;
        }, 950);

        return;
    }

    if (currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    } else {
        nextPanel.scrollIntoView({
            behavior: "smooth"
        });
    }
});

prevBtn.addEventListener("click", () => {
    if (isAnimating) return;

    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
});

const panel3Image = document.getElementById("panel3-image");
const panel3Text = document.getElementById("panel3-text");
const panel3RevealBtn = document.getElementById("panel3RevealBtn");
const panel3Help = document.getElementById("panel3Help");

const helpJamieBtn = document.getElementById("helpJamieBtn");
const helpRyanBtn = document.getElementById("helpRyanBtn");
const jamieHelpDisplay = document.getElementById("jamieHelpDisplay");
const ryanHelpDisplay = document.getElementById("ryanHelpDisplay");

let panel3Revealed = false;
let jamieHelpIndex = 0;
let ryanHelpIndex = 0;

const jamieHelps = [
    "Hint 1: Start with the error message. Read the first line before panicking.",
    "Hint 2: Every C++ program needs a main() function to run.",
    "Hint 3: Missing semicolons can break everything for absolutely no reason.",
    "Hint 4: Jamie finally realizes coding is 10% logic and 90% debugging."
];

const ryanHelps = [
    "Term 1: ROI = Return on Investment.",
    "Term 2: SWOT = Strengths, Weaknesses, Opportunities, Threats.",
    "Term 3: Elevator pitch = explain your idea clearly in under a minute.",
    "Term 4: Ryan starts throwing around buzzwords and somehow it works."
];

panel3RevealBtn?.addEventListener("click", () => {
    if (!panel3Revealed) {
        panel3Image.classList.remove("flip-in");
        panel3Image.classList.add("flip-out");

        const speechPanel3 = document.getElementById("speech-panel3");

        setTimeout(() => {
            panel3Image.src = "assets/Panel3.2-DESPERATETOGETHER.jpg";
            panel3Image.classList.remove("flip-out");
            panel3Image.classList.add("flip-in");
            if (speechPanel3) {
                speechPanel3.src = "assets/7.png";
                speechPanel3.style.left = "50%";
                speechPanel3.style.right = "auto";
                speechPanel3.style.transform = "translateX(-50%)";
                speechPanel3.classList.remove('speech-pop-scale', 'speech-dismiss-center');
                void speechPanel3.offsetWidth;
                speechPanel3.classList.add('speech-pop-scale');
            }
        }, 180);

        panel3Text.textContent = "Not so well. They are both struggling with each other's majors.";
        panel3RevealBtn.textContent = "Help Jamie & Ryan";
        panel3Help.classList.add("show");
        panel3Revealed = true;
    } else {
        const panel3HelpTop = panel3Help.getBoundingClientRect().top + window.scrollY - 40;
        window.scrollTo({
            top: panel3HelpTop,
            behavior: "smooth"
        });
    }
});

// Trigger panel2 speech bubbles only when scrolled into view
const p2left = document.getElementById("speech-panel2-left");
const p2right = document.getElementById("speech-panel2-right");

const panel2Observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                p2left.style.opacity = "";
                p2left.classList.add("speech-slide-left");
            }, 200);
            setTimeout(() => {
                p2right.style.opacity = "";
                p2right.classList.add("speech-slide-right");
            }, 400);
            panel2Observer.disconnect();
        }
    });
}, { threshold: 0.4 });

panel2Observer.observe(document.getElementById("panel2"));

helpJamieBtn?.addEventListener("click", () => {
    jamieHelpDisplay.textContent = jamieHelps[jamieHelpIndex];
    jamieHelpIndex = (jamieHelpIndex + 1) % jamieHelps.length;
});

helpRyanBtn?.addEventListener("click", () => {
    ryanHelpDisplay.textContent = ryanHelps[ryanHelpIndex];
    ryanHelpIndex = (ryanHelpIndex + 1) % ryanHelps.length;
});
