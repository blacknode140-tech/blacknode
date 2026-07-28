//===============================
// MENÚ RESPONSIVE
//===============================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");

});

//===============================
// CERRAR MENÚ
//===============================

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");

    });

});

/*=========================================
            LAST HOUR MODAL
=========================================*/

const modal = document.getElementById("lastHourModal");

const openModal = document.getElementById("openModal");

const closeModal = document.getElementById("closeModal");

const acceptRules = document.getElementById("acceptRules");


/*=========================================
            ABRIR
=========================================*/

function showModal(){

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


/*=========================================
            CERRAR
=========================================*/

function hideModal(){

    modal.classList.remove("active");

    document.body.style.overflow = "auto";

}


/*=========================================
            EVENTOS
=========================================*/

openModal.addEventListener("click", showModal);

closeModal.addEventListener("click", hideModal);

acceptRules.addEventListener("click", hideModal);


/*=========================================
        CERRAR HACIENDO CLICK AFUERA
=========================================*/

modal.addEventListener("click", function(e){

    if(e.target === modal){

        hideModal();

    }

});


/*=========================================
            TECLA ESC
=========================================*/

document.addEventListener("keydown", function(e){

    if(e.key === "Escape"){

        hideModal();

    }

});