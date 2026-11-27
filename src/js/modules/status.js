import { $, getAtributoValor } from '../dom.js';
import { REGRAS } from '../config.js';
import { estado } from '../state.js';
import { bonusClasses } from '../data/classes.js';
import { setMaxBarra } from './barras.js';

function getBonusClasse() {
    const classe = $('classe')?.value || 'nenhuma';
    return bonusClasses[classe] || bonusClasses['nenhuma'];
}

// Exposição paranormal: a cada 5% sorteia +1 de vitalidade ou de energia
function calcularBonusExposicao() {
    const exposicao = parseInt($('input-exposicao')?.value) || 0;
    const etapasAtuais = Math.floor(exposicao / 5);
    const cache = estado.cacheBonusExposicao;

    if (etapasAtuais > estado.etapasExposicaoAnterior) {
        for (let i = 0; i < etapasAtuais - estado.etapasExposicaoAnterior; i++) {
            Math.random() < 0.5 ? cache.hp++ : cache.energia++;
        }
    }
    if (etapasAtuais < estado.etapasExposicaoAnterior) {
        for (let i = 0; i < estado.etapasExposicaoAnterior - etapasAtuais; i++) {
            if (cache.hp > 0) cache.hp--;
            else if (cache.energia > 0) cache.energia--;
        }
    }
    estado.etapasExposicaoAnterior = etapasAtuais;
    return cache;
}

function atualizarVitalidade() {
    const { base, porVigor } = REGRAS.hp;
    const bonus = calcularBonusExposicao();
    setMaxBarra('hp', base + getAtributoValor('VIGOR') * porVigor + bonus.hp + getBonusClasse().hp);
}

function atualizarEnergiaParanormal() {
    const bonus = calcularBonusExposicao();
    const max = getAtributoValor('ENERGIA P.') * REGRAS.energia.porPonto + bonus.energia + getBonusClasse().energia;
    setMaxBarra('energia', Math.max(0, max));
}

function atualizarFome() {
    const { base, vigorPorEtapa, bonusPorEtapa } = REGRAS.fome;
    const etapasAtuais = Math.floor(getAtributoValor('VIGOR') / vigorPorEtapa);
    const dif = etapasAtuais - estado.etapasVigorAnterior;

    estado.bonusFomeAcumulado = Math.max(0, estado.bonusFomeAcumulado + dif * bonusPorEtapa);
    estado.etapasVigorAnterior = etapasAtuais;

    setMaxBarra('fome', base + estado.bonusFomeAcumulado + getBonusClasse().fome);
}

// Sanidade: máximo ajustável pelo jogador entre 10 e 30
function atualizarSanidade() {
    setMaxBarra('sanidade', estado.sanidadeMax);
}

export function alterarSanidadeMax(delta) {
    const { min, max } = REGRAS.sanidade;
    estado.sanidadeMax = Math.min(Math.max(estado.sanidadeMax + delta, min), max);
    atualizarTudo();
}

// Valores derivados mostrados nos atributos
function atualizarDerivados() {
    const { maxPontos, reducaoPorPonto } = REGRAS.defesa;
    const defesa = Math.min(getAtributoValor('DEFESA'), maxPontos);
    const infoDefesa = $('info-defesa');
    const infoInt = $('info-inteligencia');
    if (infoDefesa) infoDefesa.textContent = `Redução de dano: ${defesa * reducaoPorPonto}`;
    if (infoInt) infoInt.textContent = `Reduz DT em ${getAtributoValor('INTELIGÊNCIA')}`;
}

export function atualizarTudo() {
    atualizarVitalidade();
    atualizarEnergiaParanormal();
    atualizarFome();
    atualizarSanidade();
    atualizarDerivados();
}
