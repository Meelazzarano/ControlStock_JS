//----------------OBJETO----------------
class Product{
    constructor (nombre, unidades, precioUnit, tipoIva){
        this.nombre = nombre;
        this.unidades = parseInt(unidades);
        this.precioUnit = precioUnit;
        this.tipoIva = tipoIva;
    }
} 

//----------------FUNCIONES "estéticas"----------------
function limpiarPantalla () { 
    let pantalla=document.getElementById("pantalla");
    document.body.removeChild(pantalla);

    pantalla=document.createElement("div");
    let etiqueta=document.createAttribute("id");
    etiqueta.value="pantalla",
    pantalla.setAttributeNode(etiqueta);
    document.body.appendChild(pantalla);
}
function ordenarArray (arrayAOrdenar) {
    arrayAOrdenar.sort ( (a,b) => (a.nombre > b.nombre)? 1 : ((b.nombre > a.nombre)? -1 : 0))
}

//----------------FUNCIONES "sección nuevo"----------------
function formularioEnPantalla () {
    limpiarPantalla();

    let formulario = document.createElement ("form");
    formulario.innerHTML=
        `
        <!-- Grupo: Nombre -->
            <div class="formulario__grupo" id="grupo__nombre">
                <label for="nombre" class="formulario__label">Nombre del producto</label>
                <div class="formulario__grupo-input">
                    <input type="text" name="nombre" class="formulario__input" id="nombreProdu" maxlength="30" placeholder="Ej: Resma A4">
                    <i class="formulario__validacion-estado fas fa-times-circle"></i>
                </div>
            </div>

        <!-- Grupo: Cantidad-->
            <div class="formulario__grupo" id="grupo__cantidad">
                <label for="cantidad" class="formulario__label">Cantidad</label>
                <div class="formulario__grupo-input">
                    <input type="number" name="cantidad" class="formulario__input" id="cantidad" maxlength="10" placeholder="Ej: 103">
                    <i class="formulario__validacion-estado fas fa-times-circle"></i>
                </div>
            </div>

        <!-- Grupo: Precio unitario-->
            <div class="formulario__grupo" id="grupo__precio">
                <label for="precio" class="formulario__label">Precio Unitario</label>
                <div class="formulario__grupo-input">
                    <input type="number" name="precioUnit" class="formulario__input" id="precioUnit" maxlength="15" placeholder="Ej: 5.38">
                    <i class="formulario__validacion-estado fas fa-times-circle"></i>
                </div>
            </div>
        
        <!-- Grupo: IVA-->
            <div class="formulario__grupo" id="grupo__iva">
                <label class="formulario__label-iva">Alícuota de IVA</label>
                    <input type="radio" name="tipoIva" class="formulario__input-iva" id="tipoIva" value="0.21">21%
                    <input type="radio" name="tipoIva" class="formulario__input-iva" id="tipoIva" value="0.105">10.5%
                    <input type="radio" name="tipoIva" class="formulario__input-iva" id="tipoIva" value="0.27">27%                
            </div>

        <div class="formulario__grupo formulario__grupo-btn-enviar">
            <button type="button" class="formulario__btn" id="botonEnviar">Enviar</button>
            <button type="reset" class="formulario__btn">Limpiar</button>
        </div>
        `
    let etiqueta=document.createAttribute("name");
    etiqueta.value="formulario";
    formulario.setAttributeNode(etiqueta);
    
    etiqueta=document.createAttribute("class");
    etiqueta.value="formulario";
    formulario.setAttributeNode(etiqueta);

    $("#pantalla").append(formulario);

    $("#botonEnviar").on ('click', ()=> { obtenerDatosFormulario (arrayStock)});  
}
function obtenerDatosFormulario (arrayStock) {
    const form = document.forms["formulario"]

    let nombreProdu = form.nombre.value.toUpperCase();       
    let cantidadProdu = form.cantidad.value;
    let precioProdu = form.precioUnit.value;
    let ivaProdu = form.tipoIva.value;
    
        if (nombreProdu==""||cantidadProdu==""||precioProdu==""||ivaProdu=="") {
            $('#pantalla').append("<p class='mensaje__incompleto'> <i class='fas fa-exclamation-triangle'></i> Formulario incompleto. Ingrese la totalidad de los datos.</p>");
            $('p').slideDown();
            return;
        }
        
    const encontrado = arrayStock.find(nombre => nombre.nombre === nombreProdu);
        if (encontrado != undefined) {
            $('p').remove();
            $('#pantalla').append("<p class='mensaje__error'> <i class='fas fa-times-circle'></i> El producto ya existe, ingrese la compra.</p>");
            $('p').slideDown();
        } else {
            let ingreso = new Product (nombreProdu, cantidadProdu, precioProdu, ivaProdu)
                arrayStock.push ( ingreso );
            $('p').remove();
                $('#pantalla').append("<p class='mensaje__correcto'> <i class='fas fa-check-circle'></i> Producto dado de alta con éxito!</p>");
                $('p').slideDown();
            setTimeout (function () {
                limpiarPantalla()
            }, 800);
        }

    ordenarArray(arrayStock);

    return arrayStock;
}

//----------------FUNCIONES "operaciones sobre array"----------------
function listaDesplegable (productoDisponibles) {
    let formulario = document.createElement ("form");
            etiqueta=document.createAttribute("id");
            etiqueta.value="formulario";
            formulario.setAttributeNode(etiqueta);
                formulario.innerHTML= 
                    `
                    <p> Seleccione el producto: </p>
                    `
        let opciones = document.createElement ("select");
            etiqueta=document.createAttribute("id");
            etiqueta.value="select__producto";
            opciones.setAttributeNode(etiqueta);
            etiqueta=document.createAttribute("class");
            etiqueta.value="form-select";
            opciones.setAttributeNode(etiqueta);
        
    $("#pantalla").append(formulario)
    $("#formulario").append(opciones);
    $("select").append("<option disabled selected=''> Seleccione un producto </option>");

        for (const product of productoDisponibles) {
            let contenedor = document.createElement ("option");
            
            etiqueta=document.createAttribute("value");
            etiqueta.value=product.nombre;
            contenedor.setAttributeNode(etiqueta);

            contenedor.innerText = 
                `    ${product.nombre}   `
            $("#select__producto").append(contenedor);
        }  
    
    var select = document.getElementById("select__producto")
        select.onchange = function () {
            selectedProduct = select.options[select.selectedIndex].value;
            sessionStorage.setItem('seleccionado', selectedProduct);
        };
}
function setQuantity (operacion) {   
    
    let contenedor = document.createElement ("div");
        contenedor.innerHTML=
            `
            <div class="formulario__grupo">
                <label for="cantidad" class="formulario__label">Cantidad:</label>
                <div class="formulario__grupo-input">
                    <input type="number" name="cantidad" class="formulario__input" id="cantidadUnidades" maxlength="10" placeholder="Ej: 103">
                    <i class="formulario__validacion-estado fas fa-times-circle"></i>
                </div>
            </div>
        
            <div class="formulario__grupo formulario__grupo-btn-enviar">
                <button type="button" class="formulario__btn" id="botonEnviarCantidad">Enviar</button>
                <button type="reset" class="formulario__btn">Limpiar</button>
            </div>
            `
        $("#pantalla").append(contenedor);

    $('#cantidadUnidades').on ('change', () => { sessionStorage.setItem('cantidad', $("#cantidadUnidades").val()) }); 
    
    switch (operacion) {
        case "suma": $("#botonEnviarCantidad").on('click', () => {operacionSumar(arrayStock)});
            break;
        case "resta": $("#botonEnviarCantidad").on('click', () => {operacionRestar(arrayStock)});
            break;
        default: console.log ("Error")
            break;
    }

    $("#botonEnviarCantidad").on('click', () => {
        $('#pantalla').append("<p class='mensaje__correcto'> <i class='fas fa-check-circle'></i> Transacción registrada con éxito!</p>");
        $('p').slideDown();
    });

}     

//----------------FUNCIONES "sección compra"----------------
function ingresaCompra (arrayStock) {
    
    limpiarPantalla();

    if (arrayStock.length==0) {
            let contenedor = document.createElement ("div");
            contenedor.innerHTML =
                `
                <p class="mensaje__error"> <i class='fas fa-times-circle'></i> No hay productos dados de alta </p>
                <br>
                `
            $("#pantalla").append(contenedor); 
    } else {
        listaDesplegable (arrayStock);
        setQuantity("suma");  
    }   
}
function operacionSumar (arrayStock) {
    arrayStock.map(function(dato){
        selectedProduct= sessionStorage.getItem('seleccionado');
        cantidad = parseInt(sessionStorage.getItem('cantidad'));  
            
        if(dato.nombre == selectedProduct){
            dato.unidades += cantidad;
        }
        return dato;
    });
    sessionStorage.clear(); 
}

//----------------FUNCIONES "sección venta"----------------
function ingresaVenta (arrayStock) {
    
    limpiarPantalla();

    if (arrayStock.length==0) {
            let contenedor = document.createElement ("div");
            contenedor.innerHTML =
                `
                <p class="mensaje__error"> <i class='fas fa-times-circle'></i> No hay productos dados de alta </p>
                <br>
                `
            $("#pantalla").append(contenedor); 
    } else {
        listaDesplegable (arrayStock);
        setQuantity("resta");  
    }   
}
function operacionRestar (arrayStock) {
    arrayStock.map(function(dato){
        selectedProduct= sessionStorage.getItem('seleccionado');
        cantidad = parseInt(sessionStorage.getItem('cantidad'));  
            
        if(dato.nombre == selectedProduct){
            dato.unidades -= cantidad;
        }
        return dato;
    });
    sessionStorage.clear(); 
}


//----------------FUNCIONES "sección stock"----------------
function mostrarStock (arrayStock) {
    limpiarPantalla();
       
    if (arrayStock.length==0) {
            let contenedor = document.createElement ("div");
            contenedor.innerHTML =
                `
                <p class="mensaje__error"><i class='fas fa-times-circle'></i> No se ingresaron productos </p>
                <br>
                `
            $("#pantalla").append(contenedor);
    } else {
        for (const product of arrayStock) {
            let contenedor = document.createElement ("div");
                etiqueta=document.createAttribute("class");
                etiqueta.value="container row";
                contenedor.setAttributeNode(etiqueta);
                contenedor.innerHTML =
                    `
                    <p class="col"> Producto: ${product.nombre} </p>
                    <p class="col"> Cantidad: ${product.unidades} </p>
                    <p class="col"> Precio: $ ${product.precioUnit} </p>
                    <p class="col"> Alícuota Iva: ${product.tipoIva} </p>
                    <br>
                    `
            $("#pantalla").append(contenedor);
        }
    }
}

//----------------PROGRAMA----------------
let cantidad=0;
let arrayStock= [];
var selectedProduct="";

$("#nuevo").on('click', ()=> { formularioEnPantalla ()});

$("#compra").on('click', ()=> { ingresaCompra(arrayStock,selectedProduct,cantidad)});

$("#venta").on('click', ()=> { ingresaVenta(arrayStock)});

$("#mostrar").on('click', ()=> { mostrarStock (arrayStock)});
