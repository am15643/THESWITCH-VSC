const slides = [
    {
        image: "assets/Panel1.1-IDLE.jpg",
        text: "Jamie and Ryan are two best friends, and they agree on most things, however, one things lingers. Jamie, who's a business student, and Ryan, who studies engineering, were talking in D2. The difficultness of their majors came up in their conversation, prompting an argument."
    },
    {
        image: "assets/Panel1.2-ANNOYED.jpg",
        text: "Jamie clenched his fists, clearly annoyed. Ryan snapped as well. Soon the argument escalated to a fight."
    },
    {
        image: "assets/Panel1.3-FIGHT.jpg",
        text: "They hit each other until both of them fell to the ground."
    },
    {
        image: "assets/Panel1.4-AFTERFIGHT.jpg",
        text: "Their heads were pounding and that pain carried on throughout the night."
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

function showSlide(index) {
    panelImage.src = slides[index].image;
    panelText.textContent = slides[index].text;
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

        setTimeout(() => {
            panel3Image.src = "assets/Panel3.2-DESPERATETOGETHER.jpg";
            panel3Image.classList.remove("flip-out");
            panel3Image.classList.add("flip-in");
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

helpJamieBtn?.addEventListener("click", () => {
    jamieHelpDisplay.textContent = jamieHelps[jamieHelpIndex];
    jamieHelpIndex = (jamieHelpIndex + 1) % jamieHelps.length;
});

helpRyanBtn?.addEventListener("click", () => {
    ryanHelpDisplay.textContent = ryanHelps[ryanHelpIndex];
    ryanHelpIndex = (ryanHelpIndex + 1) % ryanHelps.length;
});
