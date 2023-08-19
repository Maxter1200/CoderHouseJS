// MENUS
const menu0 = ""
+"-------------MENU-------------\n"
+"1 - Comprar productos\n"
+"2 - Ver descuentos\n"
+"3 - Ver Precio Final\n"
+"0 - Salir\n"
+"------------------------------";

const menu1 = ""
+"-----------PRODUCTO-----------\n"
+"1 - Notebook HP - $500\n"
+"2 - Notebook Acer - $550\n"
+"3 - Notebook Lenovo - $600\n"
+"4 - Notebook Asus - $700\n"
+"5 - Notebook Dell - $750\n"
+"0 - Volver\n"
+"------------------------------";

const menu2 = ""
+"----------DESCUENTOS----------\n"
+"- 3 productos = -10%\n"
+"- 5 productos = -15%\n"
+"- 7 productos = -25%\n"
+"------------------------------";

// VARIABLES GLOBALES
let precioSuma = 0;
let cantProd = 0;
let descuento = 0;

// Función que agrega un producto a la compra y muestra información
function agregarProd(precio){
    precioSuma += precio;
    cantProd++;

    alert("¡Producto agregado!\n\nPrecio del producto: $"+precio+".\n\nPrecio en total de la compra: $"+precioSuma+".\nCantidad de productos en la compra: "+cantProd+".");
}

// Función que calcula el debido Descuento a aplicar
function calcDesc(){
    if (cantProd >= 3 && cantProd < 5)
        descuento = 10;
    else if(cantProd >= 5 && cantProd < 7)
        descuento = 15;
    else if(cantProd >= 7)
        descuento = 25;
}

// Función que calcula y muestra el Precio Final
function precioFinal(){
    let pf = 0;

    calcDesc();
    if (descuento == 0)
    {
        pf = precioSuma;
        alert("El Precio Final de su compra es de $"+pf+".\n\nLa compra no posee descuentos. 😕")
    }
    else
    {
        pf = precioSuma - ((descuento / 100) * precioSuma);
        alert("El Precio Final de su compra es de $"+pf+".\n\n¡La compra tiene agregado un descuento del "+descuento+"%! 🤑")
    }
}

// AUXILIARES PARA RECIBIR INPUTS
let option = 0;
let option2 = 0;

// Bienvenida al programa y inicio de bucles de menus
alert("¡Bienvenido al Calculador de Precios!")
do{
    option = parseInt(prompt(menu0));

    switch(option)
    {
        // Productos
        case 1 :
            do
            {
                option2 = parseInt(prompt(menu1));
                switch(option2)
                {
                    case 1:
                        agregarProd(500);
                        break;
                    case 2:
                        agregarProd(550);
                        break;
                    case 3:
                        agregarProd(600);
                        break;
                    case 4:
                        agregarProd(700);
                        break;
                    case 5:
                        agregarProd(750);
                        break;
                    case 0:
                        break;
                    default:
                        alert("Error 😵‍💫. La opción ingresada no es valida.\nIntente nuevamente.")
                        break;
                }
            }
            while(option2 != 0)
            break;
        // Descuentos
        case 2:
            alert(menu2);
            break;
        // Precio Final
        case 3:
            precioFinal();
            break;
        // Salir
        case 0:
            alert("¡Adios!")
            break;
        // Error
        default:
            alert("Error 😵‍💫. La opción ingresada no es valida.\nIntente nuevamente.")
            break;
    }
}
while(option != 0);
