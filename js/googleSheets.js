const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyI3by05Ks02nEEd2tQROmpY457v-C744z1jqvRPEc3oRhMuTU-r2Z3GNQZNCQ4AGL8jQ/exec";

export async function saveSale(sale){

    const response = await fetch(
    GOOGLE_SCRIPT_URL,
    {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "text/plain"
        },
        body: JSON.stringify(sale)
    }
);

console.log("Enviado");

    const result = await response.text();

    console.log(result);

}
function doGet() {
  return ContentService
    .createTextOutput("Black Node API OK");
}