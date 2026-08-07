export function renderDashboard(){

    const app=document.querySelector("#app");

    app.innerHTML=`

        <header class="header">

    <div class="logo">

        BLACK NODE

    </div>

    <div class="user">

        Administrador

    </div>

</header>

<main>

    <h2>

        ESTACIONES PS5

    </h2>

    <section id="stations">

    </section>

</main>

    `;

}