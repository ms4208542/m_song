
document.addEventListener('DOMContentLoaded', function() {
    
   
    const fullpageBgContainer = document.getElementById('fullpage-container-background'); 
    const poFullElement = document.getElementById('poFull'); 
    const headerElement = document.querySelector('.header_wrap');
    const headerHeight = headerElement ? headerElement.offsetHeight : 0; 
    
    const totalBackgroundImageHeight = 2049; 

    const numberOfSharedSections = 5; 


  
    if (poFullElement) { 
        new fullpage('#poFull', {
           autoScrolling: true,
        scrollHorizontally: false, 
        scrollingSpeed: 700, 

         afterLoad: function(origin, destination, direction) {

            if (!fullpageBgContainer) {
                console.error("Fullpage.js 배경 동기화에 필요한 요소(fullpageBgContainer)를 찾을 수 없습니다.");
                return;
            }
            const sectionIndex = destination.index;
            if (sectionIndex < numberOfSharedSections) {
                const poFullTransform = poFullElement.style.transform;
                fullpageBgContainer.style.transform = poFullTransform;
                fullpageBgContainer.style.opacity = '1';
            } else {
                fullpageBgContainer.style.opacity = '0';
            }
        }, 

        onLeave: function(origin, destination, direction) {
            if (origin.index === 3) { 
                $('.work_section .fade-up-item').removeClass('is-visible');
            }
        } 
   
    });
    } else {
        console.error("Fullpage.js 초기화에 필요한 #poFull 요소를 찾을 수 없습니다. Fullpage.js가 작동하지 않습니다.");
    }


  
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
            if (fill) fill.style.width = '100%';
            if (currentTimeEl) currentTimeEl.textContent = formatTime(totalSeconds);
            if (totalTimeEl) totalTimeEl.textContent = '-0:00';
            return;
        }

        const percent = (currentSeconds / totalSeconds) * 100;
        if (fill) fill.style.width = percent + '%';
        if (currentTimeEl) currentTimeEl.textContent = formatTime(currentSeconds);
        if (totalTimeEl) totalTimeEl.textContent = '-' + formatTime(totalSeconds - currentSeconds);
        currentSeconds++;
    }

    function initializePlayer() {
        currentSeconds = 0;
        if (fill) fill.style.width = '0%';
        if (currentTimeEl) currentTimeEl.textContent = '0:00';
        if (totalTimeEl) totalTimeEl.textContent = '-' + formatTime(totalSeconds);
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
            if (highlight) highlight.style.opacity = '0';
            return;
        }
        const rect = item.getBoundingClientRect();
        const containerRect = item.parentElement.getBoundingClientRect(); 
        
        highlight.style.width = `${rect.width}px`;
        highlight.style.left = `${rect.left - containerRect.left}px`;
        highlight.style.opacity = isVisible ? '1' : '0';
    }

    function handleItemClick(e) {
        const clickedItem = e.target.closest('.list-item'); 
        if (!clickedItem) return;

        if (activeItem) {
            activeItem.classList.remove('active');
        }
        
        clickedItem.classList.add('active');
        activeItem = clickedItem;
        
        updateHighlight(clickedItem, true);
    }

    function handleItemHover(e) {
        const hoveredItem = e.target.closest('.list-item');
        if (!hoveredItem) return;

        if (activeItem !== hoveredItem) {
            updateHighlight(hoveredItem, true);
        }
    }

    function handleItemLeave(e) {
        const leftItem = e.target.closest('.list-item');
        if (!leftItem) return;

        if (activeItem === leftItem) {
        } else {
       
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
              
              activeItem.classList.remove('active');
              activeItem = null;
          }
          if (highlight) highlight.style.opacity = '0';
      });
    } else {
        console.warn("경고: '.liquidGlass-wrapper.menu' 요소를 찾을 수 없습니다. highlight 기능이 올바르게 작동하지 않을 수 있습니다.");
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const workContent = document.querySelector('.work_content');
    const fadeUpElements = workContent ? workContent.querySelectorAll('.fade-up-item') : [];

    if (!workContent) {
        console.warn(".work_content 요소를 찾을 수 없습니다. Fade-up 애니메이션이 동작하지 않습니다.");
        return;
    }

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
                    item.classList.remove('is-visible');
                    void item.offsetWidth;
                    
                    setTimeout(() => {
                        item.classList.add('is-visible');
                    }, delay);
                    delay += 250;
                });
            } else {
                fadeUpElements.forEach(item => {
                    item.classList.remove('is-visible');
                });
            }
        });
    }, observerOptions);

    observer.observe(workContent);
});