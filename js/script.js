document.addEventListener('DOMContentLoaded', function () {

    const fullpageBgContainer = document.getElementById(
        'fullpage-container-background'
    );
    const edBackgroundContainer = document.getElementById(
        'ed-background-container'
    );
    const poFullElement = document.getElementById('poFull');
    const headerElement = document.querySelector('.header_wrap');
    const targetSectionsForEdBackground = ['ed_design', 'second_ed']; // 'ed_design'과 'second_ed' 섹션들

    const headerHeight = headerElement
        ? headerElement.offsetHeight
        : 0;

    const totalBackgroundImageHeight = 2049;

    const numberOfSharedSections = 5;

    // ⭐⭐ 중요: syncEdBackgroundPosition 함수는 네 Gist 파일에는 정의되어 있지 않지만,
    // 이 코드에서는 호출됩니다. 네 프로젝트에 이 함수가 제대로 정의되어 있는지 확인해주세요!
    // 이 함수는 edBackgroundContainer의 위치만 동기화하고, opacity나 visibility를 직접 건드리면 안 됩니다.
    // 만약 이 함수가 없다면 아래와 같이 최소한의 더미 함수를 넣어두지만,
    // 실제로는 edBackgroundContainer가 잘 움직이도록 네 프로젝트에 맞게 구현되어야 합니다.
    function syncEdBackgroundPosition() {
        // 네 프로젝트의 실제 syncEdBackgroundPosition 함수 로직을 여기에 넣어주세요.
        // 예: edBackgroundContainer.style.transform = `translateY(${계산된_값}px)`;
        // 이 함수가 edBackgroundContainer의 opacity나 visibility를 변경하면 안 됩니다!
        // console.log("syncEdBackgroundPosition 함수 호출됨 (Placeholder - 실제 구현 필요)");
    }


    if (poFullElement) {
        new fullpage('#poFull', {
            licenseKey: 'YOUR_LICENSE_KEY_HERE', // 발급받은 키 (없으면 주석 처리)
            autoScrolling: true,
            scrollHorizontally: false,
            scrollingSpeed: 700,

            // 👇👇👇 afterRender 함수 수정 부분 👇👇👇
            // 페이지가 처음 로드될 때 배경 요소들의 초기 상태를 설정합니다.
            afterRender: function() {
                const firstSectionElement = poFullElement.querySelector('.fp-section.active');
                if (!firstSectionElement) {
                    console.warn("경고: 첫 번째 활성화된 fullpage 섹션을 찾을 수 없습니다.");
                    return;
                }
                const firstSectionClasses = firstSectionElement.classList;
                // fullpage.js의 데이터 속성에서 0부터 시작하는 인덱스를 가져옵니다.
                const currentSectionIndex = parseInt(firstSectionElement.dataset.fpIndex); 


                // --- 1. edBackgroundContainer 처리 ---
                if (edBackgroundContainer) {
                    // 현재 섹션이 'ed_design' 또는 'second_ed'에 해당하면
                    if (targetSectionsForEdBackground.some(cls => firstSectionClasses.contains(cls))) {
                        edBackgroundContainer.style.opacity = '1';
                        edBackgroundContainer.style.visibility = 'visible'; // ⭐ display 대신 visibility 사용
                    } else {
                        // 해당 섹션이 아니면 edBackgroundContainer를 숨김
                        edBackgroundContainer.style.opacity = '0';
                        edBackgroundContainer.style.visibility = 'hidden';  // ⭐ display 대신 visibility 사용
                    }
                    syncEdBackgroundPosition(); // edBackgroundContainer의 위치 동기화
                } else {
                    console.warn("경고: 'ed-background-container' 요소를 찾을 수 없습니다. (afterRender)");
                }

                // --- 2. fullpageBgContainer 처리 ---
                if (fullpageBgContainer) {
                    // 첫 번째 섹션 (index 0) 또는 두 번째 섹션 (index 1) 일 때만 fullpageBgContainer를 보이게 합니다.
                    if (currentSectionIndex === 0 || currentSectionIndex === 1) {
                        // ⭐ 여기에 transform 초기값 설정!
                        fullpageBgContainer.style.transform = poFullElement.style.transform; 
                        fullpageBgContainer.style.opacity = '1';
                        fullpageBgContainer.style.visibility = 'visible'; // ⭐ display 대신 visibility 사용
                    } else {
                        fullpageBgContainer.style.opacity = '0';
                        fullpageBgContainer.style.visibility = 'hidden';  // ⭐ display 대신 visibility 사용
                    }
                } else {
                    console.warn("경고: 'fullpage-container-background' 요소를 찾을 수 없습니다. (afterRender)");
                }
            },
            // 👆👆👆 afterRender 함수 수정 끝 👆👆👆

            // 👇👇👇 afterLoad 함수 수정 부분 👇👇👇
            // 섹션이 완전히 로드된 후에 배경 요소들의 상태를 업데이트합니다.
            afterLoad: function (origin, destination, direction) {
                const currentSectionClasses = destination.item.classList;
                const currentSectionIndex = destination.index; // 현재 섹션의 0부터 시작하는 인덱스

                // --- 1. edBackgroundContainer 처리 ---
                if (edBackgroundContainer) {
                    // 현재 섹션이 'ed_design' 또는 'second_ed'에 해당하면
                    if (targetSectionsForEdBackground.some(cls => currentSectionClasses.contains(cls))) {
                        edBackgroundContainer.style.opacity = '1';
                        edBackgroundContainer.style.visibility = 'visible'; // ⭐ display 대신 visibility 사용
                    } else {
                        // 해당 섹션이 아니면 edBackgroundContainer를 숨김
                        edBackgroundContainer.style.opacity = '0';
                        edBackgroundContainer.style.visibility = 'hidden';  // ⭐ display 대신 visibility 사용
                    }
                    syncEdBackgroundPosition(); // edBackgroundContainer의 위치 동기화
                } else {
                    console.warn("경고: 'ed-background-container' 요소를 찾을 수 없습니다. (afterLoad)");
                }

                // --- 2. fullpageBgContainer 처리 ---
                if (fullpageBgContainer) {
                    // 첫 번째 섹션 (index 0) 또는 두 번째 섹션 (index 1) 일 때만 fullpageBgContainer를 보이게 합니다.
                    if (currentSectionIndex === 0 || currentSectionIndex === 1) {
                        const poFullTransform = poFullElement.style.transform; // poFullElement의 transform 값 가져오기
                        fullpageBgContainer.style.transform = poFullTransform; // 배경에 동일하게 transform 적용 (움직임 동기화)
                        fullpageBgContainer.style.opacity = '1';
                        fullpageBgContainer.style.visibility = 'visible'; // ⭐ display 대신 visibility 사용
                    } else {
                        fullpageBgContainer.style.opacity = '0';
                        fullpageBgContainer.style.visibility = 'hidden';  // ⭐ display 대신 visibility 사용
                    }
                } else {
                    console.warn("경고: 'fullpage-container-background' 요소를 찾을 수 없습니다. (afterLoad)");
                }
            },
            // 👆👆👆 afterLoad 함수 수정 끝 👆👆👆

            onResize: function() {
                // onResize에서는 edBackgroundContainer만 동기화하는 기존 로직 유지
                if (!edBackgroundContainer) return;
                const currentActiveSection = poFullElement.querySelector('.fp-section.active');
                if (currentActiveSection && targetSectionsForEdBackground.some(cls => currentActiveSection.classList.contains(cls))) {
                    syncEdBackgroundPosition();
                }
                // fullpageBgContainer는 리사이즈 시 별도의 위치 조정이 필요 없다고 가정합니다.
                // 만약 fullpageBgContainer도 리사이즈 시 특별한 처리가 필요하면 여기에 추가해주세요.
            },

            onLeave: function (origin, destination, direction) {
                if (origin.index === 3) {
                    const workItems = document.querySelectorAll('.work_section .fade-up-item');
                    workItems.forEach((el) => el.classList.remove('is-visible'));
                }
            }
        }); // fullpage.js 초기화 끝
    }

    // ⭐⭐ 주의: 위 fullpage.js 초기화 코드 외에 다른 모든 JavaScript 로직은
    // 네 Gist 파일에서 가져온 원래 코드입니다. 이 부분은 수정하지 않았습니다.
    // Gist의 나머지 코드를 아래에 그대로 붙여넣습니다.

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
        });
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