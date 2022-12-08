const bolsa = document.querySelector('#bolsa');
const contenedorBolsa = document.querySelector('#lista-bolsa tbody');
const totalBolsa = document.querySelector('#lista-bolsa tfoot');
const vaciarBolsaBoton = document.querySelector('#vaciar-bolsa');
const liProductos = document.querySelector('#lista-productos');
const cargarProductos = document.querySelector('#cargar-bolsa')

let articuloBolsa= [];
let totalPedido = 0;
cargarEvento();

function cargarEvento () {
    liProductos.addEventListener('click', agregarProducto);
    bolsa.addEventListener('click',eliminarProducto);
    vaciarBolsaBoton.addEventListener('click', ()=>{
        articuloBolsa= []
        limpiarHTML()
        limpiarHtmlTotal()
    })
}

function agregarProducto (e) {
    console.log("BUTTON")
    e.preventDefault();
    if(e.target.classList.contains('agregar-bolsa')){
        console.log("WORKING")
        const list = e.target.parentElement.querySelector('.variety-list')
        console.warn(list)
        const productoSeleccionado = e.target.parentElement.parentElement
        leerDatos(productoSeleccionado, list)
    }
}

function eliminarProducto (e) {
    
    if(e.target.classList.contains('borrar-producto')){
        const productoid = e.target.getAttribute('data-id');
        articuloBolsa = articuloBolsa.filter(producto => producto.id !== productoid);
        llenarBolsaHTML();
    }
}

function leerDatos (productos, list) {
    console.log("leerDatos")
    const infoProductos={
        imagen: productos.querySelector('img').src,
        titulo: list?.querySelector('select')?.options[list?.querySelector('select')?.options?.selectedIndex].text ?? productos.querySelector('h4').textContent,
        precio: productos.querySelector('.precio span').textContent,
        cantidad: 1,
        total: parseInt(productos.querySelector('.precio span').textContent.substr(1,productos.querySelector('.precio span').textContent.length)),
        id: list?.querySelector('select')?.options[list?.querySelector('select')?.options?.selectedIndex]?.getAttribute('data-id') ?? productos.querySelector('a').getAttribute('data-id')
    }
    console.log(infoProductos);
    const existe = articuloBolsa.some(producto=>producto.id === infoProductos.id);
    console.log("existe",existe)
    //validar si existe 

    if (existe) {
        articuloBolsa.map(producto => {
            if(producto.id === infoProductos.id) {
                console.log("cantidad de texto",producto.precio.length,"",producto.total);
                producto.cantidad++;
                producto.total = producto.cantidad * parseInt(producto.precio.substr(1,producto.precio.length));
                return producto;
            } else {
                return producto;
            }
        })
    } else{
    articuloBolsa = [...articuloBolsa, infoProductos];
}

// agregamos el vector 

console.log('vector',articuloBolsa)
llenarBolsaHTML();
}

function llenarBolsaHTML () {
    //borrar el HTML del contenedor
    limpiarHTML();
    limpiarHtmlTotal();
    totalPedido = 0;
    articuloBolsa.forEach(producto =>{
        const fila = document.createElement('tr')
        fila.innerHTML = `<td><img src=${producto.imagen} width='100'></td>
                          <td>${producto.titulo}</td>
                          <td>${producto.precio}</td>
                          <td>${producto.cantidad}</td>
                          <td>${producto.total}</td>
                          <td><a href="#" class="borrar-producto" data-id="${producto.id}">X</a></td>`
        totalPedido = totalPedido + producto.total;
        contenedorBolsa.appendChild(fila);
        const filaTotal = document.createElement('tr');
        filaTotal.innerHTML = `<td>Total Pedido: ${totalPedido}</td>`;
        limpiarHtmlTotal();
        totalBolsa.appendChild(filaTotal);
    })
}

function limpiarHTML () {
    console.log(contenedorBolsa.innerHTML)
    contenedorBolsa.innerHTML = '';
}

function limpiarHtmlTotal () {
    console.log(totalBolsa.innerHTML)
    totalBolsa.innerHTML = '';
}

function saveCookie(name, value, date) {
    let val = name + '=' + value
    if (date) val += ';' + 'expires=' + date
    console.log(val)
    document.cookie = val
}
function getCookieValue(name) {
    let cookie = document.cookie,
    cookies = cookie.split('; ')
    return cookies.find(c => c.split('=')[0] === name)?.split('=')[1]
}