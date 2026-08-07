import { renderDashboard } from "./dashboard.js";
import { stations } from "./data.js";
import { createStationCard } from "./stationCard.js";

document.addEventListener("DOMContentLoaded",()=>{

    renderDashboard();

});
const container = document.querySelector("#stations");

container.innerHTML = stations
    .map(station => createStationCard(station))
    .join("");

