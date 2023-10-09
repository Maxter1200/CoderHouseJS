// Array de Productos
let products = [];

// Ruta del archivo HTML actual
const HTMLfilename = window.location.pathname;

// Función FETCH para obtener productos de un archivo JSON local
function getDataJSON(){
    const url = "res/data/data.json";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            products = data.products;
            loadProductsDOM(products.filter((prod) => prod.featured == true), document.getElementById("featuredProds"));
            loadProductsDOM(products.filter((prod) => prod.featured == false), document.getElementById("newProds"));
        })
        .catch(e => console.warn("ERROR: "+e));
}

if(!HTMLfilename.includes("pages"))
    getDataJSON();

// Elementos del Menu de Detalles Modal
const modalTitle = document.getElementById("modalDetailsTitle");
const modalBody = document.getElementById("modalDetailsBody");

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
                    <button class="material-symbols-outlined prodDetail" type="button" 
                    data-bs-toggle="modal" data-bs-target="#modalDetails" data-bs-prod-id="${prod.id}">
                        other_admission
                    </button>
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

    loadDetailsDOM();
}
// Función que cambia el contenido del Modal para que aparezcan los detalles del producto seleccionado
function loadDetailsDOM(){
    const detailBtns = document.querySelectorAll(".prodDetail");
    detailBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-bs-prod-id");
            const product = products.find((prod) => prod.id == id);
            modalTitle.innerText = product.name;

            let detailHTML = "";

            for(const spec in product.details){
                let icon;
                let category;

                switch(spec){
                    case "type":
                        category = "Tipo";
                        icon = "deployed_code";
                        break;
                    case "model":
                        category = "Modelo";
                        icon = "tag";
                        break;
                    case "cpu":
                        category = "Procesador";
                        icon = "memory";
                        break;
                    case "ram":
                        category = "Memoria";
                        icon = "memory_alt";
                        break;
                    case "gpu":
                        category = "Placa de Video";
                        icon = "universal_currency_alt";
                        break;
                    case "storage":
                        category = "Almacenamiento";
                        icon = "hard_drive";
                        break;
                    case "display":
                        category = "Pantalla";
                        icon = "screenshot_monitor";
                        break;
                    case "camera":
                        category = "Cámara";
                        icon = "camera";
                        break;
                    case "audio":
                        category = "Sonido";
                        icon = "volume_up";
                        break;
                    case "network":
                        category = "Conexión a Red";
                        icon = "rss_feed";
                        break;
                    case "battery":
                        category = "Batería";
                        icon = "battery_5_bar";
                        break;
                    case "size":
                        category = "Tamaño";
                        icon = "aspect_ratio";
                        break;
                    case "color":
                        category = "Color";
                        icon = "palette";
                        break;
                    case "dimensions":
                        category = "Dimensiones";
                        icon = "straighten";
                        break;
                    case "weight":
                        category = "Peso";
                        icon = "weight";
                        break;
                    case "rgb":
                        category = "Retroiluminación";
                        icon = "backlight_high";
                        break;
                    case "sensor":
                        category = "Sensor";
                        icon = "sensors";
                        break;
                    case "response":
                        category = "Respuesta";
                        icon = "avg_pace";
                        break;
                    case "driver":
                        category = "Transductor";
                        icon = "headphones";
                        break;
                    case "impedance":
                        category = "Impedancia";
                        icon = "special_character";
                        break;
                    case "sensitivity":
                        category = "Sensibilidad";
                        icon = "sensors_krx";
                        break;
                    case "mic":
                        category = "Micrófono";
                        icon = "mic";
                        break;
                    case "keyboard":
                        category = "Teclado";
                        icon = "keyboard";
                        break;
                    case "distribution":
                        category = "Distribución";
                        icon = "subtitles";
                        break;
                    case "brightness":
                        category = "Brillo";
                        icon = "light_mode";
                        break;
                    case "hdmi":
                        category = "HDMI";
                        icon = "settings_input_hdmi";
                        break;
                    case "form-factor":
                        category = "Form-Factor";
                        icon = "crop";
                        break;
                    case "ports":
                        category = "Puertos";
                        icon = "usb";
                        break;
                    case "core":
                        category = "Núcleo";
                        icon = "memory";
                        break;
                    default:
                        category = spec.charAt(0).toUpperCase() + spec.slice(1);
                        icon = "group_work";
                        break;
                }

                detailHTML += `
                <li>
                    <span class="material-symbols-outlined">${icon}</span>
                    <h4>${category}</h4>
                    <p>${product.details[spec]}</p>
                </li>
                `;
            }

            modalBody.innerHTML = detailHTML;
        });
    }); 
}

// Array de Bolsa de Compras
const shopBagCountHTML = document.getElementById("shopBagCount");
let shopBagProds = [];

// Función para cargar productos en el DOM y mostrarlos en la Bolsa de Compras
function loadShopBagDOM(arrayProd, elementHTML) {
    let prodHTML = "";
    arrayProd.forEach(prod => {
        prodHTML += `
        <div class="bagCard">
            <img src="${prod.image}">
            <div class="bagInfo">
                <p class="bagName">${prod.name}</p>
            <p class="bagPrice">$ ${prod.price}</p>
                <div class="bagQuantity">
                    <button class="material-symbols-outlined" onclick="reduceProd(${prod.id});">remove</button>
                    <p>${prod.quantity}</p>
                    <button class="material-symbols-outlined" onclick="addProd(${prod.id});">add</button>
                </div>
            </div>
            <button class="bagRemove material-symbols-outlined" onclick="removeProd(${prod.id});">delete</button>
        </div>
        `;

        elementHTML.innerHTML = prodHTML;
    });
}

const shopBagClear = document.querySelector(".shopBagClear");
const shopBagTotal = document.getElementById("shopBagTotal");
const shopBagBuy = document.getElementById("shopBagBuy");

// Función que actualiza la Bolsa de Compras y la mantiene en correcto funcionamiento
const shopBagUpdate = () => {
    if (shopBagProds.length > 0)
    {
        localStorage.setItem("shopBag", JSON.stringify(shopBagProds));
        loadShopBagDOM(shopBagProds, document.getElementById("shopBagList"));

        shopBagClear.disabled = false;
        shopBagTotal.classList.remove("d-none");
        shopBagBuy.disabled = false;

        let shopTotalPrice = shopBagProds.reduce((sum, prod) => sum + prod.price, 0);
        shopBagTotal.innerText = `Total: $ ${shopTotalPrice}`;
    }
    else
    {
        if(localStorage.getItem("shopBag") != null)
            localStorage.removeItem("shopBag");

        document.getElementById("shopBagList").innerHTML = '<h3 class="d-flex align-items-center h-100 m-0">La bolsa está vacía</h3>';

        shopBagClear.disabled = true;
        shopBagTotal.classList.add("d-none");
        shopBagBuy.disabled = true;

        shopBagTotal.innerText = "";
    }
};

// Función para contar cantidad de productos en la Bolsa
const shopBagQuantity = () => {
    let quantity = shopBagProds.reduce((sum, prod) => sum + prod.quantity, 0);
    shopBagCountHTML.innerText = quantity != 0 ? quantity : "";
    return quantity;
};

// Si hay algo en el Local Storage, recupera info de ahí
if(localStorage.getItem("shopBag") != null)
{
    shopBagProds = JSON.parse(localStorage.getItem("shopBag"));
    
    shopBagQuantity();
}
shopBagUpdate();

// Función para agregar productos a la Bolsa de Compras
function addProd(id){
    const product = products.find((prod) => prod.id == id);

    if(shopBagProds.find((prod) => prod.id == id) == null)
    {      
        const obj = {
            id: product.id,
            quantity: 1,
            name: product.name,
            image: product.image,
            price: product.price - ((product.price * product.off) / 100),
            unityPrice: product.price - ((product.price * product.off) / 100),
        };

        shopBagProds.push(obj);
        Toastify({
            text: `Se agregó el producto "${product.name}"`,
            duration: 1500,
            gravity: "bottom",
            stopOnFocus: false,
            avatar: "res/icons/add_circle.svg",
            style: {
                background: "#176B87",
            },
        }).showToast();
    }
    else
    {
        let index = shopBagProds.indexOf(shopBagProds.find((prod) => prod.id == id));

        shopBagProds[index].quantity++;
        shopBagProds[index].price = shopBagProds[index].unityPrice * shopBagProds[index].quantity;
    }
    
    shopBagQuantity();

    shopBagUpdate();
}

// Función que resta un producto existente de la Bolsa de Compras
function reduceProd(id){
    if(shopBagProds.find((prod) => prod.id == id) != null){
        const product = shopBagProds.find((prod) => prod.id == id);
    
        if(product.quantity > 1)
        {
            let index = shopBagProds.indexOf(shopBagProds.find((prod) => prod.id == id));
        
            shopBagProds[index].quantity--;
            shopBagProds[index].price = shopBagProds[index].unityPrice * shopBagProds[index].quantity;
        }
        else
        {
            removeProd(id);
        }
    }
    else
    {
        console.log(`ERROR: ID #${id} DE PRODUCTO NO ENCONTRADO`);
    }
    
    shopBagQuantity();

    shopBagUpdate();
}

// Función que elimina todas las cantidades de un producto existente de la Bolsa de Compras
function removeProd(id){
    let product = shopBagProds.find((prod) => prod.id == id);

    if(product != null)
    {
        shopBagProds = shopBagProds.filter((prod) => prod.id != id);

        Toastify({
            text: `Se eliminó el producto "${product.name}"`,
            duration: 1500,
            gravity: "bottom",
            stopOnFocus: false,
            avatar: "res/icons/delete.svg",
            style: {
                background: "#176B87",
            },
        }).showToast();
    }
    else
    {
        console.log(`ERROR: ID #${id} DE PRODUCTO NO ENCONTRADO`);
    }
    
    shopBagQuantity();

    shopBagUpdate();
}

// Función que elimina todas los productos de la Bolsa de Compras
function clearProds(){
    shopBagProds = [];
    localStorage.removeItem("shopBag");
    
    Toastify({
        text: `Se vació la Bolsa de Compras`,
        duration: 1500,
        gravity: "bottom",
        stopOnFocus: false,
        avatar: "res/icons/clear.svg",
        style: {
            background: "#176B87",
        },
    }).showToast();

    shopBagQuantity();
    shopBagUpdate();

}

shopBagClear.addEventListener("click", clearProds);

// Función de "Compra"
shopBagBuy.onclick = () => {
    Swal.fire({
        titleText: '¡Compra ficticia realizada!',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    }).then(() => clearProds());
};

// Expandir el menú de la navbar
let menuExpanded = false;
const expandMenu = document.getElementById("expandMenu");
const mainHTML = document.querySelector("main");

expandMenu.onclick = () => {
    if(!menuExpanded)
    {
        expandMenu.style.transform = "rotate(-180deg)";
        mainHTML.style.padding = "9.5em 0";
        menuExpanded = true;
        sessionStorage.setItem("menuExpanded", "true");
    }
    else
    {
        expandMenu.style.transform = "rotate(0deg)";
        mainHTML.style.padding = "6em 0";
        menuExpanded = false;
        sessionStorage.setItem("menuExpanded", "false");
    }
}

if(sessionStorage.getItem("menuExpanded") == "true")
    expandMenu.click();

let userSession = sessionStorage.getItem("userSession") ?? false;
const profileMenuHTML = document.getElementById("profileMenu");

let pathURL = ""
if(!HTMLfilename.includes("pages"))
    pathURL = "pages/";

if(!userSession)
{
    profileMenuHTML.innerHTML = `
        <li><h3 class="dropdown-header" id="profileUsername">No se ha iniciado sesión</h3></li>
        <li><a href="${pathURL + "login.html"}" class="dropdown-item">
            <span class="material-symbols-outlined">swipe_right_alt</span>
            <p>Iniciar Sesión</p>
        </a></li>
        <li><a href="${pathURL + "register.html"}" class="dropdown-item">
            <span class="material-symbols-outlined">play_for_work</span>
            <p>Registrarse</p>
        </a></li>
    `
}
else
{
    profileMenuHTML.innerHTML = `
        <li><h3 class="dropdown-header" id="profileUsername">${userSession}</h3></li>
        <li type="button" class="dropdown-item" id="btLogout">
            <span class="material-symbols-outlined">swipe_left_alt</span>
            <p>Cerrar Sesión</p>
        </li>
    `

    let pathIndex = "";
    if(HTMLfilename.includes("pages"))
        pathIndex = "../";

    const btLogout = document.getElementById("btLogout");
    btLogout.onclick = () => {
        sessionStorage.removeItem("userSession");
        window.location.href = pathIndex + "index.html";
    };
}

if(HTMLfilename.includes("login")){
    let usersList = JSON.parse(localStorage.getItem('usersList')) || [];

    const userEmailHTML = document.getElementById("txtEmail");
    userEmailHTML.value = localStorage.getItem("rememberUser") ?? "";

    const btLogin = document.getElementById("btLogin");
    btLogin.onclick = () => {
        const userEmail = userEmailHTML.value;
        const userPass = document.getElementById("txtPassword").value;
        const checkRemember = document.getElementById("checkRemember").checked;

        let boolEmail = false;
        let boolPass = false;

        if(usersList.some(user => user.email == userEmail))
        {
            boolEmail = true;

            if(usersList.some(user => user.password == userPass))
            {
                boolPass = true;
            }
            else
            {
                Toastify({
                    text: "La contraseña ingresada es incorrecta",
                    duration: 3000,
                    gravity: "bottom",
                    stopOnFocus: false,
                    avatar: "../res/icons/lock.svg",
                    style: {
                        background: "#176B87",
                    },
                }).showToast();
            }
        }
        else
        {
            Toastify({
                text: "El correo electrónico ingresado no está registrado",
                duration: 3000,
                gravity: "bottom",
                stopOnFocus: false,
                avatar: "../res/icons/email.svg",
                style: {
                    background: "#176B87",
                },
            }).showToast();
        }

        

        if(boolEmail && boolPass)
        {
            if(checkRemember)
                localStorage.setItem("rememberUser", userEmail);

            sessionStorage.setItem("userSession", userEmail);

            Swal.fire({
                titleText: '¡Inicio exitoso!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
        
            }).then(res => {
                window.location.href = "../index.html";
            });
        }
    };
}
else if(HTMLfilename.includes("register"))
{
    let usersList = JSON.parse(localStorage.getItem('usersList')) || [];
    const btRegister = document.getElementById("btRegister");
    btRegister.onclick = () => {
        const userEmail = document.getElementById("txtEmail").value;
        const userPass = document.getElementById("txtPassword").value;
        const checkTerms = document.getElementById("checkTerms");

        let boolEmail = false;
        let boolPass = false;
        let boolTerms = false;

        if(userEmail.includes("@"))
        {
            boolEmail = true;
        }
        else
        {
            Toastify({
                text: "El correo electrónico tiene un formato no valido",
                duration: 3000,
                gravity: "bottom",
                stopOnFocus: false,
                avatar: "../res/icons/email.svg",
                style: {
                    background: "#176B87",
                },
            }).showToast();
        }

        if(userPass.length >= 8)
        {
            boolPass = true;
        }
        else
        {
            Toastify({
                text: "La contraseña debe incluir al menos 8 caracteres",
                duration: 3000,
                gravity: "bottom",
                stopOnFocus: false,
                avatar: "../res/icons/lock.svg",
                style: {
                    background: "#176B87",
                },
            }).showToast();
        }

        if(checkTerms.checked)
        {
            boolTerms = true;
        }
        else
        {
            Toastify({
                text: "Los Términos de Uso deben ser aceptados",
                duration: 3000,
                gravity: "bottom",
                stopOnFocus: false,
                avatar: "../res/icons/terms.svg",
                style: {
                    background: "#176B87",
                },
            }).showToast();
        }

        if(boolEmail && boolPass && boolTerms)
        {
            usersList.push({
                email: userEmail,
                password: userPass
            });
            localStorage.setItem("usersList", JSON.stringify(usersList));
            sessionStorage.setItem("userSession", userEmail);

            Swal.fire({
                titleText: '¡Registrado con éxito!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
        
            }).then(res => {
                window.location.href = "../index.html";
            });
        }
    };
}

/* 
CATEGORÍAS

1. Computadoras (Desktop, Servidor, Notebook, Netbook, Mini-PC, All In One)
2. Componentes (Mother, CPU, RAM, GPU, Alm., Fuente, Gabinete, etc.)
3. Periféricos (Mouse, Teclado, Monitor, Audio, etc.)
4. Accesorios (Pad, Sillas, Mochilas, Alm. Ext., Cargadores, Luces LED, etc.)
5. Conectividad y Redes (Cable, Adaptador, Modem, Router, Placa Red, etc.)

(Dejo esto aca porque no se puede poner comentarios en archivos .json)
*/
