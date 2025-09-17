
        // DOM elements
        const display = document.getElementById('display');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');
        const lapBtn = document.getElementById('lapBtn');
        const lapsContainer = document.getElementById('laps');

        // Variables
        let startTime = 0;
        let elapsedTime = 0;
        let timerInterval = null;
        let isRunning = false;
        let lapCount = 1;

        // Format time function
        function formatTime(milliseconds) {
            const ms = Math.floor((milliseconds % 1000) / 10);
            const seconds = Math.floor((milliseconds / 1000) % 60);
            const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
            const hours = Math.floor(milliseconds / (1000 * 60 * 60));

            return (
                (hours ? (hours < 10 ? "0" + hours : hours) + ":" : "") +
                (minutes < 10 ? "0" + minutes : minutes) + ":" +
                (seconds < 10 ? "0" + seconds : seconds) + "." +
                (ms < 10 ? "0" + ms : ms)
            );
        }

        // Start function
        function start() {
            if (!isRunning) {
                startTime = Date.now() - elapsedTime;
                timerInterval = setInterval(() => {
                    elapsedTime = Date.now() - startTime;
                    display.textContent = formatTime(elapsedTime);
                    
                    // Add running animation
                    display.classList.add('running');
                }, 10);
                isRunning = true;
                
                // Enable/disable buttons
                lapBtn.disabled = false;
                startBtn.disabled = true;
            }
        }

        // Pause function
        function pause() {
            if (isRunning) {
                clearInterval(timerInterval);
                isRunning = false;
                
                // Remove running animation
                display.classList.remove('running');
                
                // Enable/disable buttons
                startBtn.disabled = false;
            }
        }

        // Reset function
        function reset() {
            clearInterval(timerInterval);
            isRunning = false;
            elapsedTime = 0;
            display.textContent = "00:00:00";
            lapCount = 1;
            
            // Remove running animation
            display.classList.remove('running');
            
            // Clear laps
            lapsContainer.innerHTML = '';
            
            // Enable/disable buttons
            startBtn.disabled = false;
            lapBtn.disabled = true;
        }

        // Lap function
        function lap() {
            if (isRunning) {
                const lapTime = document.createElement('div');
                lapTime.classList.add('lap-item');
                
                const currentLapTime = formatTime(elapsedTime);
                
                lapTime.innerHTML = `
                    <span class="lap-number">Lap ${lapCount}</span>
                    <span class="lap-time">${currentLapTime}</span>
                `;
                
                // Add animation
                lapTime.style.animation = 'fadeIn 0.5s ease';
                
                // Add to container
                lapsContainer.appendChild(lapTime);
                
                // Scroll to the latest lap
                lapsContainer.scrollTop = lapsContainer.scrollHeight;
                
                // Increment lap count
                lapCount++;
                
                // Add pulse animation to display
                display.classList.add('pulse');
                setTimeout(() => {
                    display.classList.remove('pulse');
                }, 1000);
            }
        }

        // Event listeners
        startBtn.addEventListener('click', start);
        pauseBtn.addEventListener('click', pause);
        resetBtn.addEventListener('click', reset);
        lapBtn.addEventListener('click', lap);

        // Initialize
        reset();