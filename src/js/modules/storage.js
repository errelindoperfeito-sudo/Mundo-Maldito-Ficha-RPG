import { $ } from '../dom.js';
import { STORAGE_KEY_FICHA, REGRAS } from '../config.js';
import { estado } from '../state.js';
import { atualizarBarraVisual } from './barras.js';
import { atualizarTudo } from './status.js';
import { atualizarResumoPericias } from './pericias.js';

const BARRAS = ['hp', 'sanidade', 'fome', 'energia', 'exposicao'];

export function salvarFicha() {
    const img = $('imagem-perfil');
    const data = {
        basicos: {
            personagem: $('nome-personagem')?.value || '',
            jogador: $('nome-jogador')?.value || '',
            classe: $('classe')?.value || '',
            ocupacao: $('ocupacao')?.value || ''
        },
        atributos: [...document.querySelectorAll('.atrib-item')].map(item => ({
            nome: item.querySelector('h3')?.textContent.trim() || '',
            valor: item.querySelector('input')?.value || 0
        })),
        pericias: [...document.querySelectorAll('#tab-pericias input')].map(i => ({ id: i.id, valor: i.value })),
        barras: BARRAS.reduce((acc, b) => { acc[b] = $(`input-${b}`)?.value || 0; return acc; }, {}),
        diarios: {
            habilidades: $('habilidades')?.value || '',
            itens: $('itens')?.value || '',
            historia: $('historia')?.value || '',
            notas: $('diario-notas')?.value || ''
        },
        estadosInternos: { ...estado },
        imagemPerfil: img && img.src.startsWith('data:') ? img.src : null
    };
    localStorage.setItem(STORAGE_KEY_FICHA, JSON.stringify(data));
}

export function carregarFicha() {
    const raw = localStorage.getItem(STORAGE_KEY_FICHA);
    if (!raw) return;
    const data = JSON.parse(raw);

    $('nome-personagem').value = data.basicos.personagem;
    $('nome-jogador').value = data.basicos.jogador;
    $('classe').value = data.basicos.classe;
    $('ocupacao').value = data.basicos.ocupacao;

    data.atributos.forEach(attr => {
        document.querySelectorAll('.atrib-item').forEach(item => {
            const h3 = item.querySelector('h3');
            const input = item.querySelector('input');
            if (h3 && input && h3.textContent.trim() === attr.nome) input.value = attr.valor;
        });
    });

    data.pericias.forEach(p => { const i = $(p.id); if (i) i.value = p.valor; });
    Object.entries(data.barras).forEach(([b, v]) => { const i = $(`input-${b}`); if (i) i.value = v; });

    $('habilidades').value = data.diarios.habilidades;
    $('itens').value = data.diarios.itens;
    $('historia').value = data.diarios.historia;
    $('diario-notas').value = data.diarios.notas;

    const e = data.estadosInternos || {};
    estado.cacheBonusExposicao = e.cacheBonusExposicao || estado.cacheBonusExposicao;
    estado.etapasExposicaoAnterior = e.etapasExposicaoAnterior || 0;
    estado.bonusFomeAcumulado = e.bonusFomeAcumulado || 0;
    estado.etapasVigorAnterior = e.etapasVigorAnterior || 0;
    // Fichas antigas (sem esse campo) tinham sanidade fixa em 30
    estado.sanidadeMax = Math.min(Math.max(e.sanidadeMax ?? REGRAS.sanidade.max, REGRAS.sanidade.min), REGRAS.sanidade.max);

    if (data.imagemPerfil) {
        $('imagem-perfil').src = data.imagemPerfil;
        $('imagem-perfil').style.display = 'block';
        $('icone-perfil').style.display = 'none';
    }

    atualizarTudo();
    BARRAS.forEach(atualizarBarraVisual);
    atualizarResumoPericias();
}
