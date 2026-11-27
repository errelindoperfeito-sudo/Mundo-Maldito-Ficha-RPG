import { $ } from '../dom.js';

function getMax(status, fallback) {
    if (status === 'exposicao') return 100;
    return parseInt($(`max-${status}`)?.textContent) || fallback;
}

export function alterarValor(status, quantidade) {
    const input = $(`input-${status}`);
    if (!input) return;
    const atual = parseInt(input.value) || 0;
    input.value = Math.min(Math.max(atual + quantidade, 0), getMax(status, 0));
    atualizarBarraVisual(status);
}

export function atualizarBarraVisual(status) {
    const input = $(`input-${status}`);
    const barra = $(`fill-${status}`);
    if (!input || !barra) return;
    const atual = parseInt(input.value) || 0;
    barra.style.width = Math.min((atual / getMax(status, 1)) * 100, 100) + '%';
}

export function setMaxBarra(status, novoMax) {
    const spanMax = $(`max-${status}`);
    const input = $(`input-${status}`);
    if (!spanMax || !input) return;
    input.dataset.max = novoMax;
    spanMax.textContent = novoMax;
    if (parseInt(input.value) > novoMax) input.value = novoMax;
    atualizarBarraVisual(status);
}
