document.addEventListener('DOMContentLoaded', function () {

    // --- 변수 선언 부분 ---
    const fullpageBgContainer = document.getElementById(
        'fullpage-container-background'
    );
    const edBackgroundContainer = document.getElementById(
        'ed-background-container'
    );
    const edMovableBackground = document.querySelector('.ed-movable-background');
    const poFullElement = document.getElementById('poFull');
    const headerElement = document.querySelector('.header_wrap');

    const targetSectionsForEdBackground = ['work_section', 'ed_design'];

    const headerHeight = headerElement
        ? headerElement.offsetHeight
        : 0;

    function syncEdBackgroundPosition(destinationIndex) {
        if (!edBackgroundContainer || !edMovableBackground) 
            return;
        const edSectionsIndices = [3, 4]; // <<< 이 배열의 숫자를 네 HTML에 맞게 정확히 수정해줘!

        const edFirstSectionIndex = edSectionsIndices[0]; // work_section의 인덱스
        const edLastSectionIndex = edSectionsIndices[edSectionsIndices.length - 1]; // ed_design의 인덱스

        // 현재 섹션이 work_section 또는 ed_design 중 하나인지 확인
        if (edSectionsIndices.includes(destinationIndex)) {
            // edBackgroundContainer 보이게 처리
            edBackgroundContainer.style.opacity = '1';
            edBackgroundContainer.style.visibility = 'visible';

            if (destinationIndex === edFirstSectionIndex) {
                // work_section일 때는 배경 이미지가 들어있는 div를 최상단 (0px)으로 위치
                edMovableBackground.style.transform = 'translateY(0)';
            } else if (destinationIndex === edLastSectionIndex) {
                // ed_design일 때는 배경 이미지가 들어있는 div를 위로 100vh만큼 올려서 아래쪽 절반이 보이게
                edMovableBackground.style.transform = 'translateY(-100vh)';
            } else {
                // 혹시 모를 상황 대비 (사실 여기까지 오면 안 됨)
                edMovableBackground.style.transform = 'translateY(0)';
            }
        } else {
            // 이 섹션들이 아니면 edBackgroundContainer를 완전히 숨김
            edBackgroundContainer.style.opacity = '0';
            edBackgroundContainer.style.visibility = 'hidden';
            // 배경 div의 위치도 초기화하거나 숨겨두는 게 좋을 수 있음 (옵션) edMovableBackground.style.transform =
            // 'translateY(0)';
        }
    }

    // --- fullpage.js 초기화 ---
    if (poFullElement) {
        new fullpage('#poFull', {
            licenseKey: 'YOUR_LICENSE_KEY_HERE', // 발급받은 키가 없다면 이 줄을 주석 처리 (없어도 작동은 하지만 경고 뜸)
            autoScrolling: true,
            scrollHorizontally: false,
            scrollingSpeed: 700,

            // 페이지가 처음 로드될 때 실행되는 부분
            afterRender: function () {
                const firstSectionElement = poFullElement.querySelector('.fp-section.active');
                if (!firstSectionElement) {
                    console.warn("경고: 첫 번째 활성화된 fullpage 섹션을 찾을 수 없습니다.");
                    return;
                }
                const firstSectionClasses = firstSectionElement.classList;
                const currentSectionIndex = parseInt(firstSectionElement.dataset.fpIndex); // 현재 섹션의 인덱스 (0부터 시작)

                // --- 1. edBackgroundContainer 처리 ---
                if (edBackgroundContainer) {
                    if (targetSectionsForEdBackground.some(cls => firstSectionClasses.contains(cls))) {
                        edBackgroundContainer.style.opacity = '1';
                        edBackgroundContainer.style.visibility = 'visible';
                    } else {
                        edBackgroundContainer.style.opacity = '0';
                        edBackgroundContainer.style.visibility = 'hidden';
                    }
                    // 첫 로드 시에도 배경 위치를 정확히 맞추기 위해 호출
                    syncEdBackgroundPosition(currentSectionIndex);
                } else {
                    console.warn("경고: 'ed-background-container' 요소를 찾을 수 없습니다. (afterRender)");
                }

                // --- 2. fullpageBgContainer 처리 (처음 두 섹션(index 0, 1)에서만 보이게) ---
                if (fullpageBgContainer) {
                    // 현재 섹션이 첫 번째 (index 0) 또는 두 번째 (index 1)일 때만 fullpageBgContainer를 보임
                    if (currentSectionIndex === 0 || currentSectionIndex === 1) {
                        // poFullElement의 현재 transform 값을 배경에도 적용하여 움직임 동기화
                        fullpageBgContainer.style.transform = poFullElement.style.transform || 'none';
                        fullpageBgContainer.style.opacity = '1';
                        fullpageBgContainer.style.visibility = 'visible';
                    } else {
                        fullpageBgContainer.style.opacity = '0';
                        fullpageBgContainer.style.visibility = 'hidden';
                    }
                } else {
                    console.warn(
                        "경고: 'fullpage-container-background' 요소를 찾을 수 없습니다. (afterRender)"
                    );
                }
            },

            // 섹션이 완전히 로드된 후에 실행되는 부분 (스크롤할 때)
            afterLoad: function (origin, destination, direction) {
                const currentSectionClasses = destination.item.classList;
                const currentSectionIndex = destination.index; // 현재 목적지 섹션의 인덱스 (0부터 시작)

                // --- 1. edBackgroundContainer 처리 ---
                if (edBackgroundContainer) {
                    if (targetSectionsForEdBackground.some(cls => currentSectionClasses.contains(cls))) {
                        edBackgroundContainer.style.opacity = '1';
                        edBackgroundContainer.style.visibility = 'visible';
                    } else {
                        edBackgroundContainer.style.opacity = '0';
                        edBackgroundContainer.style.visibility = 'hidden';
                    }
                    syncEdBackgroundPosition(currentSectionIndex); // 섹션 이동 시 배경 위치 동기화
                } else {
                    console.warn("경고: 'ed-background-container' 요소를 찾을 수 없습니다. (afterLoad)");
                }

                // --- 2. fullpageBgContainer 처리 (처음 두 섹션(index 0, 1)에서만 보이게) ---
                if (fullpageBgContainer) {
                    if (currentSectionIndex === 0 || currentSectionIndex === 1) {
                        fullpageBgContainer.style.transform = poFullElement.style.transform || 'none';
                        fullpageBgContainer.style.opacity = '1';
                        fullpageBgContainer.style.visibility = 'visible';
                    } else {
                        fullpageBgContainer.style.opacity = '0';
                        fullpageBgContainer.style.visibility = 'hidden';
                    }
                } else {
                    console.warn("경고: 'fullpage-container-background' 요소를 찾을 수 없습니다. (afterLoad)");
                }
            },

            // ⭐ 핵심: 섹션을 떠날 때 onLeave에서 배경을 움직여 부드러움을 극대화! ⭐
            onLeave: function (origin, destination, direction) {
                if (origin.index === 3) { // 만약 work_section이 3번 인덱스라면
                    const workItems = document.querySelectorAll('.work_section .fade-up-item');
                    workItems.forEach((el) => el.classList.remove('is-visible'));
                }

                // ⭐ onLeave 시 목적지 섹션 인덱스에 따라 배경 위치를 업데이트! ⭐
                syncEdBackgroundPosition(destination.index);
            },

            onResize: function () {
                if (!edBackgroundContainer) 
                    return;
                const currentActiveSection = poFullElement.querySelector('.fp-section.active');
                if (currentActiveSection && targetSectionsForEdBackground.some(cls => currentActiveSection.classList.contains(cls))) {
                    syncEdBackgroundPosition(parseInt(currentActiveSection.dataset.fpIndex));
                }
            }
        }); // fullpage.js 초기화 끝
    }

    // --- 아래는 네 Gist에 있던 다른 JavaScript 로직들이야! --- (여기부터는 기존 코드와 동일하며, 배경 제어 로직과는 관계
    // 없어.)

    const totalSeconds = 174;
    let currentSeconds = 0;
    let timer = null;

    const PLAY_ICON_PATH = 'img/play.svg';
    const PAUSE_ICON_PATH = 'img/stop.svg';

    const fill = document.querySelector('.progress-bar-fill');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const togglePlayButton = document.getElementById('toggle-play');
    const playPauseIcon = document.getElementById('play-pause-icon');

    if (!playPauseIcon) {
        console.warn(
            "경고: 'play-pause-icon' ID를 가진 이미지 요소를 찾을 수 없습니다. 버튼 텍스트 모드로 작동합니다."
        );
        if (togglePlayButton) 
            togglePlayButton.textContent = '정지';
        }
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs
            .toString()
            .padStart(2, '0')}`;
    }

    function startPlaying() {
        if (!timer && currentSeconds < totalSeconds) {
            timer = setInterval(updateProgress, 1000);
            if (playPauseIcon) {
                playPauseIcon.src = PAUSE_ICON_PATH;
                playPauseIcon.alt = '정지';
            } else if (togglePlayButton) {
                togglePlayButton.textContent = '정지';
            }
        }
    }

    function stopPlaying() {
        if (timer) {
            clearInterval(timer);
            timer = null;
            if (playPauseIcon) {
                playPauseIcon.src = PLAY_ICON_PATH;
                playPauseIcon.alt = '재생';
            } else if (togglePlayButton) {
                togglePlayButton.textContent = '재생';
            }
        }
    }

    function updateProgress() {
        if (currentSeconds >= totalSeconds) {
            stopPlaying();
            currentSeconds = totalSeconds;
            if (fill) 
                fill.style.width = '100%';
            if (currentTimeEl) 
                currentTimeEl.textContent = formatTime(totalSeconds);
            if (totalTimeEl) 
                totalTimeEl.textContent = '-0:00';
            return;
        }

        const percent = (currentSeconds / totalSeconds) * 100;
        if (fill) 
            fill.style.width = percent + '%';
        if (currentTimeEl) 
            currentTimeEl.textContent = formatTime(currentSeconds);
        if (totalTimeEl) 
            totalTimeEl.textContent = '-' + formatTime(totalSeconds - currentSeconds);
        currentSeconds++;
    }

    function initializePlayer() {
        currentSeconds = 0;
        if (fill) 
            fill.style.width = '0%';
        if (currentTimeEl) 
            currentTimeEl.textContent = '0:00';
        if (totalTimeEl) 
            totalTimeEl.textContent = '-' + formatTime(totalSeconds);
        stopPlaying();
        if (playPauseIcon) {
            playPauseIcon.src = PLAY_ICON_PATH;
            playPauseIcon.alt = '재생';
        } else if (togglePlayButton) {
            togglePlayButton.textContent = '재생';
        }
    }

    if (togglePlayButton) {
        togglePlayButton.addEventListener('click', () => {
            if (timer) {
                stopPlaying();
            } else {
                startPlaying();
            }
        });
    }

    initializePlayer();
    startPlaying();

    const diamondPath = document.querySelector('.diamond-path');

    if (diamondPath) {
        const diamondPathLength = diamondPath.getTotalLength();
        console.log('Path 총 길이:', diamondPathLength);

        if (diamondPathLength === 0) {
            console.error("다이아몬드 Path 길이가 0입니다. 브라우저 콘솔을 확인해주세요.");
        } else {
            diamondPath.style.strokeDasharray = diamondPathLength;
            diamondPath.style.strokeDashoffset = diamondPathLength;

            setTimeout(() => {
                diamondPath.style.animation = `drawDiamond 3s ease-out forwards`;
                console.log("다이아몬드 & 가로선 애니메이션 동시 시작");
            }, 1000);
        }
    } else {
        console.warn("경고: '.diamond-path' 요소를 찾을 수 없습니다. 다이아몬드 애니메이션을 시작할 수 없습니다.");
    }

    const listItems = document.querySelectorAll('.list-item');
    const highlight = document.querySelector('.highlight');
    let activeItem = null;

    const menuWrapper = document.querySelector('.liquidGlass-wrapper.menu');

    function updateHighlight(item, isVisible = false) {
        if (!item || !highlight) {
            if (highlight) 
                highlight.style.opacity = '0';
            return;
        }
        const rect = item.getBoundingClientRect();
        const containerRect = item
            .parentElement
            .getBoundingClientRect();

        highlight.style.width = `${rect.width}px`;
        highlight.style.left = `${rect.left - containerRect.left}px`;
        highlight.style.opacity = isVisible
            ? '1'
            : '0';
    }

    function handleItemClick(e) {
        const clickedItem = e
            .target
            .closest('.list-item');
        if (!clickedItem) 
            return;
        
        if (activeItem) {
            activeItem
                .classList
                .remove('active');
        }

        clickedItem
            .classList
            .add('active');
        activeItem = clickedItem;

        updateHighlight(clickedItem, true);
    }

    function handleItemHover(e) {
        const hoveredItem = e
            .target
            .closest('.list-item');
        if (!hoveredItem) 
            return;
        
        if (activeItem !== hoveredItem) {
            updateHighlight(hoveredItem, true);
        }
    }

    function handleItemLeave(e) {
        const leftItem = e
            .target
            .closest('.list-item');
        if (!leftItem) 
            return;
        
        if (activeItem === leftItem) {} else {

            updateHighlight(null, false);
        }
    }

    listItems.forEach(item => {
        item.addEventListener('click', handleItemClick);
        item.addEventListener('mouseenter', handleItemHover);
        item.addEventListener('mouseleave', handleItemLeave);
    });

    if (menuWrapper) {
        menuWrapper.addEventListener('mouseleave', () => {
            if (activeItem) {

                activeItem
                    .classList
                    .remove('active');
                activeItem = null;
            }
            if (highlight) 
                highlight.style.opacity = '0';
            }
        );
    } else {
        console.warn(
            "경고: '.liquidGlass-wrapper.menu' 요소를 찾을 수 없습니다. highlight 기능이 올바르게 작동하지 않을 수 있습" +
            "니다."
        );
    }
    // Fade-up 애니메이션 로직
    const workContent = document.querySelector('.work_content');
    const fadeUpElements = workContent
        ? workContent.querySelectorAll('.fade-up-item')
        : [];

    if (!workContent) {
        console.warn(".work_content 요소를 찾을 수 없습니다. Fade-up 애니메이션이 동작하지 않습니다.");
    } else {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let delay = 0;
                    fadeUpElements.forEach(item => {
                        item
                            .classList
                            .remove('is-visible');
                        void item.offsetWidth; // reflow를 강제하여 애니메이션 재시작
                        setTimeout(() => {
                            item
                                .classList
                                .add('is-visible');
                        }, delay);
                        delay += 250;
                    });
                } else {
                    fadeUpElements.forEach(item => {
                        item
                            .classList
                            .remove('is-visible');
                    });
                }
            });
        }, observerOptions);

        observer.observe(workContent);
    }
});