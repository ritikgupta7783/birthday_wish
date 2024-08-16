document.addEventListener("DOMContentLoaded", parseURLParams);

function showSurprise(name, birthday) {
    document.getElementById("input-form").classList.add("hidden");
    document.getElementById("surprise-page").classList.remove("hidden");

    const wishMessage = document.getElementById("wish-message");
    wishMessage.textContent = `Happy Birthday, ${name}!`;

    const dateDisplay = document.getElementById("date-display");
    dateDisplay.textContent = `Date: ${birthday}`;

    const balloonColors = ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6'];
    const balloonsContainer = document.getElementById("balloons-container");

    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.left = `${Math.random() * (window.innerWidth - 100)}px`; // Avoid overlap with cake
        balloon.style.top = `${Math.random() * (window.innerHeight - 200)}px`; // Avoid overlap with cake
        balloon.style.animationDuration = `${5 + Math.random() * 5}s`;
        balloonsContainer.appendChild(balloon);

        balloon.addEventListener('animationend', () => {
            balloon.remove();
        });
    }

    // Create a balloon every 500ms
    setInterval(createBalloon, 500);

    const glitterContainer = document.getElementById("glitter-container");

    function createGlitter() {
        const glitter = document.createElement('div');
        glitter.classList.add('glitter');
        glitter.style.left = `${Math.random() * 100}vw`; // Random position
        glitter.style.top = `${Math.random() * 100}vh`;
        glitter.style.animationDuration = `${2 + Math.random() * 3}s`;
        glitterContainer.appendChild(glitter);

        glitter.addEventListener('animationend', () => {
            glitter.remove();
        });
    }

    // Create glitter every 100ms
    setInterval(createGlitter, 100);
}

function handleFormSubmission() {
    const name = document.getElementById("name").value;
    const birthday = document.getElementById("birthday").value;

    if (!name || !birthday) {
        alert("Please enter both name and birthday!");
        return;
    }

    showSurprise(name, birthday);

    const shareableLink = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(name)}&birthday=${encodeURIComponent(birthday)}`;
    document.getElementById("share-link").value = shareableLink;
    document.getElementById("share-link-container").classList.remove("hidden");
}

function copyShareLink() {
    const shareLinkInput = document.getElementById("share-link");
    shareLinkInput.select();
    document.execCommand("copy");
    alert("Link copied to clipboard!");
}

function parseURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const birthday = urlParams.get('birthday');

    if (name && birthday) {
        showSurprise(name, birthday);
    } else {
        document.getElementById("input-form").classList.remove("hidden");
    }
}
