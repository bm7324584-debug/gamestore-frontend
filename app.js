const API = "https://gamestore-backend-icx4.onrender.com/api/juegos";

// CARGAR
async function cargar() {
    const res = await fetch(API);
    const data = await res.json();

    const tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    data.forEach(j => {
        tabla.innerHTML += `
        <tr>
            <td>${j.nombre}</td>
            <td>${j.plataforma}</td>
            <td>$${j.precio}</td>
            <td>${j.stock}</td>
        </tr>
        `;
    });
}

// GUARDAR
document.getElementById("form").addEventListener("submit", async e => {
    e.preventDefault();

    const juego = {
        nombre: document.getElementById("nombre").value,
        plataforma: document.getElementById("plataforma").value,
        precio: Number(document.getElementById("precio").value),
        stock: Number(document.getElementById("stock").value)
    };

    await fetch(API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(juego)
    });

    alert("Juego guardado 🎮🔥");

    document.getElementById("form").reset();

    cargar();
});

// INICIO
cargar();