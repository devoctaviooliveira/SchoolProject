const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];


// Abrir o Modal do carrinho
cartBtn.addEventListener("click", function () {
  updateCartModal();
  cartModal.style.display = "flex"
})

// Fechar o Modal quando clicar fora
cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none"
  }
})

// Funcao para botar Fechar do modal funcionar
closeModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none"
})

menu.addEventListener("click", function (event) {
  let parentButton = event.target.closest(".add-to-cart-btn")

  if (parentButton) {
    const name = parentButton.getAttribute("data-name")
    const time = parentButton.getAttribute("data-time")

    addToCart(name, time)
  }
})


//Funcao para adicionar no carrinho
function addToCart(name, time) {
  const existingItem = cart.find(item => item.name === name)

  if (existingItem) {
    alert("Vc ja add essa aula");
    return;
  }

  cart.push({
    name,
    time
  })

  updateCartModal()
}

//Atualiza o carrinho
function updateCartModal() {
  cartItemsContainer.innerHTML = "";

  cart.forEach(item => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "justify-between", "mb-6", "flex-col")

    cartItemElement.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <p class="font-medium">${item.name}</p>
          <p class="font-medium">${item.time}</p>
        </div>

        
        <button class="remove-from-cart-btn cursor-pointer" data-name="${item.name}">
          Remover
        </button>
        
      </div>
    `

    cartItemsContainer.appendChild(cartItemElement)
  })


  cartCounter.innerHTML = cart.length;

}

//Função para remover o item do carrinho
cartItemsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const name = event.target.getAttribute("data-name")

    removeItemCart(name);
  }
})

function removeItemCart(name) {
  const index = cart.findIndex(item => item.name === name);

  if (index !== -1) {
    const item = cart[index];

    cart.splice(index, 1);
    updateCartModal();
  }
}

addressInput.addEventListener("input", function(event){
  let inputValue = event.target.value;

  if (inputValue !== "") {
    addressInput.classList.remove("border-red-500")
    addressWarn.classList.add("hidden")
  }
})

// Finalizar pedido
checkoutBtn.addEventListener("click", function () {

  const isOpen = checkRestaurantOpen();
  if (!isOpen) {
    alert("Não estamos em horário de atendimentos")
  }

  if (cart.length === 0) return;
  if (addressInput.value === "") {
    addressWarn.classList.remove("hidden")
    addressInput.classList.add("border-red-500")
    return;
  }

  // Enviar o pedido para api do whats
  const cartItems = cart.map((item) => {
    return (
      ` ${item.name} (${item.time}) |`
    )
  }).join("")

  const message = encodeURIComponent(cartItems)
  const phone = "12988866084"

  window.open(`https://wa.me/${phone}?text=${message} Nome completo: ${addressInput.value}`, "_blank")

  cart.length = [];
  updateCartModal();
})

//Verificar a hora e manipular o card horario
function checkRestaurantOpen() {
  const data = new Date();
  const hora = data.getHours()
  return hora >= 9 && hora < 17;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if (isOpen) {
  spanItem.classList.remove("bg-red-500")
  spanItem.classList.add("bg-green-600")
}else{
  spanItem.classList.remove("bg-green-600")
  spanItem.classList.add("bg-red-500")
}