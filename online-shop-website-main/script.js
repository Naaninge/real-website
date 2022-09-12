let addToCart = document.querySelectorAll('.add-cart')

let products =[
    {
        name: 'Colourfull Bracelet',
        tag:  'colorful_bracelet',
        price: 35,
        inCart: 0
    },
    {
        name: 'Blue Bracelet',
        tag:  'blue_bracelet',
        price: 50,
        inCart: 0
    },
    {
        name: 'Pearl Bracelet',
        tag:  'pearl_bracelet',
        price: 15,
        inCart: 0
    },
    {
        name: 'White and Blue Earings',
        tag:  'white_and_blue_earings',
        price: 15,
        inCart: 0
    },
    {
        name: 'Gold Earings',
        tag:  'gold_earings',
        price: 40,
        inCart: 0
    },
    {
        name: 'Diamond Ring',
        tag:  'diamond_ring',
        price: 50,
        inCart: 0
    },
    {
        name: 'Blue Earings',
        tag:  'blue_earing',
        price: 75,
        inCart: 0
    },
    {
        name: 'Diamond Bracelet',
        tag:  'diamond_bracelet',
        price: 35,
        inCart: 0
    },


]

const list = document.getElementById('list')

function setList(group){
    emptyList()
    for (const product of group){
        const item = document.createElement('li')
        item.classList.add('list-group-item')
        const text = document.createTextNode(product.name)
        item.appendChild(text)
        list.appendChild(item)
    }
    if(group.length === 0){
        setNoResults()
    }

}
function  emptyList(){
    while(list.firstChild){
        list.removeChild(list.firstChild)
    }
}
function setNoResults(){
        const item = document.createElement('li')
        item.classList.add('list-group-item')
        const text = document.createTextNode('No results found')
        item.appendChild(text)
        list.appendChild(item)
    }


function getRelevancy(value, searchTerm){
    if(value === searchTerm){
        return 2
    }
    else if(value.startsWith(term)){
        return 1
    }
    else{
        return 0
    }
}
const searchInput = document.getElementById('search')

searchInput.addEventListener('input', (event) =>{
    let value = event.target.value
    if(value && value.trim().length > 0 ){
       value = value.trim().toLowerCase()
       setList(products.filter( product =>{
        return product.name.includes(value)
       }))
    }

    else{
        emptyList()
    }
})
for(let i=0; i< addToCart.length; i++){
    addToCart[i].addEventListener('click', () =>{
        cartCount(products[i])
        totalPrice(products[i])
    })
}
function onLoadCartCount(){
    let productCount = localStorage.getItem('cartCount')
     if(productCount){
        document.querySelector('.cart span').textContent = productCount
     }
}


function cartCount(product){
    let productCount = localStorage.getItem('cartCount')
   
    productCount = parseInt(productCount)
    if(productCount){
    localStorage.setItem('cartCount',productCount + 1)
    document.querySelector('.cart span').textContent = productCount +1

}else{
    localStorage.setItem('cartCount',1)
    document.querySelector('.cart span').textContent = 1
}
setItems(product)
}

function setItems(product){
   let cartItems = localStorage.getItem('productsInCart')
   cartItems = JSON.parse(cartItems)

   if(cartItems != null){
   if(cartItems[product.tag] == undefined){
        cartItems = {
            ...cartItems,
            [product.tag]: product
        }

    }
    cartItems[product.tag].inCart +=1
}else {
    product.inCart = 1

     cartItems = {
        [product.tag]: product
    }
 } 
 localStorage.setItem('productsInCart',JSON.stringify(cartItems))
}
function totalPrice(product){
    let cartPrice = localStorage.getItem('totalPrice')

    
    console.log('My cartPrice is',cartPrice)

    if(cartPrice  != null){
        cartPrice = parseInt(cartPrice)
        localStorage.setItem('totalPrice',cartPrice + product.price)
    }
    else{
    localStorage.setItem('totalPrice',product.price)
    }
}
function displayCart(){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let productContainter = document.querySelector('.items')
    let cartPrice = localStorage.getItem('totalPrice')

    if(cartItems && productContainter){
      productContainter.innerHTML = ''
      Object.values(cartItems).map(item =>{
       /* productContainter.innerHTML +=`
        <!--<div class ="product">
        <ion-icon name="close-circle"></ion-icon>
        <img src="./images/${item.tag}.jpg">
        <span>${item.name}</span>
        </div>
        <div class="price">N$ ${item.price},00
        </div>
        <div class="quantity">
         <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
         </div>
         <div class="total">
        N$ ${item.inCart + item.price},00-->
         </div>
        `
      })*/
      productContainter.innerHTML +=`
       
      <div class="container">
       <div class="row">
       <div class="col"><ion-icon name="close-circle"></ion-icon></div>
       <div class="col"> 
       <img src="./images/${item.tag}.jpg"></div>
       <div class="col"> <span>${item.name}</span></div>
       <div class="col">N$ ${item.price},00</div>
       <div class="col"><ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
       <span>${item.inCart}</span>
      <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon></div>
       <div class="col">N$ ${item.inCart + item.price},00</div>
      </div>
     
      </div>
      
      
      `})
      productContainter.innerHTML +=`
      <div class="cartTotal">
      <h4 class="cartTotalTitle text-right">Cart Total</h4>
      <h4 class ="cartTotale text-right">$${cartPrice},00</h4>
      </div>
      `
    }
}
onLoadCartCount()
displayCart()