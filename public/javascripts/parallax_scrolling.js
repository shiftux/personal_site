window.addEventListener("scroll", function() {
    const scrollY = window.scrollY;
    document.querySelector(".welcome").style.transform = `translateY(${-scrollY * 0.2}px)`;
});