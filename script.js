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


    links.forEach(link => {
        link.addEventListener('click', function (event) {
            // Remove a classe 'active' de todos os links
            links.forEach(link => link.classList.remove('active'));

            // Adiciona a classe 'active' ao link clicado
            event.target.classList.add('active');
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

    // Alterar foto a cada 5 segundos
    let autoSlide = setInterval(showNextPhoto, 5000);

   
  // Seleciona todas as cartas de fotos
const photoCards = document.querySelectorAll('.photo-card');

// Seleciona a área de visualização ampliada
const fullscreen = document.querySelector('#fullscreen');
const fullscreenImage = document.querySelector('#fullscreenImage');

// Evento de clique para destacar a foto
photoCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove a classe 'selected' de todas as fotos
        photoCards.forEach(item => item.classList.remove('selected'));
        
        // Adiciona a classe 'selected' à foto clicada
        card.classList.add('selected');
        
        // Exibe a foto ampliada na visualização fullscreen
        const clickedImage = card.querySelector('img');
        fullscreenImage.src = clickedImage.src;
        fullscreen.style.display = 'flex';
    });
});

// Fechar a foto ampliada ao clicar na foto ampliada
fullscreenImage.addEventListener('click', () => {
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
document.addEventListener('DOMContentLoaded', () => {
    const dataInicio = new Date('2022-05-21T00:00:00');
    const tempoJuntosElement = document.getElementById('tempo-juntos');

    // Função para calcular e formatar o tempo
    function calcularTempo() {
        const agora = new Date();
        const diferenca = agora - dataInicio;

        const segundos = Math.floor(diferenca / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);
        const semanas = Math.floor(dias / 7);
        const meses = Math.floor(dias / 30.44);
        const anos = Math.floor(dias / 365.25);

        return {
            anos,
            meses: meses % 12,
            semanas,
            dias,
            horas: horas % 24,
            minutos: minutos % 60,
            segundos: segundos % 60,
        };
    }

    // Função para atualizar o contador
    function atualizarContador() {
        const tempo = calcularTempo();

        const tempoHTML = `
            <span>${tempo.anos} anos</span>
            <span>${tempo.meses} meses</span>
            <span>${tempo.semanas} semanas</span>
            <span>${tempo.dias} dias</span>
            <span>${tempo.horas} horas</span>
            <span>${tempo.minutos} minutos</span>
            <span>${tempo.segundos} segundos</span>
        `;

        tempoJuntosElement.innerHTML = tempoHTML;
    }

    // Atualizar o contador a cada segundo
    setInterval(atualizarContador, 1000);

    // Inicializar o contador imediatamente
    atualizarContador();
});


