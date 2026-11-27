import { REGRAS } from '../config.js';

// Limita o valor máximo de atributos pelo nome (ex.: DEFESA no máximo 20)
export function initLimitesAtributos() {
    document.querySelectorAll('.atrib-item').forEach(item => {
        const nome = item.querySelector('h3')?.textContent.trim().toUpperCase();
        const input = item.querySelector('input[type="number"]');
        const limite = REGRAS.limitesAtributos[nome];
        if (!input || limite === undefined) return;

        input.addEventListener('input', () => {
            const valor = parseInt(input.value);
            if (isNaN(valor) || valor < 0) { input.value = 0; return; }
            if (valor > limite) input.value = limite;
        });
    });
}
