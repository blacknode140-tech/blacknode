import { renderDashboard } from "./dashboard.js";
import { stations } from "./data.js";
import { setStations } from "./appState.js";
import { createStationCard } from "./stationCard.js";
import { getStations } from "./appState.js";
document.addEventListener("DOMContentLoaded",()=>{

    setStations(stations);
    
    console.log(stations);
    
    console.log(getStations());
    renderDashboard();

});
