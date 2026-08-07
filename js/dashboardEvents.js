import { stations } from "./data.js";
import {
    openModal,
    createStartSessionModal,
    createManageSessionModal
} from "./modal.js";
import { createSession } from "./sessionManager.js";
import {
    setCurrentStation,
    getCurrentStation,
    setSelectedPlan,
    getSelectedPlan,
    getSessionById,
    setCurrentSession
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

    if(button.dataset.action==="start"){

    openModal(createStartSessionModal(station));

    }
    if(button.dataset.action==="manage"){

    const session = getSessionById(station.sessionId);
    setCurrentSession(session);

    openModal(

        createManageSessionModal(

            station,

            session

        )

    );

}
}