import { plans } from "./data.js";
import { createSession } from "./sessionManager.js";
import {
    getCurrentStation,
    getSelectedPlan,
    addSession,
    setSelectedPlan,
    updateStation,
    getStations
} from "./appState.js";
import { playSound } from "./soundManager.js";
import { renderDashboard } from "./dashboard.js";
export function openModal(content) {

    const modalRoot = document.querySelector("#modal-root");

    modalRoot.innerHTML = `

        <div class="modal-overlay">

            <div class="modal">

                <button class="close-modal" data-action="close">
                        
                    ✕

                </button>

                ${content}

            </div>

        </div>

    `;
    initModalEvents();
}

export function closeModal() {

    document.querySelector("#modal-root").innerHTML = "";

}

export function createStartSessionModal(station) {

    return `



<p class="station-name">

    ${station.name}

</p>

<div class="plans">

    ${plans.map(plan => `

        <div
            class="plan-card ${plan.color}"
            data-plan="${plan.id}"
            data-name="${plan.name}"
            data-price="${plan.price}"
            data-minutes="${plan.minutes}">

            <div>

                <strong>${plan.name}</strong>

                <small>

                    ${plan.minutes} min

                </small>

            </div>

            <span>

                Q${plan.price}

            </span>

        </div>

    `).join("")}

</div>

<div class="modal-actions">

    <button class="btn" data-action="close">
            
        Cancelar

    </button>

    <button
    class="btn btn-primary"
    data-action="start-session">

    Iniciar

</button>

</div>

`;

}
function initModalEvents(){

    const modal = document.querySelector(".modal");

    modal.addEventListener("click", handleModalClick);

}
function handleModalClick(event) {
    const planCard = event.target.closest(".plan-card");

if (planCard) {

    selectPlan(planCard);

    return;

}
    const button = event.target.closest("button");

    if (!button) return;

    const action = button.dataset.action;

  switch(action){

    case "close":

        closeModal();

    break;

    case "start-session":

        const session = createSession(

            getCurrentStation(),

            getSelectedPlan()

        );

        addSession(session);
        
        // esta variable se puedo aver renombrado por updateStation
        const station = {

            ...getCurrentStation(),

            status: "occupied",

            sessionId: session.id,

            timer: "01:00:00"

        };
        updateStation(station);
        playSound("notification");
        closeModal();
        renderDashboard();
    break;

}

}
function selectPlan(card) {

    document
        .querySelectorAll(".plan-card")
        .forEach(plan => {

            plan.classList.remove("selected");

        });

    card.classList.add("selected");
    const selectedPlan = {

    id: card.dataset.plan,

    name: card.dataset.name,

    minutes: Number(card.dataset.minutes),

    price: Number(card.dataset.price)

};

setSelectedPlan(selectedPlan);


}