export function createStationCard(station) {

    const isFree = station.status === "free";

    return `

        <div class="station-card">

            <div class="station-header">

                <h3>${station.name}</h3>

                <span class="status ${station.status}">
                    ${isFree ? "🟢 Libre" : "🟠 Ocupada"}
                </span>

            </div>

            <div class="station-body">

                ${
                    isFree
                    ?

                    `
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

                            ${station.timer}

                        </div>

                        <button
                            class="btn btn-warning"
                            data-action="manage"
                            data-id="${station.id}">
                            Administrar

                        </button>
                    `
                }

            </div>

        </div>

    `;

}