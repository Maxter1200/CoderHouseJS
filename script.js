// Array de Productos
const products = [];

// Clase Producto
class Product{
    constructor(name, model, category, featured, price, off, tags){
        this.id = products.length+1;
        this.name = name;
        this.model = model;
        this.category = category;
        this.featured = featured;
        this.price = price;
        this.off = off;
        this.tags = tags;
        
        const codName = name.replaceAll(" ","").toLowerCase();

        const url =  model.length > 0 ? `res/img/prods/${codName}(${model}).png` : `res/img/prods/${codName}.png`;

        this.image = url;
    }
}

// Función para cargar productos en el DOM, donde se pasan por parámetros el array de productos y el elemento HTML donde se quieren cargar
function loadProductsDOM(arrayProd, elementHTML){
    arrayProd.forEach(prod => {
        let prodHTML = `
        <div class="prodCard">
            <img src="${prod.image}" alt="Imagen ${prod.name}">
            <div class="prodInfo">
                <h3 class="prodName">${prod.name}</h3>
                <div class="prodMid">
                    %REPLACE%
                </div>
                <div class="prodBottom">
                    <button class="material-symbols-outlined prodDetail" id="prodDetail">other_admission</button>
                    <button class="prodAdd" onclick="addProd(${prod.id});">
                        <p>AGREGAR</p>
                        <span class="material-symbols-outlined">add_circle</span>
                    </button>
                </div>
            </div>
        </div>
        `;

        let priceOff = 0;

        if(prod.off > 0)
        { 
            priceOff = prod.price - ((prod.price * prod.off) / 100);

            prodHTML = prodHTML.replace(`%REPLACE%`, 
            `<div class="prodPriceBox">
                <p class="prodPrice">$ ${priceOff}</p>
                <p class="prodOff">-${prod.off}%</p>
            </div>
            <p class="prodNoOff">$ ${prod.price}</p>`);
        }
        else
        {
            priceOff = prod.price;

            prodHTML = prodHTML.replace(`%REPLACE%`, 
            `<div class="prodPriceBox">
                <p class="prodPrice">$ ${priceOff}</p>
            </div>`);
        }

        elementHTML.innerHTML += prodHTML;
    });
}

/* 
CATEGORÍAS

1. Computadoras (Desktop, Servidor, Notebook, Netbook, Mini-PC, All In One)
2. Componentes (Mother, CPU, RAM, GPU, Alm., Fuente, Gabinete, etc.)
3. Periféricos (Mouse, Teclado, Monitor, Audio, etc.)
4. Accesorios (Pad, Sillas, Mochilas, Alm. Ext., Cargadores, Luces LED, etc.)
5. Conectividad y Redes (Cable, Adaptador, Modem, Router, Placa Red, etc.)
*/

products.push(new Product("ASUS Zenbook 15", "UM3504DA", 1, true, 1000, 15, ["computer","laptop"]));
products.push(new Product("MSI Sword 15", "A12U", 1, false, 1250, 0, ["computer","laptop"]));
products.push(new Product("Logitech G305 LightSpeed", "", 3, false, 50, 0, ["peripheral","mouse","wireless"]));
products.push(new Product("Logitech G733", "", 3, true, 100, 10, ["peripheral","headset","wireless"]));
products.push(new Product("REDRAGON Shiva K512", "", 3, false, 50, 0, ["peripheral","keyboard","mechanical"]));
products.push(new Product("SAMSUNG LED 24", "LF24T350FHLCZB", 3, true, 75, 0, ["peripheral","monitor","ips"]));
products.push(new Product("LIAN LI O11 Dynamic EVO", "O11DEX", 2, false, 150, 0, ["component","case"]));
products.push(new Product("GIGABYTE Radeon RX 6700XT", "", 2, true, 500, 12, ["component","gpu"]));

loadProductsDOM(products.filter((prod) => prod.featured == true), document.getElementById("featuredProds"));
loadProductsDOM(products.filter((prod) => prod.featured == false), document.getElementById("newProds"));

// Array de Bolsa de Compras
const shopBagCountHTML = document.getElementById("shopBagCount");
let shopBagProds = [];
let shopBagQuantity = 0;

// Si hay algo en el Local Storage, recupera info de ahí
if(localStorage.getItem("shopBag") != null && localStorage.getItem("shopBag") != "[]") 
{
    shopBagProds = JSON.parse(localStorage.getItem("shopBag"));
    shopBagQuantity = shopBagProds.reduce((sum, prod) => sum + prod.quantity, 0);
    shopBagCountHTML.innerText = shopBagQuantity;

    loadShopBagDOM(shopBagProds, document.getElementById("shopBag"));
}

// Función para agregar productos a la Bolsa de Compras
function addProd(id){
    const prodAdd = products.find((prod) => prod.id == id);
    let priceOff = (prodAdd.off > 0) ? prodAdd.price - ((prodAdd.price * prodAdd.off) / 100) : prodAdd.price;

    if(shopBagProds.length == 0 || shopBagProds.find((prod) => prod.id == id) == null)
    {      
        const obj = {
            id: prodAdd.id,
            quantity: 1,
            name: prodAdd.name,
            image: prodAdd.image,
            price: priceOff
        };

        shopBagProds.push(obj);
    }
    else
    {
        shopBagProds.find((prod) => prod.id == id).quantity++;
        shopBagProds.find((prod) => prod.id == id).price = priceOff * shopBagProds.find((prod) => prod.id == id).quantity;
    }
    
    shopBagQuantity++;
    shopBagCountHTML.innerText = shopBagQuantity;

    localStorage.setItem("shopBag", JSON.stringify(shopBagProds));

    loadShopBagDOM(shopBagProds, document.getElementById("shopBag"));
}

// Función que resta un producto existente de la Bolsa de Compras
function subtractProd(id){
    if(shopBagProds.find((prod) => prod.id == id) != null)
    {
        const prodSub = products.find((prod) => prod.id == id);

        if(prodSub.quantity > 1)
        {
            shopBagProds.find((prod) => prod.id == id).quantity--;
        }
        else
        {
            shopBagProds = shopBagProds.filter((prod) => prod.id != id);
        }
    }
    else
    {
        console.log("ERROR: ID DE PRODUCTO NO ENCONTRADO");
    }
    
    shopBagQuantity--;
    shopBagCountHTML.innerText = shopBagQuantity;

    localStorage.setItem("shopBag", JSON.stringify(shopBagProds));
    loadShopBagDOM(shopBagProds, document.getElementById("shopBag"));
}

// Función que elimina todas las cantidades de un producto existente de la Bolsa de Compras
function removeProd(id){
    if(shopBagProds.find((prod) => prod.id == id) != null)
        shopBagProds = shopBagProds.filter((prod) => prod.id != id);
    else
        console.log("ERROR: ID DE PRODUCTO NO ENCONTRADO");
    
    shopBagQuantity = shopBagProds.reduce((sum, prod) => sum + prod.quantity, 0);
    shopBagCountHTML.innerText = shopBagQuantity;

    localStorage.setItem("shopBag", JSON.stringify(shopBagProds));
    loadShopBagDOM(shopBagProds, document.getElementById("shopBag"));
}

// Función para cargar productos en el DOM y mostrarlos en la Bolsa de Compras
function loadShopBagDOM(arrayProd, elementHTML) {
    elementHTML.innerHTML = "<h3>Compras</h3>";
    arrayProd.forEach(prod => {
        let prodHTML = `
        <div class="bagCard">
            <img src="${prod.image}">
            <div class="bagInfo">
                <p class="bagName">${prod.name}</p>
            <p class="bagPrice">$ ${prod.price}</p>
                <div class="bagQuantity">
                    <button class="material-symbols-outlined" onclick="subtractProd(${prod.id});">remove</button>
                    <p>${prod.quantity}</p>
                    <button class="material-symbols-outlined" onclick="addProd(${prod.id});">add</button>
                </div>
            </div>
            <button class="bagRemove material-symbols-outlined" onclick="removeProd(${prod.id});">delete</button>
        </div>
        `;

        elementHTML.innerHTML += prodHTML;
    });
}

// Expandir el menú de la navbar
let menuExpanded = true;
const expandMenu = document.getElementById("expandMenu");

expandMenu.onclick = () => {
    const mainHTML = document.getElementsByTagName("main")[0];
    if(!menuExpanded)
    {
        expandMenu.style.transform = "rotate(0deg)";
        mainHTML.style.padding = "9.5em 0";
        menuExpanded = true;
    }
    else
    {
        expandMenu.style.transform = "rotate(180deg)";
        mainHTML.style.padding = "6em 0";
        menuExpanded = false;
    }
}
