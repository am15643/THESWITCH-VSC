// panel 1 argument slideshow: cycles through 4 slides
    // speech bubbles animate in/out per slide
    // slide 2->3 triggers THUD shake + smash effect before advancing
const slides = [
    {
        image: "assets/Panel1.1-IDLE.jpg",
        text: "Jamie and Ryan are two best friends, and they agree on most things, however, one things lingers. Jamie, who's a business student, and Ryan, who studies engineering, were talking in D2. The difficultness of their majors came up in their conversation, prompting an argument.",
        speechLeft: "assets/1.1.png",
        speechRight: "assets/1.2.png"
    },
    {
        image: "assets/Panel1.2-ANNOYED.jpg",
        text: "Jamie clenched his fists, clearly annoyed. Ryan snapped as well. Soon the argument escalated to a fight.",
        speechLeft: "assets/2.1.png",
        speechRight: "assets/2.2.png"
    },
    {
        image: "assets/Panel1.3-FIGHT.jpg",
        text: "They hit each other until both of them fell to the ground.",
        speechLeft: "assets/3.1.png",
        speechRight: "assets/3.2.png",
        leftPos: "35%",
        topLeft: "10%",
        rightPos: "28%",
        topRight: "10%"
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
const nextPanel = document.getElementById("panel2"); // scroll target after final slide
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

// renders the slide at `index`, updating the image, text, and speech bubbles.
function showSlide(index) {
    panelImage.src = slides[index].image;
    panelText.textContent = slides[index].text;

    const sl = slides[index].speechLeft;
    const sr = slides[index].speechRight;

    if (sl) {
        speechLeft.src = sl;
        speechLeft.style.left = slides[index].leftPos || "30%";
        speechLeft.style.top = slides[index].topLeft || "0";
        speechLeft.style.transform = "";
        speechLeft.style.width = "18%";
        speechLeft.style.display = "";
        triggerAnimation(speechLeft, 'speech-slide-left');
    } else {
        // dismiss and hide the bubble if this slide has no left speech
        if (speechLeft.style.display !== "none") {
            triggerAnimation(speechLeft, 'speech-dismiss');
            setTimeout(() => { speechLeft.style.display = "none"; }, 200);
        }
    }

    if (sr) {
        speechRight.src = sr;
        speechRight.style.right = slides[index].rightPos || "30%";
        speechRight.style.top = slides[index].topRight || "0";
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
                speechPanel3.style.left = "55%";
                speechPanel3.style.top = "13%";
                speechPanel3.style.right = "auto";
                speechPanel3.style.transform = "translateX(-50%) translateY(-50%)";
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

// trigger panel2 speech bubbles only when scrolled into view
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

const jamieAnswer = document.getElementById("jamieAnswer");
const jamieFeedback = document.getElementById("jamieFeedback");

const ryanFeedback = document.getElementById("ryanFeedback");

helpJamieBtn.addEventListener("click", () => {
    const answer = jamieAnswer.value.trim().toLowerCase();

    jamieFeedback.classList.remove("feedback-correct", "feedback-wrong");

    if (answer === "h1>" || answer === "h1")  {
        jamieFeedback.textContent = "Correct! The full code is <h1>Welcome</h1>.";
        jamieFeedback.classList.add("feedback-correct");
    } else if (answer === "") {
        jamieFeedback.textContent = "Type a tag first.";
        jamieFeedback.classList.add("feedback-wrong");
    } else {
        jamieFeedback.textContent = "Not quite. Hint: this is a heading tag.";
        jamieFeedback.classList.add("feedback-wrong");
    }
});

helpRyanBtn.addEventListener("click", () => {
    const selected = document.querySelector('input[name="ryanQuestion"]:checked');

    ryanFeedback.classList.remove("feedback-correct", "feedback-wrong");

    if (!selected) {
        ryanFeedback.textContent = "Pick an answer first.";
        ryanFeedback.classList.add("feedback-wrong");
        return;
    }

    if (selected.value === "A") {
        ryanFeedback.textContent = "Correct! Profit is the money left after costs.";
        ryanFeedback.classList.add("feedback-correct");
    } else {
        ryanFeedback.textContent = "Not correct. The right answer is A.";
        ryanFeedback.classList.add("feedback-wrong");
    }
});

const panel6Slides = [
    {
        image: "assets/panel5_jamie_scene1.png",
        text: "Jamie happily looks at his hands — he's back."
    },
    {
        image: "assets/panel5_ryan_scene1.png",
        text: "Ryan happily looks at his hands — he's back."
    },
    {
        image: "assets/panel5_jamie_scene2.png",
        text: "Jamie confidently delivers his presentation."
    },
    {
        image: "assets/panel5_ryan_scene2.png",
        text: "Ryan immediately knows what to code and finishes on time."
    }
];

let currentPanel6Slide = 0;

const panel6Image = document.getElementById("panel6-image");
const panel6Text = document.getElementById("panel6-text");
const panel6PrevBtn = document.getElementById("panel6PrevBtn");
const panel6NextBtn = document.getElementById("panel6NextBtn");

function showPanel6Slide(index) {
    panel6Image.src = panel6Slides[index].image;
    panel6Text.textContent = panel6Slides[index].text;
}

panel6NextBtn.addEventListener("click", () => {
    if (currentPanel6Slide < panel6Slides.length - 1) {
        currentPanel6Slide++;
        showPanel6Slide(currentPanel6Slide);
    } else {
        unlockPanel(panel7Conclusion);
        panel7Conclusion.scrollIntoView({ behavior: "smooth" });
    }
});

panel6PrevBtn.addEventListener("click", () => {
    if (currentPanel6Slide > 0) {
        currentPanel6Slide--;
        showPanel6Slide(currentPanel6Slide);
    }
});

showPanel6Slide(currentPanel6Slide);

const panel7Conclusion = document.getElementById("panel7-conclusion");

let jamieAttempted = false;
let ryanAttempted = false;
let redemptionUnlocked = false;

function unlockPanel(el) {
    if (!el) return;
    el.classList.remove("panel-locked");
    el.setAttribute("aria-hidden", "false");
    if (window.AOS) AOS.refreshHard();
}