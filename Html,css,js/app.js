//Scroll to top button 
function initilizeUpArrow() {
    // Scroll to top button Starts here
    const scrbtn = document.querySelector('.scrbtn')
    const showhide = document.getElementById('top')
    const ScrollFunc = () => {
        const scroll = window.scrollY;
        if (scroll > 10) {
            showhide.className = "scrbtn show";
        } else {
            showhide.className = "scrbtn hide";
        }
    };

    window.addEventListener("scroll", ScrollFunc);
    scrbtn.addEventListener('click', () => {
        document.documentElement.scrollTop = 0
    })
    // Scroll to top button Ends here
}


// Navbar background Starts

const navbar = document.querySelector('.navbar')
const active = document.getElementById('nav')
const scrollFunc = () => {
    const scroll = window.scrollY;


    if (scroll > 100) {
        active.className = "navbar show";
    } else {
        active.className = "navbar hide";
    }
};
window.addEventListener("scroll", scrollFunc);


// Navbar background ends


// Menu button Starts

const cta =document.querySelector('.cta');
const modal =document.querySelector('.modal');
const submit =document.querySelector('.submit');
const burger = document.querySelector(".burger");


burger.addEventListener("click", () => {
    navbar.classList.toggle("open");
    console.log("click");
});

document.addEventListener("mouseup", (e) => {
    if (!navbar.contains(e.target) && navbar.classList.contains("open")) {
        navbar.classList.toggle("open");
    }
});


cta.addEventListener('click',() => {
    modal.classList.toggle('open');
});

submit.addEventListener('click', () => {
    modal.classList.toggle('open');
});

document.addEventListener('mouseup', (e) => {
    if(!modal.contains(e.target) && modal.classList.contains('open')){
        modal.classList.remove('open');
    }
    
});







// Menu button Ends





let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: '1.PNG',
        price: 120000
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: '2.PNG',
        price: 120000
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '3.PNG',
        price: 220000
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '4.PNG',
        price: 123000
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.PNG',
        price: 320000
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.PNG',
        price: 120000
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}



const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// Function to handle the "Add to Cart" button click
function addToCart(event) {
  const cropItem = event.target.parentElement;
  const title = cropItem.querySelector('h3').innerText;
  const description = cropItem.querySelector('p').innerText;

  // Get the existing cart items from local storage
  const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Create a new item object
  const newItem = {
    title: title,
    description: description
  };

  // Add the new item to the cart
  existingCartItems.push(newItem);

  // Store the updated cart items back to local storage
  localStorage.setItem('cartItems', JSON.stringify(existingCartItems));

  // Optionally, you can display a success message or perform other actions
  alert('Item added to cart successfully');
}

function main() {
    initilizeUpArrow();
}


main();



