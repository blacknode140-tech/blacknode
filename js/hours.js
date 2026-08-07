import { renderDashboard } from "./dashboard.js";
import { stations } from "./data.js";
import { setStations } from "./appState.js";
import { createStationCard } from "./stationCard.js";
import { getStations } from "./appState.js";
import { startTimer } from "./timerManager.js";
document.addEventListener("DOMContentLoaded",()=>{
    setStations(stations);
    
    renderDashboard();
    startTimer();

});
