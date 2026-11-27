// Script principal: importa os módulos e liga tudo.
import { $ } from './dom.js';
import { initAbas } from './modules/abas.js';
import { alterarValor, atualizarBarraVisual } from './modules/barras.js';
import { atualizarTudo, alterarSanidadeMax } from './modules/status.js';
import { initLimitesAtributos } from './modules/atributos.js';
import { initPericias } from './modules/pericias.js';
import { initOcupacao } from './modules/ocupacao.js';
import { initFoto } from './modules/foto.js';
import { salvarFicha, carregarFicha } from './modules/storage.js';
import { registrarServiceWorker } from './modules/pwa.js';

function init() {
    initAbas();
    initOcupacao();
    initLimitesAtributos();
    initPericias();
    initFoto(salvarFicha);

    // Botões das barras (-/+ e máximo da sanidade)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-acao]');
        if (!btn) return;
        const delta = parseInt(btn.dataset.delta);

        if (btn.dataset.acao === 'alterar') {
            const status = btn.dataset.status;
            alterarValor(status, delta);
            if (status === 'exposicao') atualizarTudo();
            salvarFicha();
        } else if (btn.dataset.acao === 'sanidade-max') {
            alterarSanidadeMax(delta);
            salvarFicha();
        }
    });

    $('classe')?.addEventListener('change', () => { atualizarTudo(); salvarFicha(); });

    ['hp', 'sanidade', 'fome', 'exposicao', 'energia'].forEach(atualizarBarraVisual);
    atualizarTudo();

    document.addEventListener('input', (e) => {
        if (e.target.closest('.atrib-item') || e.target.id === 'input-exposicao') atualizarTudo();
    });
    document.addEventListener('input', salvarFicha);
    document.addEventListener('change', salvarFicha);

    carregarFicha();
    registrarServiceWorker();
}

init();
