// Clase Producto
class Product{
    constructor(id, name, price){
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// Array base de Objetos
const products = [
    new Product(1, "Notebook HP", 500),
    new Product(2, "Notebook Acer", 550),
    new Product(3, "Notebook Lenovo", 600),
    new Product(4, "Notebook Asus", 700),
    new Product(5, "Notebook Dell", 750)
];


// MENUS
const menu = ""
+"-------------MENU-------------\n"
+"1 - Productos\n"
+"2 - Descuentos\n"
+"3 - Precio de Compra\n"
+"0 - Salir\n"
+"------------------------------";

function menuProd(){
    let prodList = "";

    for(const prod of products){
        prodList += `${prod.id} - ${prod.name} - $${prod.price}\n`;
    }

    let text = ``
    +`-----------PRODUCTO-----------\n`
    +`${prodList}`
    +`* - Agregar nuevo producto\n`
    +`0 - Volver\n`
    +`------------------------------`;

    return text;
};

const menuDisc = ""
+"----------DESCUENTOS----------\n"
+"- 3 productos = -10%\n"
+"- 5 productos = -15%\n"
+"- 7 productos = -25%\n"
+"------------------------------";

// Array de productos dentro de la compra
const buyProdList = [];

// Función que calcula el debido Descuento a aplicar
const discount = () => {
    let quantity = buyProdList.length;

    if(quantity >= 7)
        return 25;
    else if(quantity >= 5)
        return 15;
    else if(quantity >= 3)
        return 10;
    else
        return 0;
}

// Función que agrega un producto a la compra y muestra información
function buyProd(prod){
    buyProdList.push(prod);

    text = ``
    +`¡Producto "${prod.name}" agregado!\n`
    +`Precio del producto: $${prod.price}\n\n`
    +`Precio en total de la compra: $${priceTotal(buyProdList)}\n`
    +`Cantidad de productos en la compra: ${buyProdList.length}`;

    alert(text);
}

// Devuelve el Precio Total de la compra
const priceTotal = (products) => {
    let total = 0;

    if(products)
    {
        for (const prod of products) {
            total += prod.price;
        }
    }

    return total;
}

// Función que calcula y muestra el Precio Final
function priceFinal(){
    let final = 0;
    let total = priceTotal(buyProdList);

    if(buyProdList.length == 0)
    {
        alert("Usted no agrego ningún producto a su compra. 🫤")
    }
    else
    {
        let prodList = "";
        let i=1;

        buyProdList.forEach( prod => {
            prodList += `${i++} - ${prod.name} - $${prod.price}\n`;
        });

        if (discount() == 0)
        {
            final = total;
            alert(prodList+"\nEl Precio Final de su compra es de $"+final+".\n\nLa compra no posee descuentos. 😕")
        }
        else
        {
            final = total - ((discount() / 100) * total);
            alert(prodList+"\nEl Precio Final de su compra es de $"+final+".\n\n¡La compra tiene agregado un descuento del "+discount()+"%! 🤑")
        }
    }
}

// Función utilizada para la selección de items del menu
function selectProd()
{
    let input = prompt(menuProd());

    if(input == "*")
        return "*";
    else
        return parseInt(input);
}

// Función que al recibir un ID devuelve un producto
function searchProd(id)
{
    return products.find(p => p.id == id)
}

// Función para añadir un nuevo producto a la lista
function addProd()
{
    let name = "";
    while(!name)
        name = prompt("Ingrese el nombre del nuevo producto:");

    let price;
    while(!price)
        price = parseInt(prompt("Ingrese el precio del nuevo producto:"));
    
    let prod = new Product(products.length+1, name, price);
    products.push(prod);
}

// AUXILIARES PARA RECIBIR INPUTS
let option = 0;
let option2;

// Bienvenida al programa y inicio de bucles de menus
alert("¡Bienvenido al Calculador de Precios!")
do{
    option = parseInt(prompt(menu));

    switch(option)
    {
        // Productos
        case 1 :
            do
            {
                option2 = selectProd();

                if(option2 != 0 && option2 != "*")
                {
                    let search = searchProd(option2);

                    if(search)
                        buyProd(search);
                    else
                        alert("Error 😵‍💫. La opción ingresada no es valida.\nIntente nuevamente.");
                }
                else if(option2 == "*")
                    addProd();

            }
            while(option2 != 0)
            break;
        // Descuentos
        case 2:
            alert(menuDisc);
            break;
        // Precio Final
        case 3:
            priceFinal();
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
