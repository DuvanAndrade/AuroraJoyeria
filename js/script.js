async function obtenerProductos() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/DuvanAndrade/aurora_TP_Final_Js/main/js/productos.json");
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON. Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ocurrió un error:', error);
    }
}


//MENSAJES DE ENVIO
function enviado(mensaje){
    Toastify({
        text: mensaje,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#694A69",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}
function emailInvalido(){
    Toastify({
        text: "Por favor, ingresa un email valido.",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#694A69",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

function envioFormulario(msn){
    Toastify({
        text: msn,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#694A69",
        },
        onClick: function(){} // Callback after click
      }).showToast();
  }

function Bienvenido(nombre){
    swal({
        title: "Bienvenido",
        text: `${nombre} 😊`,
        icon: "success",
      });
}
function msnErrorCampo(msn){
    swal({
        title: "Error 🙃",
        text: msn,
        icon: "error",
      });
}
function msnErrorResgistro(){
    swal({
        title: "Error 🙃",
        text: "El usuario ya existe. Por favor, elige otro nombre de usuario.",
        icon: "error",
      });
}
function msnAdvertencia(){
    swal({
        title: "👁️",
        text: "El nombre de usuario y la contraseña deben tener al menos 6 caracteres.",
        icon: "warning",
      });
}

function registroExitoso(){
    swal({
        title: "Bien Hecho",
        text: "Registro exitoso",
        icon: "success",
      });
}

//BOTON ENVIAR EMAIL FOOTER 
const btnEmail = document.getElementById("emailForm");
btnEmail.addEventListener("submit", function(e) {
e.preventDefault();
    const email = document.getElementById("emailInput").value;
    const emailValido = validarEmail(email);
    
    !emailValido ? emailInvalido() : (localStorage.setItem("user_email", email), enviado('Email enviado exitosamente!'));
    btnEmail.reset();
    });
    

function validarEmail(email) {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(email);
}

//INDEX

const img = new Image();
img.onload = function() {
  const myDiv = document.getElementById('contenedor_imagen');
  myDiv.style.backgroundImage = `url(${img.src})`;
  myDiv.style.backgroundAttachment = 'fixed';
  myDiv.style.backgroundRepeat = "no-repeat";
  myDiv.style.backgroundSize = "cover";
  myDiv.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.100), rgba(0, 0, 0, 0.400)), url(${img.src})`;
};
img.src = 'assets/img/imgprincipal.jpg';


//PAG CONTACTO
/*FORMULARIO PAGINA CONTACTO */
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario_contacto");
    formulario.addEventListener("submit", function (e) {
      e.preventDefault();
      const nombre = formulario.nombre.value;
      const apellido = formulario.apellido.value;
      const email = formulario.email.value;
      const mensaje = formulario.mensaje.value;
  
      if (nombre === "" || apellido === "" || email === "" || mensaje === "") {
        envioFormulario("Por favor, completa todos los campos.");
        return;
      }
      envioFormulario("Formulario enviado con éxito.")
      formulario.reset();
    });
  });


//NAVBAR
/*MODAL INICIO O REGISTRO DE CUENTA */
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


document.addEventListener("DOMContentLoaded", function(){
    const modalCart = document.getElementById("myModalCart");
    const btnCart = document.getElementById("myBtnCart");
    const span = document.getElementsByClassName("closeCart")[0];
    btnCart.onclick = function() {
    modalCart.style.display = "block";
    }
    span.onclick = function() {
    modalCart.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modalCart) {
        modalCart.style.display = "none";
        }
    }

})




//INICIO DE SECCION O REGISTRO DE UNA NUEVA CUENTA 
document.addEventListener("DOMContentLoaded", function() {
    const formularioInicio = document.getElementById("formInicio");
    const formularioRegistro = document.getElementById("formRegistro");

    // GUARDAR USUARIO EN EL LOCALST
    function guardarUsuario(usuario) {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    // VALIDO Y PROCESO EL INICIO DE SECCION
    function inicioSeccion(nombre, password) {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuario = usuarios.find(usuario => usuario.nombre === nombre && usuario.password === password);
        return usuario;
    }

    // RESETEO DE CAMPOS Y ENVIO DE FORMULARIO
    formularioInicio.addEventListener("submit", function(e) {
        e.preventDefault();
        const nombreUsuario = document.getElementById("nombreUsuario").value;
        const passwordInicio = document.getElementById("passwordInicio").value;
        const usuario = inicioSeccion(nombreUsuario, passwordInicio);
        if (usuario) {
            Bienvenido(usuario.nombre);
        } else {
            msnErrorCampo("Nombre o contraseña iconrrecta. Por favor, inténtalo de nuevo.");
        }
        formularioInicio.reset();
    });

    // RESETEO DE CAMPOS, ENVIO Y VALIDACION DE FORMULARIO DE REGISTRO
    formularioRegistro.addEventListener("submit", function(e) {
        e.preventDefault();
        const registroUsuario = document.getElementById("registroNombre").value;
        const registroPassword = document.getElementById("registroPassword").value;

        if (registroUsuario === "" || registroPassword === "") {
            msnErrorCampo("Por favor, ingresa un nombre ó contraseña válida.");
        } else if (registroUsuario.length < 6 || registroPassword.length < 6) {
            msnAdvertencia();
        } else {
            const usuario = JSON.parse(localStorage.getItem("usuarios")) || [];
            if (usuario.some(usuario => usuario.nombre === registroUsuario)) {
                msnErrorResgistro();
            } else {
                const nuevoUsuario = {
                    nombre: registroUsuario,
                    password: registroPassword
                };
                guardarUsuario(nuevoUsuario);
                registroExitoso();
            }
        }

        formRegistro.reset();
    });
});


//NUESTROS PRODUCTOS
let btns_agregar = document.querySelectorAll('.agregar_producto');
const catalogo = document.querySelector('.box_productos');
const titulo = document.querySelector('.titulo_principal');

async function cargarProductos(categoria) {       
    catalogo.innerHTML = ''; // SE LIMPIA EL CONTENIDO DEL CARRITO

    try {
        productos = await obtenerProductos()
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error);
    }

    productos.forEach(producto => {
        if (categoria === 'todos' || producto.categoria.nombre === categoria) {
            const div = document.createElement('div');
            
            titulo.innerHTML = "Nuestros Productos";
            //SE CREA UN DIV CON LOS ELEMNTOS DEL PRODCUTO A MOSTRAR
            div.innerHTML = `
            
            <article  id=${producto.id} class="box">
            <img src=${producto.imagen} alt="imagen sobre ${producto.titulo}">
            </article>
            <div class="descripcion_producto">
                <h2>${producto.titulo}</h2>
                <p><i>$${producto.precio}</i></p>
            </div>
            <div class="btn">
            <button class="agregar_producto" data-id=${producto.id} onclick = "agregarAlCarrito(${producto.id})"> <span>Agregar</span> </button>
            </div>
        
            `;
            catalogo.append(div);
        }
       
    });
}

document.getElementById('todos').addEventListener('click', () => cargarProductos('todos'));
document.getElementById('collares').addEventListener('click', () => cargarProductos('collares'));
document.getElementById('pulseras').addEventListener('click', () => cargarProductos('pulseras'));
document.getElementById('anillos').addEventListener('click', () => cargarProductos('anillos'));
document.getElementById('carteras').addEventListener('click', () => cargarProductos('carteras'));
document.getElementById('cinturones').addEventListener('click', () => cargarProductos('cinturones'));


cargarProductos('todos');

const productosEnCarrito = [];

function agregarAlCarrito(id){
    const productoAgregado = productos.find(producto => producto.id === id);
    productosEnCarrito.push(productoAgregado);
    localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
    enviado('Producto Agregado Al Carrito');
}

function eliminarProducto(id) {
    const productosEnCarritoLS = JSON.parse(localStorage.getItem("carrito"));
    const carritoActualizado = productosEnCarritoLS.filter(producto => producto.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    limpiarCarrito();
    mostrarProcductosCarrito();
    
    const totalCarrito = calcularTotalCarrito();
    actualizarTotalCarrito(totalCarrito);
    
}

function limpiarCarrito() {
    const produCarrito = document.querySelector(".contenedor-carrito");
    produCarrito.innerHTML = ''; 
}
//FUNCION PARA CALCULAR EL TOTAL DE LOS PRODCUTOS AGREGADOS
function calcularTotalCarrito() {
    const productosEnCarritoLS = JSON.parse(localStorage.getItem("carrito"));
    let total = 0;

    if (productosEnCarritoLS && productosEnCarritoLS.length > 0) {
        total = productosEnCarritoLS.reduce((acumulador, producto) => {
            return acumulador + producto.precio;
        }, 0);
    }

    return total;
}
//FUNCION PARA ACTUALIZAR EL TOTAL DESPUES DE ELIMINAR UN ITEM
function actualizarTotalCarrito(total) {
    const divTotal = document.querySelector(".total_cart");
    divTotal.className = 'total_cart'
    divTotal.textContent = `Total: $${total}`;
}
function mostrarProcductosCarrito(){
    const produCarrito = document.querySelector(".contenedor-carrito");
    const titulo_cart = document.querySelector(".titulo_cart");
    const productosEnCarritoLS = JSON.parse(localStorage.getItem("carrito"));
    titulo_cart.textContent = "TU CARRITO";
    produCarrito.innerHTML = '';
    if(productosEnCarritoLS && productosEnCarritoLS.length > 0){
        productosEnCarritoLS.forEach((producto) =>{
            const div = document.createElement("div");
            div.className = 'grilla_productos_cart'
            div.innerHTML = `
            <article  id=${producto.id} class="box_cart">
            <img src=${producto.imagen} alt="imagen sobre ${producto.titulo}">
            </article>
            <div class="descripcion_producto">
                <h2>${producto.titulo}</h2>
                <p><i>$${producto.precio}</i></p>
            </div>
            <div class="btn">
            <button class="eliminar_producto" data-id=${producto.id} onclick = "eliminarProducto(${producto.id})"> <span>Eliminar</span> </button>
            </div>
            
            `;
            produCarrito.append(div);  
        });

        const totalCarrito = calcularTotalCarrito();
        actualizarTotalCarrito(totalCarrito);
        
    }else{
        titulo_cart.textContent = "CARRITO VACIO";
    }
}

mostrarProcductosCarrito()










