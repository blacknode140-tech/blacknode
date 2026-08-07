import { plans, products } from "./data.js";
import {
    createSession,
    recalculateSessionTotals,
    addExtraTime,
    addProductToSession
} from "./sessionManager.js";
import {
    getCurrentStation,
    getSelectedPlan,
    addSession,
    setSelectedPlan,
    updateStation,
    getStations,
    getCurrentSession,
    updateSession,
} from "./appState.js";
import { saveSale } from "./googleSheets.js";
import { formatTime } from "./timerManager.js";
import { playSound } from "./soundManager.js";
import { renderDashboard } from "./dashboard.js";
export function openModal(content) {

    const modalRoot = document.querySelector("#modal-root");

    modalRoot.innerHTML = `

        <div class="modal-overlay">

            <div class="modal ${content.includes("checkout-container") ? "modal-xl" : ""}">

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
            class="plan-card ${plan.color} ${plan.highlight ? "featured-plan" : ""}"
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
export function createManageSessionModal(station,session){

   return `

<h2>${station.name}</h2>

<p>

    Tiempo restante:

    ${formatTime(session.remainingSeconds)}

</p>

<p>

    Plan:

    ${session.plan.name}

</p>

<p>

    Duración:

    ${session.plan.minutes} minutos

</p>

<p>

    Juego:

    Q${session.plan.price}

</p>

<p>

    Horas Extras:

    Q${session.totals.extras}

</p>

<p>

    Snack O bebida:

    Q${session.totals.products}

</p>

<h3>

    Total: Q${session.totals.total}

</h3>
<button
    class="btn btn-primary"
    data-action="add-time"
    data-minutes="30"
    data-price="10">

    +30 minutos

</button>
<button
    class="btn btn-primary"
    data-action="add-time"
    data-minutes="60"
    data-price="15">

    +1 hora

</button>
<button
    class="btn btn-primary"
    data-action="products">

    🥤 Agregar producto

</button>
<button
class="btn"
data-action="close">

Cerrar

</button>


`;

}
export function createCheckoutModal(station, session){
    const groupedProducts = {};

session.products.forEach(product => {

    if (!groupedProducts[product.productId]) {

        groupedProducts[product.productId] = {

            ...product,

            quantity: 1

        };

    } else {

        groupedProducts[product.productId].quantity++;

    }

});
console.log(groupedProducts);

    return `

    <h2>

        💰 Finalizar sesión

    </h2>

    <h3>

        ${station.name}

    </h3>

    <div class="checkout-container">

        <div class="checkout-summary">

            <h4>

                Resumen

            </h4>

            <p>

                Juego

                <span>

                    Q${session.plan.price}

                </span>

            </p>

            <p>

                Horas extras

                <span>

                    Q${session.totals.extras}

                </span>

            </p>

            <p>

                Snacks y bebidas

                <span>

                    Q${session.totals.products}

                </span>

            </p>

            <hr>

            <h3>

                Total

                <span>

                    Q${session.totals.total}

                </span>

            </h3>

        </div>

        <div class="checkout-products">
        <h4>

        Productos consumidos

    </h4>

    ${

        session.products.length === 0

        ?

        `

            <p class="empty-products">

                No se agregaron productos.

            </p>

        `

        :

        Object.values(groupedProducts).map(product =>  `

            <div class="checkout-product">

                <span>

                    ${product.name}

                </span>

                <strong>

    x${product.quantity}

</strong>

<span>

    Q${product.price * product.quantity}

</span>

            </div>

        `).join("")

    }


        </div>

    </div>

    <div class="checkout-payment">

    <h4>

        Método de pago

    </h4>

    <div class="payment-grid">

        <button
            class="payment-card"
            data-action="payment"
            data-method="cash">

            <span>💵</span>

            <strong>Efectivo</strong>

        </button>

        <button
            class="payment-card"
            data-action="payment"
            data-method="card">

            <span>💳</span>

            <strong>Tarjeta</strong>

        </button>

        <button
            class="payment-card"
            data-action="payment"
            data-method="transfer">

            <span>📲</span>

            <strong>Transferencia</strong>

        </button>

    </div>

    <button
        class="btn"
        data-action="close">

        Cancelar

    </button>

</div>

`;

}
export function createProductsModal() {
    

    return `

        <h2>Agregar producto</h2>

        <div class="products-grid">

            ${products
                .filter(product => product.active)
                .map(product => `

                    <button
    class="product-card"
    data-action="add-product"
    data-id="${product.id}">

    <div class="product-content">

        <strong>${product.name}</strong>

        <p>Q${product.price}</p>

    </div>

</button>

                `)
                .join("")}

        </div>

        <button
            class="btn"
            data-action="close">

            Cerrar

        </button>

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

        setSelectedPlan(null);

    closeModal();


    break;
    

    case "start-session":

        if (!getSelectedPlan()) {

    playSound("error");

    return;

}
        const session = createSession(

            getCurrentStation(),

            getSelectedPlan()

        );

        addSession(session);
        
        // esta variable se puedo aver renombrado por updateStation
        const updatedStation = {

    ...getCurrentStation(),

    status: "occupied",

    sessionId: session.id,


};

updateStation(updatedStation);
        playSound("notification");
        closeModal();
        renderDashboard();
    break;

    case "add-time":{


    console.log(button.dataset);

    const minutes = Number(button.dataset.minutes);

    const price = Number(button.dataset.price);

    console.log(minutes);

    console.log(price);

    const updatedSession = addExtraTime(

        getCurrentSession(),

        minutes,

        price

    );

    console.log(updatedSession);

    updateSession(updatedSession);

    playSound("notification");

    renderDashboard();

break;
    }
    case "payment":{

    completeCheckout(

        button.dataset.method

    );

break;

}
    case "products":

    
        openModal(

        createProductsModal()

    );

    break;



    const product = products.find(

        product => product.id === Number(button.dataset.id)

    );

    const updatedSession = addProductToSession(

        getCurrentSession(),

        product

    );

    updateSession(updatedSession);

    playSound("addHour");

    renderDashboard();

break;

case "add-product": {

    const product = products.find(

        product => product.id === Number(button.dataset.id)

    );

    const updatedSession = addProductToSession(

        getCurrentSession(),

        product

    );

    updateSession(updatedSession);

    playSound("productAdded");

    renderDashboard();

    break;

}

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
async function completeCheckout(method){

    playSound("payment");

    const session = getCurrentSession();

    const station = getCurrentStation();

    const now = new Date();

const paymentMethods = {

    cash: "Efectivo",

    card: "Tarjeta",

    transfer: "Transferencia"

};
const groupedProducts = {};

session.products.forEach(product => {

    const key = product.productId;

    if (!groupedProducts[key]) {

        groupedProducts[key] = {

            name: product.name,

            quantity: 1

        };

    } else {

        groupedProducts[key].quantity++;

    }

});

const productsSold = Object.values(groupedProducts)
    .map(product => `${product.name} (${product.quantity})`)
    .join(", ");


const saleId = `BN-${
    now.getFullYear()
}${
    String(now.getMonth() + 1).padStart(2, "0")
}${
    String(now.getDate()).padStart(2, "0")
}-${
    String(now.getHours()).padStart(2, "0")
}${
    String(now.getMinutes()).padStart(2, "0")
}${
    String(now.getSeconds()).padStart(2, "0")
}-${station.id}`;

const sale = {
    saleId,    
    date: now.toISOString().split("T")[0],

    time: now.toLocaleTimeString("es-GT", {

        hour12: false

    }),

    station: station.name,

    plan: session.plan.name,

    minutes: session.plan.minutes,

    startTime: session.startTime,

    endTime: now.toLocaleTimeString("es-GT", {

        hour12: false

    }),

    game: session.plan.price,

    extras: session.totals.extras,

    products: session.totals.products,

    total: session.totals.total,

    paymentMethod: paymentMethods[method],

    productsSold

};

    console.log(sale);

    await saveSale(sale);

    const updatedStation = {

        ...station,

        status: "free",

        sessionId: null

    };

    updateStation(updatedStation);

    closeModal();

    renderDashboard();

} 