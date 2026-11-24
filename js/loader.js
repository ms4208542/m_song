(function () {
    'use strict';

    var loader = document.getElementById('loader');
    if (!loader) return;

    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var MIN_MS = reduced ? 600 : 3300;   // 애니메이션(약 3초)이 끝날 때까지 최소 표시 시간
    var MAX_MS = 10000;                  // 최대 대기 시간 (로드가 너무 오래 걸릴 때 대비)

    // 로딩 동안 커버 애니메이션 대기 (loader.css 참고)
    document.documentElement.classList.add('is-loading');
    // 로딩 화면이 화면에서 완전히 사라질 때까지 유지: .fade-up-item 등장 애니메이션 대기용
    document.documentElement.classList.add('loader-active');

    var startedAt = Date.now();
    var pageLoaded = document.readyState === 'complete';
    var finished = false;

    var removed = false;
    function removeLoader() {
        if (removed) return;
        removed = true;
        if (loader.parentNode) loader.parentNode.removeChild(loader);
        // 로딩 화면이 완전히 사라진 이 시점부터 .fade-up-item 애니메이션 시작
        document.documentElement.classList.remove('loader-active');
        try { document.dispatchEvent(new CustomEvent('loaderremoved')); } catch (e) { /* noop */ }
    }

    function finish() {
        if (finished) return;
        finished = true;
        document.documentElement.classList.remove('is-loading');   // 커버 애니메이션 시작
        loader.classList.add('is-done');
        loader.setAttribute('aria-hidden', 'true');

        loader.addEventListener('transitionend', function (e) {
            if (e.target === loader && e.propertyName === 'opacity') removeLoader();
        });
        setTimeout(removeLoader, 1200);   // transitionend 가 안 와도 정리

        try { document.dispatchEvent(new CustomEvent('loaderdone')); } catch (e) { /* noop */ }
    }

    function tryFinish() {
        if (!pageLoaded) return;
        var wait = MIN_MS - (Date.now() - startedAt);
        if (wait > 0) setTimeout(finish, wait);
        else finish();
    }

    window.addEventListener('load', function () {
        pageLoaded = true;
        tryFinish();
    });
    setTimeout(finish, MAX_MS);

    if (pageLoaded) tryFinish();
})();