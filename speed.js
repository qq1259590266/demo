// ── 无限加速面板（汉化版新增）─────────────────────────────────────────────────
// 原版把「时间加速器」绑在离线时间银行上：只有攒了时间才能开，开了会倒计时烧完，广告还带冷却。
// 这里把倍率功能单独提出来做一个常驻开关：不消耗任何时间、没有冷却、没有时长上限，
// 倍率可以自己填（1–999）。
// 真正的加速在 main.js 的游戏循环里执行（_freeSpeedMult），本文件只负责面板与记忆选择。
(function () {
    'use strict';
    const KEY = 'fn_free_speed';
    const MAX = 999;                       // 与 main.js 的 FREE_SPEED_MAX 保持一致
    const PRESETS = [1, 10, 100, 999];
    let cur = 1;
    let panel = null;

    function clamp(v) {
        const n = Math.round(Number(v));
        if (!Number.isFinite(n)) return 1;
        return Math.min(MAX, Math.max(1, n));
    }
    function load() {
        let raw = null;
        try { raw = localStorage.getItem(KEY); } catch (e) {}
        if (raw === null) return 2;          // 首次：默认 ×2（原版加速器的入门档），随时可调
        return clamp(raw);
    }
    function save(v) {
        try { localStorage.setItem(KEY, String(v)); } catch (e) {}
    }
    function apply(v, persist) {
        cur = clamp(v);
        if (typeof window.setFreeSpeed === 'function') window.setFreeSpeed(cur);
        if (persist) save(cur);
        paint();
        return cur;
    }

    // 尽早生效：游戏循环第一帧就按上次选的倍率跑，不用等面板挂载。
    apply(load(), false);

    function paint() {
        if (!panel) return;
        panel.classList.toggle('on', cur > 1);
        const state = panel.querySelector('#fspState');
        if (state) state.textContent = '×' + cur;
        const input = panel.querySelector('#fspInput');
        if (input && document.activeElement !== input) input.value = String(cur);
        panel.querySelectorAll('button[data-set]').forEach(b => {
            b.classList.toggle('active', Number(b.dataset.set) === cur);
        });
        const note = panel.querySelector('.fsp-note');
        if (note) {
            note.textContent = cur > 1
                ? (cur >= 100 ? '常驻加速中 · 最高 ×999' : '常驻加速中 · 不耗时')
                : '已关闭 · 无冷却 · 不耗时';
        }
    }

    function commitFromInput() {
        if (!panel) return;
        const input = panel.querySelector('#fspInput');
        if (!input) return;
        const v = apply(input.value, true);
        input.value = String(v);   // 越界/小数会被夹回合法值
    }

    function build() {
        if (document.getElementById('freeSpeedPanel')) { panel = document.getElementById('freeSpeedPanel'); paint(); return; }
        panel = document.createElement('div');
        panel.id = 'freeSpeedPanel';
        panel.innerHTML =
            '<div class="fsp-title"><i class="fa-solid fa-forward-fast"></i><span>无限加速</span><b id="fspState">×1</b></div>' +
            '<div class="fsp-custom"><span class="fsp-x">×</span>' +
            '<input id="fspInput" type="number" min="1" max="999" step="1" inputmode="numeric" value="' + cur + '" autocomplete="off">' +
            '<button id="fspApply" type="button">应用</button></div>' +
            '<div class="fsp-tiers">' +
            PRESETS.map(m => `<button type="button" data-set="${m}">×${m}</button>`).join('') +
            '</div>' +
            '<div class="fsp-note">常驻 · 无冷却 · 不耗时</div>';
        panel.title = '无限加速：自定义倍率 1–999，不消耗时间、没有冷却、没有时长上限（挑战模式内不生效）';
        panel.addEventListener('click', ev => {
            const preset = ev.target.closest('button[data-set]');
            if (preset) { apply(preset.dataset.set, true); return; }
            if (ev.target.closest('#fspApply')) commitFromInput();
        });
        const input = panel.querySelector('#fspInput');
        input.addEventListener('change', commitFromInput);
        input.addEventListener('keydown', ev => {
            if (ev.key === 'Enter') { ev.preventDefault(); commitFromInput(); input.blur(); }
            ev.stopPropagation();   // 数字键别传给游戏快捷键
        });
        document.body.appendChild(panel);
        paint();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
    else build();

    // main.js 的 setFreeSpeed() 会回调这里（比如游戏里手动开了银行加速时自动退回 ×1）。
    window._onFreeSpeedChange = function (v) {
        cur = clamp(v);
        paint();
    };
})();
