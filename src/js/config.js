// Regras do jogo em um só lugar: para mudar um número, mude aqui.
export const STORAGE_KEY_FICHA = 'ficha_rpg_mundo_maldito';

export const REGRAS = {
    hp: { base: 20, porVigor: 4 },
    sanidade: { min: 10, max: 30, padrao: 10 },
    fome: { base: 20, vigorPorEtapa: 5, bonusPorEtapa: 3 },
    energia: { porPonto: 5 },
    defesa: { maxPontos: 20, reducaoPorPonto: 2 },
    limitesAtributos: { 'INTELIGÊNCIA': 30, 'CARISMA': 30, 'DEFESA': 20 },
    pericias: { maxPorPericia: 10, maxTreinadas: 5 }
};
