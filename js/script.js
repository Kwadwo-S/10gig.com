let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
   navbar.classList.add('active');
}
document.querySelector('#close-menu-info').onclick = () =>{
   navbar.classList.remove('active');
}

window.onscroll = () =>{
   navbar.classList.remove('active');
   contactInfo.classList.remove('active');
}

// // parallsx

// let parallax = document.querySelectorAll('.parallax');

// window.addEventListener('scroll', () => {
//     let offset = window.pageYOffset;

//     parallax.forEach((prllx) => {
//         // console.log(offset- prllx.offsetTop);

//         prllx.style.backgroundPositionY = (offset- prllx.offsetTop) * .7 + "px";
//     })
// })

// product script
if (document.readyState == 'loading') {
   document.addEventListener('DOMContentLoaded', ready)
} else {
   ready()
}

function ready() {
   var removeCartItemButtons = document.getElementsByClassName('btn-danger')
   for (var i = 0; i < removeCartItemButtons.length; i++) {
       var button = removeCartItemButtons[i]
       button.addEventListener('click', removeCartItem)
   }

   var quantityInputs = document.getElementsByClassName('cart-quantity-input')
   for (var i = 0; i < quantityInputs.length; i++) {
       var input = quantityInputs[i]
       input.addEventListener('change', quantityChanged)
   }

   var addToCartButtons = document.getElementsByClassName('shop-item-button')
   for (var i = 0; i < addToCartButtons.length; i++) {
       var button = addToCartButtons[i]
       button.addEventListener('click', addToCartClicked)
   }

   document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
   alert('Thank you for your purchase')
   var cartItems = document.getElementsByClassName('cart-items')[0]
   while (cartItems.hasChildNodes()) {
       cartItems.removeChild(cartItems.firstChild)
   }
   updateCartTotal()
}

function removeCartItem(event) {
   var buttonClicked = event.target
   buttonClicked.parentElement.parentElement.remove()
   updateCartTotal()
}

function quantityChanged(event) {
   var input = event.target
   if (isNaN(input.value) || input.value <= 0) {
       input.value = 1
   }
   updateCartTotal()
}

function addToCartClicked(event) {
   var button = event.target
   var shopItem = button.parentElement.parentElement
   var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
   var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
   var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
   addItemToCart(title, price, imageSrc)
   updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
   var cartRow = document.createElement('div')
   cartRow.classList.add('cart-row')
   var cartItems = document.getElementsByClassName('cart-items')[0]
   var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
   for (var i = 0; i < cartItemNames.length; i++) {
       if (cartItemNames[i].innerText == title) {
           alert('This item is already added to the cart')
           return
       }
   }
   var cartRowContents = `
       <div class="cart-item cart-column">
           <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
           <span class="cart-item-title">${title}</span>
       </div>
       <span class="cart-price cart-column">${price}</span>
       <div class="cart-quantity cart-column">
           <input class="cart-quantity-input" type="number" value="1">
           <button class="btn btn-danger" type="button">REMOVE</button>
       </div>`
   cartRow.innerHTML = cartRowContents
   cartItems.append(cartRow)
   cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
   cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
   var cartItemContainer = document.getElementsByClassName('cart-items')[0]
   var cartRows = cartItemContainer.getElementsByClassName('cart-row')
   var total = 0
   for (var i = 0; i < cartRows.length; i++) {
       var cartRow = cartRows[i]
       var priceElement = cartRow.getElementsByClassName('cart-price')[0]
       var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
       var price = parseFloat(priceElement.innerText.replace('₵', ''))
       var quantity = quantityElement.value
       total = total + (price * quantity)
   }
   total = Math.round(total * 100) / 100
   document.getElementsByClassName('cart-total-price')[0].innerText = '₵' + total
}
//  Autoslide

const slides=document.querySelector(".slider").children;
const prev=document.querySelector(".prev");
const next=document.querySelector(".next");
const indicator=document.querySelector(".indicator");
let index=0;

  prev.addEventListener("click",function(){
      prevSlide();
      updateCircleIndicator(); 
      resetTimer();
  })

  next.addEventListener("click",function(){
     nextSlide(); 
     updateCircleIndicator();
     resetTimer();
     
  })
  // create circle indicators
   function circleIndicator(){
       for(let i=0; i< slides.length; i++){
          const div=document.createElement("div");
                div.innerHTML=i+1;
               div.setAttribute("onclick","indicateSlide(this)")
               div.id=i;
               if(i==0){
                  div.className="active";
               }
              indicator.appendChild(div);
       }
   }
   circleIndicator();

   function indicateSlide(element){
        index=element.id;
        changeSlide();
        updateCircleIndicator();
        resetTimer();
   }
    
   function updateCircleIndicator(){
      for(let i=0; i<indicator.children.length; i++){
         indicator.children[i].classList.remove("active");
      }
      indicator.children[index].classList.add("active");
   }

  function prevSlide(){
      if(index==0){
         index=slides.length-1;
      }
      else{
         index--;
      }
      changeSlide();
  }

  function nextSlide(){
     if(index==slides.length-1){
        index=0;
     }
     else{
        index++;
     }
     changeSlide();
  }

  function changeSlide(){
            for(let i=0; i<slides.length; i++){
                slides[i].classList.remove("active");
            }

      slides[index].classList.add("active");
  }

  function resetTimer(){
       // when click to indicator or controls button 
       // stop timer 
       clearInterval(timer);
       // then started again timer
       timer=setInterval(autoPlay,4000);
  }

 function autoPlay(){
     nextSlide();
     updateCircleIndicator();
 }

 let timer=setInterval(autoPlay,4000);
