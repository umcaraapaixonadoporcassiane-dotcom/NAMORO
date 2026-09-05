// ===== FECHAR ABERTURA MANUAL =====
function fecharAbertura() {
    const abertura = document.getElementById('abertura');
    abertura.style.animation = 'fadeOut 0.8s ease-out forwards';
    setTimeout(() => {
        abertura.style.display = 'none';
    }, 800);
}

// ===== CONTADOR DE DIAS =====
function atualizarContador() {
    // Data de início: 6 de Abril de 2026
    // Hoje é 5 de Setembro de 2026 - completando 5 meses à meia-noite
    const dataInicio = new Date('2026-04-06T00:00:00').getTime();
    const agora = new Date().getTime();
    const diferenca = agora - dataInicio;

    // Cálculos
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    // Meses e dias restantes (usando 30.44 dias por mês - média)
    const meses = Math.floor(dias / 30.44);
    const diasRestantes = dias - (meses * 30);

    // Atualizar DOM
    document.getElementById('dias').textContent = String(dias).padStart(2, '0');
    document.getElementById('horas2').textContent = String(horas).padStart(2, '0');
    document.getElementById('minutos2').textContent = String(minutos).padStart(2, '0');
    document.getElementById('segundos2').textContent = String(segundos).padStart(2, '0');
    
    // Atualizar contador completo
    document.getElementById('meses').textContent = meses;
    document.getElementById('dias-rest').textContent = diasRestantes;
    document.getElementById('horas').textContent = horas;
}

// Atualizar contador a cada segundo
setInterval(atualizarContador, 1000);
atualizarContador(); // Executar imediatamente

// ===== PARTICLES ANIMATION =====
function criarParticles() {
    const particlesContainer = document.getElementById('particles');
    const numeroParticles = 50;

    for (let i = 0; i < numeroParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 20) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ===== FOOTER HEARTS RAIN =====
function criarChuvaDeCoracoes() {
    const footerHearts = document.getElementById('footer-hearts');
    if (!footerHearts) return;
    
    const numeroCoracacoes = 30;

    for (let i = 0; i < numeroCoracacoes; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animation = `heartRain ${Math.random() * 3 + 2}s linear infinite`;
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        footerHearts.appendChild(heart);
    }
}

// ===== ANIMAÇÃO DE SCROLL =====
function observarElementos() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.contador-card, .galeria-card, .musica-card, .foto-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== EFEITO DE HOVER NOS CARDS =====
document.querySelectorAll('.galeria-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// ===== ANIMAÇÃO DE CORAÇÃO NO CLIQUE =====
document.addEventListener('click', function(e) {
    // Apenas em áreas específicas para não interferir com links
    if (e.target.closest('section')) {
        criarCoracaoFlotante(e.pageX, e.pageY);
    }
});

function criarCoracaoFlotante(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = '2rem';
    heart.style.animation = 'heartFloat 2s ease-out forwards';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 2000);
}

// ===== PLAYER DE MÚSICA COM REFRÃO =====
let audioAtual = null;

function tocarMusica(musicaId) {
    // Se já está tocando, pausar
    if (audioAtual && !audioAtual.paused) {
        audioAtual.pause();
        audioAtual = null;
        return;
    }

    // URLs das músicas
    const musicas = {
        'sol-joao-maria': {
            url: 'https://www.youtube.com/embed/Jw0_WMuYPZU',
            refraoSegundo: 0
        }
    };

    const musica = musicas[musicaId];
    if (!musica) return;

    // Criar elemento de áudio
    audioAtual = new Audio(musica.url);
    audioAtual.currentTime = musica.refraoSegundo;
    
    try {
        audioAtual.play().catch(err => {
            console.log('Erro ao tocar música, abrindo em nova aba...');
            window.open('https://www.youtube.com/watch?v=Jw0_WMuYPZU', '_blank');
        });
    } catch (err) {
        console.log('Erro:', err);
    }
}

// ===== TELA FINAL COM OPÇÃO DE VOLTAR =====
function mostrarTelaFinal() {
    const telaFinal = document.getElementById('tela-final');
    if (telaFinal) {
        telaFinal.classList.add('ativa');
    }
}

function fecharTelaFinal() {
    const telaFinal = document.getElementById('tela-final');
    if (telaFinal) {
        telaFinal.classList.remove('ativa');
    }
}

// ===== ADICIONAR ESTILOS DE ANIMAÇÃO DINÂMICOS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes heartFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0);
        }
    }

    @keyframes heartRain {
        0% {
            top: -50px;
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            top: 100%;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    criarParticles();
    criarChuvaDeCoracoes();
    observarElementos();
    
    console.log('💕 Bem-vindo ao site de aniversário de namoro! 💕');
    console.log('Data de início: 6 de Abril de 2026');
    console.log('Aniversário de 5 meses: 5 de Setembro de 2026 ❤️');
});

// ===== DETECTAR MUDANÇA DE ABA E PAUSAR/RETOMAR ANIMAÇÕES =====
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Voltamos em breve... 💕');
    } else {
        atualizarContador();
    }
});
