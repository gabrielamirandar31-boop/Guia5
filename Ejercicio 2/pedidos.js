// Arreglo de pedidos
let pedidos = [];

// Elementos del DOM
const inputProducto = document.querySelector("#inputProducto");
const inputPrecio = document.querySelector("#inputPrecio");
const inputCantidad = document.querySelector("#inputCantidad");
const inputPrecioMax = document.querySelector("#inputPrecioMax");
const tbodyPedidos = document.querySelector("#tbodyPedidos");
const totalUnidades = document.querySelector("#totalUnidades");
const montoTotal = document.querySelector("#montoTotal");

// ---------- Procesamiento de datos ----------
function esPedidoValido(producto, precio, cantidad) {
  return producto.trim() !== "" && precio > 0 && Number.isInteger(cantidad) && cantidad > 0;
}

function calcularSubtotal(pedido) {
  return pedido.precio * pedido.cantidad;
}

function calcularTotalUnidades(lista) {
  return lista.reduce((total, pedido) => total + pedido.cantidad, 0);
}

function calcularMontoTotal(lista) {
  return lista.map(calcularSubtotal).reduce((total, subtotal) => total + subtotal, 0);
}

function filtrarPorPrecio(lista, precioMaximo) {
  return lista.filter((pedido) => pedido.precio <= precioMaximo);
}

// ---------- Actualización del HTML ----------
function mostrarPedidos(lista) {
  tbodyPedidos.innerHTML = lista
    .map(
      (pedido) => `
      <tr>
        <td>${pedido.producto}</td>
        <td>$${pedido.precio.toFixed(2)}</td>
        <td>${pedido.cantidad}</td>
        <td>$${calcularSubtotal(pedido).toFixed(2)}</td>
      </tr>`
    )
    .join("");

  totalUnidades.textContent = calcularTotalUnidades(lista);
  montoTotal.textContent = calcularMontoTotal(lista).toFixed(2);
}

// ---------- Eventos ----------
function agregarPedido() {
  const producto = inputProducto.value;
  const precio = parseFloat(inputPrecio.value);
  const cantidad = Number(inputCantidad.value);

  if (!esPedidoValido(producto, precio, cantidad)) {
    alert("Datos inválidos: revise el nombre, el precio (mayor a 0) y la cantidad (entero positivo).");
    return;
  }

  pedidos.push({ producto: producto.trim(), precio, cantidad });
  mostrarPedidos(pedidos);

  inputProducto.value = "";
  inputPrecio.value = "";
  inputCantidad.value = "";
}

function filtrarProductos() {
  const precioMaximo = parseFloat(inputPrecioMax.value);
  mostrarPedidos(filtrarPorPrecio(pedidos, precioMaximo));
}

function mostrarTodos() {
  mostrarPedidos(pedidos);
}

function limpiarPedidos() {
  pedidos = [];
  mostrarPedidos(pedidos);
}

document.querySelector("#btnAgregar").addEventListener("click", agregarPedido);
document.querySelector("#btnFiltrar").addEventListener("click", filtrarProductos);
document.querySelector("#btnMostrarTodos").addEventListener("click", mostrarTodos);
document.querySelector("#btnLimpiar").addEventListener("click", limpiarPedidos);