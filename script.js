/**
 * Naruto 2D - Landing Page
 * Script principal
 */

const DISCORD_LINK = "https://discord.gg/WCmQUBjX9G";

function initCriarConta() {
    const modal = document.getElementById("modal-criar-conta");
    if (!modal) return;

    const openers = document.querySelectorAll(".btn-criar-conta");
    const closers = modal.querySelectorAll("[data-modal-close]");

    function openModal() {
        modal.hidden = false;
        document.body.classList.add("modal-open");
        const closeBtn = modal.querySelector(".modal__close");
        if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
        modal.hidden = true;
        document.body.classList.remove("modal-open");
    }

    openers.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            openModal();
        });
    });

    closers.forEach(function (el) {
        el.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !modal.hidden) closeModal();
    });
}

function initDiscord() {
    const btnsDiscord = document.querySelectorAll(".btn-discord");
    const footerDiscord = document.getElementById("footer-discord");

    function openDiscord() {
        window.open(DISCORD_LINK, "_blank", "noopener,noreferrer");
    }

    btnsDiscord.forEach(function (btn) {
        btn.addEventListener("click", openDiscord);
    });

    if (footerDiscord) {
        footerDiscord.addEventListener("click", function (e) {
            e.preventDefault();
            openDiscord();
        });
    }
}

function initScrollAnimations() {
    const sections = document.querySelectorAll(
        ".promo-donate, .sobre, .como-comecar, .discord, .cta-final"
    );

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            root: null,
            rootMargin: "0px 0px -80px 0px",
            threshold: 0.1,
        }
    );

    sections.forEach(function (section) {
        observer.observe(section);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initCriarConta();
    initDiscord();
    initScrollAnimations();
});
