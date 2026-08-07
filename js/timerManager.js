import {
    getSessions,
    updateSession
} from "./appState.js";
import { renderDashboard } from "./dashboard.js";
import { playSound } from "./soundManager.js";
export function formatTime(seconds) {

    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor((seconds % 3600) / 60);

    const secs = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

}
let timer = null;

export function startTimer() {

    if (timer) return;

    timer = setInterval(() => {

        const sessions = getSessions();

sessions.forEach(session => {

    if (session.status !== "active") return;

    if (session.remainingSeconds <= 0) return;

    const updatedSession = {

    ...session,

    remainingSeconds: session.remainingSeconds - 1

};

// Si acaba de llegar a cero
if (updatedSession.remainingSeconds === 0) {

    updatedSession.status = "finished";

    playSound("timerEnd");

}

updateSession(updatedSession);

});

    //console.table(getSessions());
    renderDashboard();
        



    }, 1000);

}

export function stopTimer() {

    clearInterval(timer);

    timer = null;

}