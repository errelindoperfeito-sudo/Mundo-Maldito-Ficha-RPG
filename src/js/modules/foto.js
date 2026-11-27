export function initFoto(aoMudar) {
    const input = document.getElementById('foto-perfil');
    const img = document.getElementById('imagem-perfil');
    const icone = document.getElementById('icone-perfil');
    const wrapper = document.querySelector('.foto-perfil-wrapper');
    if (!input || !img || !icone) return;

    wrapper?.addEventListener('click', (e) => { if (e.target !== input) input.click(); });

    input.addEventListener('change', () => {
        const arquivo = input.files[0];
        if (!arquivo) return;
        if (!arquivo.type.startsWith('image/')) {
            alert('Por favor, selecione apenas imagens.');
            input.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            img.src = reader.result;
            img.style.display = 'block';
            icone.style.display = 'none';
            aoMudar?.();
        };
        reader.readAsDataURL(arquivo);
    });
}
