/* mobile.js — 햄버거 메뉴 토글 (기존 script.js 는 수정하지 않음) */
(function () {
    'use strict';

    var header = document.querySelector('.header');
    var btn = header && header.querySelector('.hamburger');
    var menu = document.getElementById('mobileMenu');
    if (!header || !btn || !menu) return;

    var mq = window.matchMedia('(max-width: 767px)');

    // fullpage.js 가 있으면 메뉴가 열린 동안 섹션 스크롤을 잠가둔다 (없으면 무시)
    function lockPageScroll(lock) {
        try {
            if (window.fullpage_api && typeof window.fullpage_api.setAllowScrolling === 'function') {
                window.fullpage_api.setAllowScrolling(!lock);
            } else if (window.jQuery && jQuery.fn.fullpage && typeof jQuery.fn.fullpage.setAllowScrolling === 'function') {
                jQuery.fn.fullpage.setAllowScrolling(!lock);
            }
        } catch (e) { /* noop */ }
    }

    function setOpen(open) {
        header.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
        btn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
        lockPageScroll(open);
    }

    btn.addEventListener('click', function () {
        setOpen(!header.classList.contains('is-open'));
    });

    // 전체화면 메뉴: 링크를 누르거나 빈 곳을 눌러도 닫기
    menu.addEventListener('click', function () {
        setOpen(false);
    });

    // ESC 로 닫기
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && header.classList.contains('is-open')) {
            setOpen(false);
            btn.focus();
        }
    });

    // 데스크톱 폭으로 돌아가면 상태 초기화
    function onChange(e) {
        if (!e.matches) setOpen(false);
    }
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
})();
