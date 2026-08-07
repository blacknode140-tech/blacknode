import { stations } from "./data.js";
import { createStationCard } from "./stationCard.js";
import { initDashboardEvents } from "./dashboardEvents.js";
export function renderDashboard() {

    const app = document.querySelector("#app");

    app.innerHTML = `

        <header class="header">

            <div class="logo">
                BLACK NODE
            </div>

            <div class="user-info">
                Administrador
            </div>

        </header>

        <main>

            <h2>ESTACIONES PS5</h2>

            <section id="stations"></section>

        </main>

    `;

    const stationsContainer = document.querySelector("#stations");

    stationsContainer.innerHTML = stations
        .map(createStationCard)
        .join("");

    initDashboardEvents();
}
