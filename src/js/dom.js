export const $ = (id) => document.getElementById(id);

export function getAtributoValor(nome) {
    for (const item of document.querySelectorAll('.atrib-item')) {
        const titulo = item.querySelector('h3');
        const input = item.querySelector('input');
        if (titulo && input && titulo.textContent.trim().toUpperCase() === nome.toUpperCase()) {
            return parseInt(input.value) || 0;
        }
    }
    return 0;
}
