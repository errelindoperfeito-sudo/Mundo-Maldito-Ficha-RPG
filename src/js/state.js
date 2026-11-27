import { REGRAS } from './config.js';

// Estado interno compartilhado entre os módulos
export const estado = {
    cacheBonusExposicao: { hp: 0, energia: 0 },
    etapasExposicaoAnterior: 0,
    etapasVigorAnterior: 0,
    bonusFomeAcumulado: 0,
    sanidadeMax: REGRAS.sanidade.padrao
};
