// player.js 파일 내용
(() => {
  document.addEventListener('DOMContentLoaded', () => {
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
    const resetButton = document.getElementById('reset-button');

    if (!playPauseIcon) {
        console.warn("경고: 'play-pause-icon' ID를 가진 이미지 요소를 찾을 수 없습니다. 버튼 텍스트 모드로 작동합니다.");
        if (togglePlayButton) togglePlayButton.textContent = '정지';
    }

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
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
        fill.style.width = '100%';
        currentTimeEl.textContent = formatTime(totalSeconds);
        totalTimeEl.textContent = '-0:00';
        return;
      }

      const percent = (currentSeconds / totalSeconds) * 100;
      fill.style.width = percent + '%';
      currentTimeEl.textContent = formatTime(currentSeconds);
      totalTimeEl.textContent = '-' + formatTime(totalSeconds - currentSeconds);
      currentSeconds++;
    }

    function initializePlayer() {
      currentSeconds = 0;
      fill.style.width = '0%';
      currentTimeEl.textContent = '0:00';
      totalTimeEl.textContent = '-' + formatTime(totalSeconds);
      stopPlaying();
      if (playPauseIcon) {
          playPauseIcon.src = PAUSE_ICON_PATH;
          playPauseIcon.alt = '정지';
      } else if (togglePlayButton) {
          togglePlayButton.textContent = '정지';
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

    if (resetButton) {
      resetButton.addEventListener('click', () => {
        initializePlayer();
        startPlaying();
      });
    }

    initializePlayer();
    startPlaying();
  });
})();



document.addEventListener('DOMContentLoaded', () => {
    const diamondPath = document.querySelector('.diamond-path');
    
    const diamondPathLength = diamondPath.getTotalLength(); 
    
    console.log('Path 총 길이:', diamondPathLength);

    if (diamondPathLength === 0) {
        console.error("다이아몬드 Path 길이가 0입니다. 브라우저 콘솔을 확인해주세요.");
        return;
    }

    diamondPath.style.strokeDasharray = diamondPathLength;
    diamondPath.style.strokeDashoffset = diamondPathLength;

    setTimeout(() => {
        diamondPath.style.animation = `drawDiamond 3s ease-out forwards`; 
        console.log("다이아몬드 & 가로선 애니메이션 동시 시작");
    }, 1000);

    // const scrollContainer = document.documentElement;
    // const sections = document.querySelectorAll('.main_wrap, .content_wrap');
    // let currentSectionIndex = 0;
    // let isScrolling = false;

    // scrollContainer.scrollTo({ top: 0, behavior: 'auto' });

    // window.addEventListener('wheel', (e) => {
    //     //e.preventDefault();

    //     if (isScrolling) return;

    //     const direction = e.deltaY > 0 ? 1 : -1;
    //     let targetSectionIndex = currentSectionIndex;

    //     const wheelThreshold = 10;

    //     if (Math.abs(e.deltaY) > wheelThreshold) {
    //         targetSectionIndex += direction;
    //     } else {
    //         return;
    //     }

    //     if (targetSectionIndex >= 0 && targetSectionIndex < sections.length) {
    //         isScrolling = true;
    //         currentSectionIndex = targetSectionIndex;
    //         const targetScrollTop = sections[currentSectionIndex].offsetTop;

    //         scrollContainer.scrollTo({
    //             top: targetScrollTop,
    //             behavior: 'smooth'
    //         });

    //         setTimeout(() => {
    //             isScrolling = false;
    //         }, 1200);
    //     }
    // }, { passive: false });
});
        const listItems = document.querySelectorAll('.list-item');
        const highlight = document.querySelector('.highlight');
        let activeItem = null;

        function updateHighlight(item, isVisible = false) {
            if (!item) {
                highlight.style.opacity = '0';
                return;
            }
            const rect = item.getBoundingClientRect();
            const containerRect = item.parentElement.getBoundingClientRect();

            highlight.style.width = `${rect.width}px`;
            highlight.style.left = `${rect.left - containerRect.left}px`;
            highlight.style.opacity = isVisible ? '1' : '0';
        }

        function handleItemClick(e) {
            const clickedItem = e.target;
            
            if (activeItem) {
                activeItem.classList.remove('active');
            }
            
            clickedItem.classList.add('active');
            activeItem = clickedItem;
            
            updateHighlight(clickedItem, true);
        }

        function handleItemHover(e) {
            const hoveredItem = e.target;
            
            if (activeItem !== hoveredItem) {
                updateHighlight(hoveredItem, true);
            }
        }

        function handleItemLeave(e) {
            if (activeItem === e.target) {
            } else {
                updateHighlight(null, false);
            }
        }

        listItems.forEach(item => {
            item.addEventListener('click', handleItemClick);
            item.addEventListener('mouseenter', handleItemHover);
            item.addEventListener('mouseleave', handleItemLeave);
        });

        document.querySelector('.list-container').addEventListener('mouseleave', () => {
            if (activeItem) {
                activeItem.classList.remove('active');
                activeItem = null;
            }
            highlight.style.opacity = '0';
        });

        updateHighlight(null, false);

new fullpage('#poFull', {
	//options here
	autoScrolling:true,
	scrollHorizontally: true
});
