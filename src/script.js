const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];


// Abrir o Modal do carrinho
cartBtn.addEventListener("click", function() {
  cartModal.style.display = "flex"
})

// Fechar o Modal quando clicar fora
cartModal.addEventListener("click", function(event) {
  if(event.target === cartModal) {
    cartModal.style.display = "none"
  }
})

// Funcao para botar Fechar do modal funcionar
closeModalBtn.addEventListener("click", function(){
  cartModal.style.display = "none"
})

menu.addEventListener("click", function(event) {
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

  if(existingItem) {
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
function updateCartModal(){

}