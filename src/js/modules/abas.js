export function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(c => {
        c.style.display = 'none';
        c.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    const aba = document.getElementById('tab-' + tabId);
    if (aba) {
        aba.style.display = 'block';
        aba.classList.add('active');
    }
    document.querySelector(`.tab-btn[data-tab="${tabId}"]`)?.classList.add('active');
}

export function initAbas() {
    document.querySelector('.tabs-nav')?.addEventListener('click', (e) => {
        const btn = e.target.closest('.tab-btn[data-tab]');
        if (btn) showTab(btn.dataset.tab);
    });
}
