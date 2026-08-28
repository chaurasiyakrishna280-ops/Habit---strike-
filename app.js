const habits = [
    {
        name: "Wake Up",
        icon: "🌅",
        time: "06:00 AM",
        xp: 50
    },
    {
        name: "Exercise",
        icon: "🏃",
        time: "06:30 AM",
        xp: 100
    },
    {
        name: "Computer Skills",
        icon: "💻",
        time: "09:00 AM",
        xp: 100
    },
    {
        name: "Study",
        icon: "📚",
        time: "11:00 AM",
        xp: 150
    },
    {
        name: "Book Reading",
        icon: "📖",
        time: "08:00 PM",
        xp: 100
    },
    {
        name: "Communication",
        icon: "🗣️",
        time: "09:00 PM",
        xp: 100
    }
];

/* =========================
   DAILY SYSTEM
========================= */

function getTodayKey() {
    const now = new Date();

    return (
        now.getFullYear() +
        "-" +
        String(now.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(now.getDate()).padStart(2, "0")
    );
}

const todayKey = getTodayKey();

const savedDate =
    localStorage.getItem("habitDate");


/* New day = fresh missions */

if (savedDate !== todayKey) {

    localStorage.setItem(
        "habitDate",
        todayKey
    );

    localStorage.setItem(
        "completedHabits",
        JSON.stringify([])
    );
}


let completed =
    JSON.parse(
        localStorage.getItem("completedHabits")
    ) || [];


let streak =
    Number(
        localStorage.getItem("streak")
    ) || 0;


/* =========================
   HABITS
========================= */

function renderHabits() {

    const list =
        document.getElementById("habitList");

    if (!list) return;

    list.innerHTML = "";

    habits.forEach((habit, index) => {

        const isCompleted =
            completed.includes(index);

        const card =
            document.createElement("div");

        card.className = "habit";

        if (isCompleted) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <div class="habit-icon">
                ${habit.icon}
            </div>

            <div class="habit-info">

                <div class="habit-name">
                    ${habit.name}
                </div>

                <div class="habit-time">
                    ${habit.time} • +${habit.xp} XP
                </div>

            </div>

            <button onclick="startMission(${index})">
                ${isCompleted ? "✓ DONE" : "START"}
            </button>
        `;

        list.appendChild(card);
    });

    updateStats();
}


function toggleHabit(index) {

    if (completed.includes(index)) {

        completed =
            completed.filter(
                item => item !== index
            );

    } else {

        completed.push(index);

        showAIMessage(
            `Excellent! ${habits[index].name} completed. You earned ${habits[index].xp} XP. ⚡`
        );
    }

    localStorage.setItem(
        "completedHabits",
        JSON.stringify(completed)
    );

    renderHabits();
}


/* =========================
   XP + STATS
========================= */

function updateStats() {

    let xp = 0;

    completed.forEach(index => {

        xp += habits[index].xp;

    });

    const xpElement =
        document.getElementById("xp");

    const streakElement =
        document.getElementById("streak");

    const levelElement =
        document.getElementById("level");

    const progressText =
        document.getElementById("progressText");

    const progressBar =
        document.getElementById("progressBar");


    if (xpElement) {
        xpElement.textContent = xp;
    }

    if (streakElement) {
        streakElement.textContent = streak;
    }

    const level =
        Math.floor(xp / 500) + 1;

    if (levelElement) {
        levelElement.textContent = level;
    }

    if (progressText) {

        progressText.textContent =
            `${completed.length}/6`;

    }

    if (progressBar) {

        const progress =
            (completed.length / habits.length) * 100;

        progressBar.style.width =
            progress + "%";
    }
}


/* =========================
   AI MOOD
========================= */

function setMood(mood) {

    showAIMessage(
        `Got it. You're feeling ${mood}. I'll keep that in mind today. 🤖`
    );
}


function showAIMessage(message) {

    const messageBox =
        document.getElementById("aiMessage");

    if (messageBox) {

        messageBox.textContent =
            message;
    }
}


/* =========================
   AI VOICE
========================= */

function talkToAI() {

    const message =
        "Hello! I am your Habit Strike AI assistant. I am ready to help you complete today's missions.";

    showAIMessage(message);

    speak(message);
}


/* =========================
   TOMORROW PLANNER
========================= */

function saveTomorrowPlan() {

    const plan = {

        wake:
            document.getElementById(
                "wakeTime"
            ).value,

        exercise:
            document.getElementById(
                "exerciseTime"
            ).value,

        computer:
            document.getElementById(
                "computerTime"
            ).value,

        study:
            document.getElementById(
                "studyTime"
            ).value,

        reading:
            document.getElementById(
                "readingTime"
            ).value,

        communication:
            document.getElementById(
                "communicationTime"
            ).value
    };


    localStorage.setItem(
        "tomorrowPlan",
        JSON.stringify(plan)
    );


    const status =
        document.getElementById(
            "planStatus"
        );


    if (status) {

        status.textContent =
            "✓ Tomorrow's mission saved!";

    }


    showAIMessage(
        "Tomorrow's routine is locked in. I'll remember your missions. 🤖"
    );
}


/* =========================
   LOAD SAVED PLAN
========================= */

function loadTomorrowPlan() {

    const saved =
        JSON.parse(
            localStorage.getItem(
                "tomorrowPlan"
            )
        );


    if (!saved) {
        return;
    }


    const wake =
        document.getElementById(
            "wakeTime"
        );

    const exercise =
        document.getElementById(
            "exerciseTime"
        );

    const computer =
        document.getElementById(
            "computerTime"
        );

    const study =
        document.getElementById(
            "studyTime"
        );

    const reading =
        document.getElementById(
            "readingTime"
        );

    const communication =
        document.getElementById(
            "communicationTime"
        );


    if (wake && saved.wake) {

        wake.value =
            saved.wake;
    }

    if (exercise && saved.exercise) {

        exercise.value =
            saved.exercise;
    }

    if (computer && saved.computer) {

        computer.value =
            saved.computer;
    }

    if (study && saved.study) {

        study.value =
            saved.study;
    }

    if (reading && saved.reading) {

        reading.value =
            saved.reading;
    }

    if (
        communication &&
        saved.communication
    ) {

        communication.value =
            saved.communication;
    }
}


/* =========================
   START APP
========================= */

loadTomorrowPlan();

renderHabits();
/* =========================
   MISSION TIMER ENGINE
========================= */

let selectedDuration = null;

let selectedMissionIndex = null;
let timerInterval = null;
let remainingSeconds = 0;
let audioContext = null;

function chooseDuration(minutes) {

    selectedDuration = minutes;

    const status =
        document.getElementById("timerStatus");

    if (status) {

        status.textContent =
            `${minutes}-minute session selected. Press START.`;
    }

    showAIMessage(
        `Okay. Today's session is ${minutes} minutes.`
    );
}


function chooseCustomDuration() {

    const input =
        document.getElementById("customDuration");

    const minutes =
        Number(input.value);

    if (
        !minutes ||
        minutes < 1 ||
        minutes > 180
    ) {

        showAIMessage(
            "Please choose between 1 and 180 minutes."
        );

        return;
    }

    chooseDuration(minutes);
}
function startMission(index) {

    if (completed.includes(index)) {

        showAIMessage(
            `${habits[index].name} is already completed today. ✅`
        );

        return;
    }

    selectedMissionIndex = index;

    if (!selectedDuration) {

    showAIMessage(
        "Sir, आज इस session को कितनी देर करना है? Duration चुनें."
    );

    return;
}

const duration =
    selectedDuration;

remainingSeconds =
    duration * 60;
    const timerCard =
        document.getElementById("timerCard");

    const timerName =
        document.getElementById("timerHabitName");

    const timerIcon =
        document.getElementById("timerIcon");

    const timerStatus =
        document.getElementById("timerStatus");

    if (timerName) {
        timerName.textContent =
            habits[index].name;
    }

    if (timerIcon) {
        timerIcon.textContent =
            habits[index].icon;
    }

    if (timerStatus) {

        timerStatus.textContent =
            `${duration} minute mission started. Stay focused! 🔥`;
    }

    if (timerCard) {
        timerCard.classList.add("timer-running");
    }

    // Audio permission user ke START tap se milti hai
    prepareAlarm();

    clearInterval(timerInterval);

    updateTimerDisplay();

    timerInterval = setInterval(
        updateTimer,
        1000
    );

    showAIMessage(
        `${habits[index].name} started. I'll tell you when your mission is complete. 🎯`
    );
}


function startSelectedMission() {

    if (selectedMissionIndex === null) {

        showAIMessage(
            "Choose a mission from Today's Missions first. 🎯"
        );

        return;
    }

    startMission(
        selectedMissionIndex
    );
}


function updateTimer() {

    remainingSeconds--;

    updateTimerDisplay();

    if (remainingSeconds <= 0) {

        finishMission();
    }
}


function updateTimerDisplay() {

    const display =
        document.getElementById(
            "timerDisplay"
        );

    if (!display) return;

    const minutes =
        Math.floor(
            remainingSeconds / 60
        );

    const seconds =
        remainingSeconds % 60;

    display.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


function finishMission() {

    clearInterval(timerInterval);

    timerInterval = null;

    const index =
        selectedMissionIndex;

    if (index === null) return;


    // Automatically complete mission
    if (!completed.includes(index)) {

        completed.push(index);

        localStorage.setItem(
            "completedHabits",
            JSON.stringify(completed)
        );
    }


    const timerCard =
        document.getElementById(
            "timerCard"
        );

    const timerStatus =
        document.getElementById(
            "timerStatus"
        );

    if (timerCard) {

        timerCard.classList.remove(
            "timer-running"
        );

        timerCard.classList.add(
            "timer-finished"
        );
    }


    if (timerStatus) {

        timerStatus.textContent =
            "MISSION COMPLETE! 🎉 Great work!";
    }


    updateTimerDisplay();

    playAlarm();

const message =
    `Mission complete! ${habits[index].name} is finished. You earned ${habits[index].xp} XP.`;

showAIMessage(message);

/* Voice */
setTimeout(() => {
    speak(message);
}, 200);

    renderHabits();

    setTimeout(() => {

        if (timerCard) {

            timerCard.classList.remove(
                "timer-finished"
            );
        }

    }, 5000);
}


function stopMission() {

    if (!timerInterval) {

        showAIMessage(
            "No mission is currently running."
        );

        return;
    }

    clearInterval(timerInterval);

    timerInterval = null;

    const timerCard =
        document.getElementById(
            "timerCard"
        );

    const timerStatus =
        document.getElementById(
            "timerStatus"
        );

    if (timerCard) {

        timerCard.classList.remove(
            "timer-running"
        );
    }

    if (timerStatus) {

        timerStatus.textContent =
            "Mission stopped. No XP awarded.";
    }

    showAIMessage(
        "Mission stopped. You can start it again whenever you're ready."
    );
}


function prepareAlarm() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) return;

        if (!audioContext) {

            audioContext =
                new AudioContext();
        }

        if (
            audioContext.state ===
            "suspended"
        ) {

            audioContext.resume();
        }

    } catch (error) {

        console.log(
            "Audio unavailable"
        );
    }
}


function playAlarm() {

    if (!audioContext) {
        prepareAlarm();
    }

    if (!audioContext) return;

    const now =
        audioContext.currentTime;


    for (let i = 0; i < 3; i++) {

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.type = "sine";

        oscillator.frequency.value =
            i % 2 === 0
                ? 880
                : 660;

        gain.gain.setValueAtTime(
            0.001,
            now + i * 0.35
        );

        gain.gain.exponentialRampToValueAtTime(
            0.25,
            now + i * 0.35 + 0.03
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            now + i * 0.35 + 0.25
        );

        oscillator.connect(gain);

        gain.connect(
            audioContext.destination
        );

        oscillator.start(
            now + i * 0.35
        );

        oscillator.stop(
            now + i * 0.35 + 0.3
        );
    }
}
let aiVoice = null;

function loadAIVoice() {

    if (!("speechSynthesis" in window)) {
        return;
    }

    const voices =
        window.speechSynthesis.getVoices();

    if (!voices.length) {
        return;
    }

    aiVoice =
        voices.find(
            voice =>
                voice.lang === "en-US"
        ) ||
        voices.find(
            voice =>
                voice.lang.startsWith("en")
        ) ||
        voices[0];
}

if ("speechSynthesis" in window) {

    loadAIVoice();

    window.speechSynthesis.onvoiceschanged =
        loadAIVoice;
}

function speak(message) {

    if (!("speechSynthesis" in window)) {
        return;
    }

    window.speechSynthesis.cancel();

    if (!aiVoice) {
        loadAIVoice();
    }

    const speech =
        new SpeechSynthesisUtterance(message);

    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    if (aiVoice) {
        speech.voice = aiVoice;
    }

    window.speechSynthesis.speak(speech);
}
/* =========================
   VOICE DURATION
========================= */

let durationRecognition = null;


function listenForDuration() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        showAIMessage(
            "Voice input is not supported here. Please use Chrome."
        );

        return;
    }


    durationRecognition =
        new SpeechRecognition();

    durationRecognition.lang =
        "en-US";

    durationRecognition.continuous =
        false;

    durationRecognition.interimResults =
        false;


    const status =
        document.getElementById(
            "voiceDurationStatus"
        );

    if (status) {

        status.textContent =
            "🎙️ Listening... Tell me today's duration.";
    }


    showAIMessage(
        "I'm listening. Tell me how many minutes you want today."
    );

    speak(
        "How many minutes will you do today?"
    );


    durationRecognition.onresult =
        function(event) {

            const text =
                event.results[0][0].transcript
                    .toLowerCase();

            console.log(
                "Voice:",
                text
            );


            const minutes =
                extractMinutes(text);


            if (!minutes) {

                if (status) {

                    status.textContent =
                        "I couldn't understand the duration. Try again.";
                }

                speak(
                    "Sorry, I didn't understand the duration. Please try again."
                );

                return;
            }


            chooseDuration(minutes);


            if (status) {

                status.textContent =
                    `🎯 Today's duration: ${minutes} minutes`;
            }


            speak(
                `Okay. Today's session is ${minutes} minutes.`
            );
        };


    durationRecognition.onerror =
        function() {

            if (status) {

                status.textContent =
                    "Voice input failed. Please try again.";
            }

            showAIMessage(
                "I couldn't hear you. Please try again."
            );
        };


    durationRecognition.onend =
        function() {

            console.log(
                "Voice recognition ended."
            );
        };


    durationRecognition.start();
}


function extractMinutes(text) {

    // Numbers: "45 minutes"
    const numberMatch =
        text.match(/\d+/);

    if (numberMatch) {

        const minutes =
            Number(
                numberMatch[0]
            );

        if (
            minutes >= 1 &&
            minutes <= 180
        ) {

            return minutes;
        }
    }


    // Common spoken numbers
    const words = {

        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "ten": 10,
        "fifteen": 15,
        "twenty": 20,
        "thirty": 30,
        "forty": 40,
        "forty five": 45,
        "fifty": 50,
        "sixty": 60,
        "ninety": 90,
        "one hundred": 100
    };


    for (const word in words) {

        if (text.includes(word)) {

            return words[word];
        }
    }


    return null;
}
/* =========================
   AUTOMATIC AI REMINDERS
========================= */

let activeReminderIndex = null;
let reminderTimer = null;
let reminderChecked = {};

function getHabitTimeInMinutes(timeString) {

    const match =
        timeString.match(
            /(\d+):(\d+)\s*(AM|PM)/i
        );

    if (!match) return null;

    let hour = Number(match[1]);
    const minute = Number(match[2]);
    const period = match[3].toUpperCase();

    if (period === "PM" && hour !== 12) {
        hour += 12;
    }

    if (period === "AM" && hour === 12) {
        hour = 0;
    }

    return hour * 60 + minute;
}


function checkHabitReminders() {

    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 +
        now.getMinutes();

    habits.forEach((habit, index) => {

        if (completed.includes(index)) {
            return;
        }

        const habitMinutes =
            getHabitTimeInMinutes(
                habit.time
            );

        if (habitMinutes === null) {
            return;
        }

        if (
            currentMinutes === habitMinutes &&
            !reminderChecked[index]
        ) {

            reminderChecked[index] = true;

            showHabitReminder(index);
        }
    });
}


function showHabitReminder(index) {

    activeReminderIndex = index;

    const habit =
        habits[index];

    const card =
        document.getElementById(
            "reminderCard"
        );

    const title =
        document.getElementById(
            "reminderTitle"
        );

    const message =
        document.getElementById(
            "reminderMessage"
        );

    if (title) {

        title.textContent =
            `${habit.icon} ${habit.name} Time`;
    }

    if (message) {

        message.textContent =
            `Sir, ${habit.name} ka time ho gaya hai. Aaj kitni der karenge?`;
    }

    if (card) {
        card.classList.add("active");
    }

    const voiceMessage =
        `Sir, ${habit.name} time. How many minutes will you do today?`;

    showAIMessage(
        voiceMessage
    );

    speak(
        voiceMessage
    );
}


function startReminderSession() {

    if (
        activeReminderIndex === null
    ) {
        return;
    }

    if (!selectedDuration) {

        showAIMessage(
            "Sir, pehle aaj ke session ka duration batayein."
        );

        speak(
            "Sir, please tell me today's session duration."
        );

        return;
    }

    startMission(
        activeReminderIndex
    );

    hideReminder();
}


function skipReminder() {

    if (
        activeReminderIndex === null
    ) {
        return;
    }

    const habit =
        habits[activeReminderIndex];

    showAIMessage(
        `${habit.name} skipped for today.`
    );

    speak(
        `${habit.name} skipped for today.`
    );

    hideReminder();
}


function hideReminder() {

    const card =
        document.getElementById(
            "reminderCard"
        );

    if (card) {
        card.classList.remove(
            "active"
        );
    }

    activeReminderIndex = null;
}


/* Check every second */

reminderTimer =
    setInterval(
        checkHabitReminders,
        1000
    );