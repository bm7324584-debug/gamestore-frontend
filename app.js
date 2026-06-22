const API = "https://gamestore-backend-icx4.onrender.com/api/juegos";

// CARGAR DATOS
async function cargar() {
    try {
        const res = await fetch(API);
        const data = await res.json();

        const tabla = document.getElementById("tabla");
        tabla.innerHTML = "";

        data.forEach(j => {
            tabla.innerHTML += `
            <tr>
                <td><img src="${j.imagen}" onerror="this.src='https://via.placeholder.com/70'"></td>
                <td>${j.nombre}</td>
                <td>${j.plataforma}</td>
                <td>$${j.precio}</td>
                <td>${j.stock}</td>
                <td>
                    <button class="btn-editar" onclick="editar('${j._id}')">✏️</button>
                    <button class="btn-eliminar" onclick="eliminar('${j._id}')">🗑️</button>
                </td>
            </tr>
            `;
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

// GUARDAR
document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const juego = {
        nombre: document.getElementById("nombre").value,
        plataforma: document.getElementById("plataforma").value,
        precio: Number(document.getElementById("precio").value),
        stock: Number(document.getElementById("stock").value),
        imagen: document.getElementById("imagen").value
    };

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(juego)
    });

    alert("Juego guardado 🔥");
    document.getElementById("form").reset();
    cargar();
});

// ELIMINAR
async function eliminar(id) {
    if (confirm("¿Eliminar juego?")) {
        await fetch(API + "/" + id, {
            method: "DELETE"
        });
        cargar();
    }
}

// EDITAR
async function editar(id) {
    const nombre = prompt("Nuevo nombre:");
    const plataforma = prompt("Nueva plataforma:");
    const precio = prompt("Nuevo precio:");
    const stock = prompt("Nuevo stock:");
    const imagen = prompt("Nueva URL imagen:");

    await fetch(API + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nombre,
            plataforma,
            precio: Number(precio),
            stock: Number(stock),
            imagen
        })
    });

    cargar();
}

// INICIAR
cargar();