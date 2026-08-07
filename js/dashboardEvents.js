import { stations } from "./data.js";
import { openModal, createStartSessionModal } from "./modal.js";
import { createSession } from "./sessionManager.js";
import {
    setCurrentStation,
    getCurrentStation,
    setSelectedPlan,
    getSelectedPlan
} from "./appState.js";
export function initDashboardEvents() {

    document.addEventListener("click", handleDashboardClick);

}

function handleDashboardClick(event) {
    if (event.target.closest(".modal")) {
    return;
}
    const button = event.target.closest("button");
    const planCard = event.target.closest(".plan-card");

    if (planCard) {

        selectPlan(planCard);

        return;

    }

    if (!button) return;

    console.clear();

    const stationId = Number(button.dataset.id);

    const station = stations.find(item => item.id === stationId);

    setCurrentStation(station);

    console.clear();

    console.log("Acción:", button.dataset.action);
    console.log(getCurrentStation());

    if(button.dataset.action==="start"){

    openModal(createStartSessionModal(station));

}

}