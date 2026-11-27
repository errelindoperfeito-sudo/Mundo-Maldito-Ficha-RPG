import { dadosOcupacoes } from '../data/ocupacoes.js';

export function initOcupacao() {
    const modal = document.getElementById('modal-info');
    const btnInfo = document.getElementById('btn-info-ocupacao');
    const btnFechar = document.querySelector('.close-modal');
    const select = document.getElementById('ocupacao');

    btnInfo.addEventListener('click', () => {
        if (!select.value) { alert('Selecione uma ocupação primeiro.'); return; }
        const dados = dadosOcupacoes[select.value];
        if (!dados) { alert('Informações da ocupação não encontradas.'); return; }

        document.getElementById('modal-titulo-ocupacao').textContent = dados.nome;
        document.getElementById('modal-atributos-info').textContent = dados.atributos;
        document.getElementById('modal-pericias-info').textContent = dados.pericias;
        modal.style.display = 'block';
    });

    btnFechar.addEventListener('click', () => { modal.style.display = 'none'; });
    window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

    select.addEventListener('change', () => {
        btnInfo.classList.add('ativo');
        btnInfo.style.transform = 'scale(0.95)';
        setTimeout(() => { btnInfo.style.transform = 'scale(1)'; }, 100);
    });
}
