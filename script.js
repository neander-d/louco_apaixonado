document.addEventListener('DOMContentLoaded', () => {
    // Seções
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('nav a');

    // Função para mudar de seção
    function showSection(targetId) {
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('hidden');
                section.classList.add('active');
            } else {
                section.classList.remove('active');
                section.classList.add('hidden');
            }
        });
    }

    // Adicionar evento de clique aos links de navegação
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            showSection(targetId);
        });
    });

    // Slideshow de fotos
    const photos = document.querySelectorAll('.photos img');
    const dots = document.querySelectorAll('.indicators .dot');
    let currentPhotoIndex = 0;

    // Função para exibir a próxima foto no slideshow
    function showNextPhoto() {
        photos[currentPhotoIndex].classList.remove('active');
        dots[currentPhotoIndex].classList.remove('active');
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        photos[currentPhotoIndex].classList.add('active');
        dots[currentPhotoIndex].classList.add('active');
    }

    // Função para exibir a foto anterior no slideshow
    function showPreviousPhoto() {
        photos[currentPhotoIndex].classList.remove('active');
        dots[currentPhotoIndex].classList.remove('active');
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        photos[currentPhotoIndex].classList.add('active');
        dots[currentPhotoIndex].classList.add('active');
    }

    // Alterar foto a cada 3 segundos
    let autoSlide = setInterval(showNextPhoto, 5000);

   
    // Funcionalidade dos cards de fotos
    const photoCards = document.querySelectorAll('.photo-card');
    const highlightedImage = document.querySelector('.highlighted img');
    const fullscreenImage = document.querySelector('#fullscreen img');

    // Exibir a foto destacada ao clicar em um card
    photoCards.forEach(card => {
        card.addEventListener('click', () => {
            const src = card.getAttribute('data-src');
            highlightedImage.src = src;
            fullscreenImage.src = src;
        });
    });

    // Exibir a foto ampliada ao clicar na imagem destacada
    highlightedImage.addEventListener('click', () => {
        const fullscreen = document.querySelector('#fullscreen');
        fullscreen.style.display = 'block';
    });

    // Fechar a foto ampliada ao clicar na foto ampliada
    fullscreenImage.addEventListener('click', () => {
        const fullscreen = document.querySelector('#fullscreen');
        fullscreen.style.display = 'none';
    });

// Passagem de fotos manual por arraste
const photosContainer = document.querySelector('.photos');
let startX = 0;
let endX = 0;
let isDragging = false;

// Função para iniciar o arraste
photosContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX; // Captura a posição inicial do mouse
});

// Função para rastrear o movimento do arraste
photosContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    endX = e.clientX; // Captura a posição do mouse durante o movimento
});

// Função para finalizar o arraste
photosContainer.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;

    if (startX > endX) {
        // Arrastou para a esquerda
        showNextPhoto();
    } else if (startX < endX) {
        // Arrastou para a direita
        showPreviousPhoto();
    }
});

// Para dispositivos móveis (touch)
photosContainer.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    startX = touch.clientX;
});

photosContainer.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    endX = touch.clientX;
});

photosContainer.addEventListener('touchend', () => {
    if (startX > endX) {
        // Arrastou para a esquerda
        showNextPhoto();
    } else if (startX < endX) {
        // Arrastou para a direita
        showPreviousPhoto();
    }
});
});
// (data do começo do relacionamento)
const dataInicio = new Date('2022-05-21T00:00:00'); 
const tempoJuntosElement = document.getElementById('tempo-juntos');

// Função para atualizar o contador de tempo real
function atualizarContador() {
    const agora = new Date();
    const diferenca = agora - dataInicio;

    // Calcular a diferença em unidades de tempo
    const segundos = Math.floor(diferenca / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30.44); // Média de dias por mês
    const anos = Math.floor(dias / 365.25); // Média de dias por ano

    // Montar o conteúdo com quebras de linha e dois valores por linha
    const tempoHTML = `
        ${anos} anos, ${meses % 12} meses <br>
        ${semanas} semanas, ${dias} dias <br>
        ${horas % 24} horas, ${minutos % 60} minutos <br>
        ${segundos % 60} segundos
    `;

    // Exibir o tempo no formato desejado
    const tempoJuntosElement = document.getElementById('tempo-juntos');
    tempoJuntosElement.innerHTML = tempoHTML;

    // Atualizar o contador a cada segundo
    setTimeout(atualizarContador, 1000);
}

// Inicializa o contador
atualizarContador();

