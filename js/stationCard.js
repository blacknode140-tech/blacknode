import { formatTime } from "./timerManager.js";
import { getSessionById } from "./appState.js";
export function createStationCard(station) {

    const isFree = station.status === "free";
    const session = getSessionById(station.sessionId);
    const isFinished = session?.status === "finished";
    return `

        <div class="station-card">

            <div class="station-header">

                <h3>${station.name}</h3>

                <span class="status ${isFinished ? "finished" : station.status}">

    ${
        isFree
            ? "🟢 Libre"
            : isFinished
                ? "🔴 Tiempo terminado"
                : "🟠 En sesión"
    }

</span>

            </div>

            <div class="station-body">

                ${
                    isFree
                    ?

                    `
                    <div class="station-image">

                <img
                    src="../resources/playstation.png"
                    class="playstation-image"
                    alt="PlayStation 5">

            </div>
                        <button
                            class="btn btn-primary"
                            data-action="start"
                            data-id="${station.id}">

                            Iniciar sesión

                        </button>
                    `

                    :

                    `
                        <div class="timer">

                            ${session ? formatTime(session.remainingSeconds) : "00:00:00"}

                        </div>

                       <button
    class="btn ${isFinished ? "btn-danger" : "btn-warning"}"
    data-action="${isFinished ? "checkout" : "manage"}"
    data-id="${station.id}">

    ${isFinished ? "💰 Cobrar" : "Administrar"}

</button>
                    `
                }

            </div>

        </div>

    `;

}