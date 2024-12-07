// --------- GUARDAMOS NUESTRO FORMULARIO E INPUTS EN CONSTANTES ---------------
const $formulario = document.getElementById("formulario");
const $inputs = document.querySelectorAll("#formulario input")


// --------- OBJETO CON NUESTRAS EXPRESIONES REGULARES ---------------
const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // AQUI LE ESTAMOS DICIENDO QUE EN EL CAMPO USUARIO ACEPTE LETRAS MINUSCULAS Y MAYUSCULAS DE LA A HASTA LA Z, NÚMEROS DEL 0 HASTA EL 9, GUIONES BAJOS, GUIONES MEDIO Y UNA CANTIDAD MINIMA DE 4 CARACTERES Y MAXIMA DE 16 CARACTERES
    contrasena: /^.{4,12}$/, // SÓLO ACEPTARA UN MINIMO DE 4 DIGITOS Y UN MÁXIMO DE 12 DIGITOS
}


// -------------- OBJETO CON NUESTROS CAMPOS ----------------------
const campos = {
    usuario: false,
    contrasena: false,
}


// --------- SWITCH PARA SELECCIONAR EL INPUT DONDE ÉSTE HACIENDO FOCO EL USUARIO  ---------------
const validarFormulario = (e) => {
    switch(e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, "usuario");
        break;
        case "contrasena":
            validarCampo(expresiones.contrasena, e.target, "contrasena");
            validarContrasena2();
        break;
        case "contrasena2":
            validarContrasena2();
        break;
    }
}


// -------------- VALIDAMOS NUESTROS INPUTS ------------------------
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-error");
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-exito");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[campo] = true;
        console.log("Funciona");
    } else {
           document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-error");
           document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-exito");
           document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle");
           document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle");
           document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
           campos[campo] = false;
           console.log("Funciona");
        }
}


// --------- VALIDAMOS NUESTRAS PASSWORD'S ---------------
const validarContrasena2 = () => {
    let inputContrasena1 = document.getElementById("contrasena");
    let inptContrasena2 = document.getElementById("contrasena2");

    if (inputContrasena1.value !== inptContrasena2.value) {
        document.getElementById(`grupo__contrasena2`).classList.add("formulario__grupo-error");
        document.getElementById(`grupo__contrasena2`).classList.remove("formulario__grupo-exito");
        document.querySelector(`#grupo__contrasena2 i`).classList.add("fa-times-circle");
        document.querySelector(`#grupo__contrasena2 i`).classList.remove("fa-check-circle");
        document.querySelector(`#grupo__contrasena2 .formulario__input-error`).classList.add("formulario__input-error-activo");
        campos[contrasena] = false;
        console.log("Funciona");
        } else {
        document.getElementById(`grupo__contrasena2`).classList.remove("formulario__grupo-error");
        document.getElementById(`grupo__contrasena2`).classList.add("formulario__grupo-exito");
        document.querySelector(`#grupo__contrasena2 i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo__contrasena2 i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__contrasena2 .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[contrasena] = true;
        console.log("Funciona");
    }
}


// --------- CAPTURAMOS CADA VEZ QUE EL USUARIO PRESIONA UNA TECLA ---------------
$inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});



// --------- VALIDAMOS TODO NUESTRO FORMULARIO ---------------
$formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const $terminos = document.getElementById("terminos");
    if(campos.usuario && $terminos.checked) {
        // formulario.reset();

        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
        document.getElementById("formulario__mensaje-error").classList.remove("formulario__mensaje-error-activo");

        setTimeout(() => {
            document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
            document.getElementById("formulario__grupo-terminos").style.display = "none";
            
        }, 3000);
        
        document.querySelectorAll(".formulario__grupo-exito").forEach ((icono) => {
            icono.classList.remove("formulario__grupo-exito");
        });
        
        setTimeout(() => {
            location.reload();
        }, 5000);

    } else {
        document.getElementById("formulario__mensaje-error").classList.add("formulario__mensaje-error-activo");
    }
});