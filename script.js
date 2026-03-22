const slides = [
    {
        image: "assets/Panel1.1-IDLE.jpg",
        text: "Meet Ryan and Jamie! Ryan and Jamie are best friends, and they agree on most things. However, one thing always lingers. Ryan, an Engineering major, believes Business is the easiest major ever. Jamie, a Business student, does not agree. Rather, Jamie thinks Engineering is easier, and in this day and age, ChatGPT can solve everything he can't."
    },
    {
        image: "assets/Panel1.2-ANNOYED.jpg",
        text: ""
    },
    {
        image: "assets/Panel1.3-FIGHT.jpg",
        text: ""
    },
    {
        image: "assets/Panel1.4-AFTERFIGHT.jpg",
        text: ""
    }
];

let currentSlide = 0;
let isAnimating = false;

const panelImage = document.getElementById("panel-image");
const panelText = document.getElementById("panel-text");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const nextPanel = document.getElementById("panel2");


function showSlide(index) {
    panelImage.src = slides[index].image;
    panelText.textContent = slides[index].text;
}

nextBtn.addEventListener("click", () => {
    if (isAnimating) return;

    // special transition: from slide 3 to slide 4
    if (currentSlide === 2) {
        isAnimating = true;
        panelBox.classList.add("shake");

        setTimeout(() => {
            currentSlide = 3;
            showSlide(currentSlide);
            panelBox.classList.remove("shake");
            isAnimating = false;
        }, 500); // must match CSS animation duration
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