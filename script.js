/**
 * Naruto 2D - Landing Page
 * Script principal
 */

// ============================================
// CONFIGURAÇÃO - Fácil de editar
// ============================================

const DISCORD_LINK = "https://discord.gg/WCmQUBjX9G";

// ============================================
// Criar conta - aviso
// ============================================

function initCriarConta() {
    const btns = document.querySelectorAll(".btn-criar-conta");
    btns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            alert("Conta cria no cliente");
        });
    });
}

// ============================================
// Discord - Botão e link do footer
// ============================================

function initDiscord() {
    const btnsDiscord = document.querySelectorAll(".btn-discord");
    const footerDiscord = document.getElementById("footer-discord");

    function openDiscord() {
        const link = DISCORD_LINK;
        if (link && link !== "COLOCAR_LINK_DISCORD_AQUI") {
            window.open(link, "_blank", "noopener,noreferrer");
        } else {
            alert("Configure o link do Discord no arquivo script.js (variável DISCORD_LINK)");
        }
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

// ============================================
// Animações - Fade in ao rolar
// ============================================

function initScrollAnimations() {
    const sections = document.querySelectorAll(
        ".promo-donate, .sobre, .como-comecar, .discord, .cta-final"
    );

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -80px 0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    sections.forEach(function (section) {
        observer.observe(section);
    });
}

// ============================================
// Inicialização
// ============================================

document.addEventListener("DOMContentLoaded", function () {
    initCriarConta();
    initDiscord();
    initScrollAnimations();
});
