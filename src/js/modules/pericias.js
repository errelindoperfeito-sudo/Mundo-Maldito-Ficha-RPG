import { $ } from '../dom.js';
import { REGRAS } from '../config.js';

const inputs = () => document.querySelectorAll('#tab-pericias input[type="number"]');
let timerAviso;

function avisar(texto) {
    const el = $('pericias-aviso');
    if (!el) return;
    el.textContent = texto;
    clearTimeout(timerAviso);
    timerAviso = setTimeout(() => { el.textContent = ''; }, 3500);
}

export function atualizarResumoPericias() {
    let treinadas = 0, pontos = 0;
    inputs().forEach(i => {
        const v = parseInt(i.value) || 0;
        if (v > 0) { treinadas++; pontos += v; }
    });
    const elTreinadas = $('pericias-treinadas');
    if (elTreinadas) {
        elTreinadas.textContent = `${treinadas} / ${REGRAS.pericias.maxTreinadas}`;
        elTreinadas.classList.toggle('excedido', treinadas > REGRAS.pericias.maxTreinadas);
    }
    if ($('pericias-pontos')) $('pericias-pontos').textContent = pontos;
}

export function initPericias() {
    const { maxPorPericia, maxTreinadas } = REGRAS.pericias;

    inputs().forEach(input => {
        input.addEventListener('input', () => {
            let valor = parseInt(input.value);
            if (isNaN(valor)) { input.value = ''; valor = 0; }
            if (valor < 0) { input.value = 0; valor = 0; }
            if (valor > maxPorPericia) { input.value = maxPorPericia; valor = maxPorPericia; avisar(`Cada perícia vai até ${maxPorPericia}.`); }

            if (valor > 0) {
                const outras = [...inputs()].filter(i => i !== input && (parseInt(i.value) || 0) > 0).length;
                if (outras >= maxTreinadas) {
                    input.value = 0;
                    avisar(`Você só pode ser treinado em ${maxTreinadas} perícias.`);
                }
            }
            atualizarResumoPericias();
        });
    });
    atualizarResumoPericias();
}
