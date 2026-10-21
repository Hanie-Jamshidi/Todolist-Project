/* import { productsData } from "/products.js";

const toggle=document.querySelector(".bar");
const backdrop=document.querySelector(".backmenu");
const menuSidbar=document.querySelector(".menu-items")

toggle.addEventListener("click",()=>
{
  backdrop.classList.remove("hidden");
  menuSidbar.classList.remove("hidden")
})
backdrop.addEventListener("click",()=>
{
  backdrop.classList.add("hidden");
  menuSidbar.classList.add("hidden")
})

//shoping cart

 const productsDOM = document.querySelector(".services-tabs");
 const cartContent = document.querySelector(".cart-content");
 const cartTotal = document.querySelector(".cart-total");
 const clearCartBtn = document.querySelector(".clear-cart");
 const cartItems = document.querySelector(".cart-items");

let cart=[];
let buttonsDOM=[];


class Products{
   
  getProducts(){
    return productsData;
  }

 };

class UI{
 displayProducts(products) {
    let result = '';

    products.forEach((item) => {
        result += `
            <div class="servise-tab">
                <img class="services__tabs-image" src="${item.imageUrl}" alt="food-image">
                <p class="services-text">${item.title}</p>

                <div class="services__tabs-discount">
                    <div class="services__faiverit">
                        <img src="/assets/images/Heart.svg" alt="heart-icon">
                        <p>افزودن به علاقه مندی ها</p>
                    </div>

                    <div>
                        <span class="services-price">
                            <del>${item.previousPrice} تومان</del>
                        </span>
                        <span class="badge badge--primary">${item.discount}%</span>
                    </div>
                </div>

                <div class="services__tabs-price">
                    <div class="section__star">
                        <img src="/assets/images/Star.svg" alt="star-icon">
                        <span>5</span>
                        <p>(52)</p>
                    </div>

                    <span class="services-price">
                        ${item.price} تومان
                    </span>
                </div>

                <div class="services__tabs-btn">
                    <button class="btn btn--primary add-to-cart" data-id="${item.id}">
                        افزودن به سبد خرید
                    </button>
                </div>
            </div>
        `;
    });

    productsDOM.innerHTML = result;
}

  
  getAddToCartBtns(){
   const addToCartBtn=[...document.querySelectorAll(".add-to-cart")];
   const buttons=[...addToCartBtn];
   buttonsDOM=addToCartBtn;

buttons.forEach((btn)=>{
  const id=btn.dataset.id;
  const isInCart=cart.find(p=>p.id===parseInt(id));
  if(isInCart){
    btn.innerText='ادامه سفارش';
    btn.disabled =true;
  };
     btn.addEventListener("click" , (event)=>{
      console.log("hiii");
      
        event.target.innerText="دامه سفارش";
        event.target.disabled=true;
        
         //1-get product from products
        const addedProduct={...Storage.getProduct(id),quantity:1};
         //2-add to cart
         cart=[...cart,addedProduct]
         //3-save cart to local
         Storage.saveCart(cart);
         //update care valu
         this.setCartValue(cart);
         //add to cart item
         this.addCartItem(addedProduct);

         //get cart from storage
      });
});
  };
setCartValue(cart) {
    let tempCartItem = 0;

    const totalPrice = cart.reduce((acc, curr) => {
        tempCartItem += curr.quantity;
        return acc + curr.quantity * curr.price;
    }, 0);

    const cartTotalElement = document.querySelector(".cart-total");
    const cartItemsElement = document.querySelector(".cart-items");

    if (cartTotalElement) {
        cartTotalElement.innerText = `${totalPrice.toFixed(2)} تومان`;
    }

    if (cartItemsElement) {
        cartItemsElement.innerText = tempCartItem;
    }
}
   addCartItem(cart) {
    const div = document.createElement("div");
    div.classList.add("main-factor");
    div.innerHTML = `<section class="factor container">
        <div class="cards"></div>
        <div class="card-factor">
            <div class="factor-item factor-cart">
                <p>سبد خرید</p>
                <a href=""><i class="fa-regular fa-trash-can"></i></a>
            </div>
            <div class="factor-item">
                <p>تخفیفات محصولات</p>
                <span>63 تومان</span>
            </div>
            <div class="factor-item factor-price">
                <p>هزینه ارسال</p>
                <span>63 تومان </span>
            </div>
            <div class="factor-item warning">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <p>هزینه ارسال در ادامه بر اساس آدرس، زمان و نحوه ارسال انتخابی شما محاسبه و به این مبلغ اضافه خواهد شد.</p>
            </div>
            <div class="factor-item">
                <p>مبلغ قابل پرداخت</p>
                <span class="cart-total">0تومان</span>
            </div>
            <button class="btn btn--primary ">ورود/ثبت نام   </button>
        </div>
        
    </section>
 `;
    cartContent.appendChild(div);
  }

     setUpApp(){
    //get cart from storage
    cart= Storage.getCart();
    //add cart item
    cart.forEach((cartItem) => this.addCartItem(cartItem));
        this.setCartValue(cart);
    //set value:


  };
  cartLagic(){
        //clear cart
        this.clearCart();
        //cart functionality
        cartContent.addEventListener("click",(event)=>{
          if (event.target.classList.contains("fa-chevron-up")) {
            const addQuantity=event.target;
            //get item from cart
            const addedItem =cart.find(cItem=>cItem.id==addQuantity.dataset.id);
            addedItem.quantity++;
            //save cart
              this.setCartValue(cart);
            //updat cat value
            Storage.saveCart(cart);
            //update cart item in ui
            addQuantity.nextElementSibling.innerText = addedItem.quantity;
          }else if(event.target.classList.contains("fa-trash")){
            const removeItem= event.target;
            const _removedItem=cart.find((c)=>c.id==removeItem.dataset.id);
            this.removeItem(_removedItem.id);
            Storage.saveCart(cart);
            cartContent.removeChild(removeItem.parentElement)
          }else if(event.target.classList.contains("fa-chevron-down")){
            const subQuantity=event.target;
            //get item from cart
            const subTractedItem =cart.find((c)=>c.id==subQuantity.dataset.id);
            if(subTractedItem.quantity===1){
              this.removeItem(subTractedItem.id);
              cartContent.removeChild(subQuantity.parentElement.parentElement);
              return;
            }
            subTractedItem.quantity--;
            //save cart
              this.setCartValue(cart);
            //updat cat value
            Storage.saveCart(cart);
            //update cart item in ui
            subQuantity.previousElementSibling.innerText = subTractedItem.quantity;

          }

        });
    

  };
  clearCart(){
    if (!clearCartBtn) return;
     
     clearCartBtn.addEventListener("click", () => {
      cart.forEach(cItem => this.removeItem(cItem.id));
      //remove cart content
      while(cartContent.children.length){
        cartContent.removeChild(cartContent.children[0]);
      }
      closeModalFunction();
      
    })

  }

   removeItem(id){
    cart=cart.filter((cItem) => cItem.id  !== id);
    this.setCartValue(cart);
    //update stprage
    Storage.saveCart(cart);
   //get add to cart btn:updat text
   this.getSingleButton(id);

   };
    getSingleButton(id){
    const button=buttonsDOM.find((btn) => parseInt(btn.dataset.id) === parseInt(id));
   button.innerText="add to cart";
   button.disabled=false;
    };
};


class Storage{
   static saveProducts(products){
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id){
    const _products = JSON.parse(localStorage.getItem("products"));
    return _products.find(p=> p.id===parseInt(id));
  }
  static saveCart(cart){
    localStorage.setItem("cart",JSON.stringify(cart));
  }
  static getCart(){
    return JSON.parse(localStorage.getItem("cart")) ?  JSON.parse(localStorage.getItem("cart")) : [];
    
}};


document.addEventListener("DOMContentLoaded", () => {
    const products = new Products();
    const productsData = products.getProducts();
    const ui = new UI();

    Storage.saveProducts(productsData);

    ui.setUpApp();
    ui.displayProducts(productsData);
    ui.getAddToCartBtns();
    ui.cartLagic();
});

 */
import { productsData } from "/products.js";

// ====================
// Menu
// ====================

const toggle = document.querySelector(".bar");
const backdrop = document.querySelector(".backmenu");
const menuSidebar = document.querySelector(".menu-items");

if (toggle && backdrop && menuSidebar) {
  toggle.addEventListener("click", () => {
    backdrop.classList.remove("hidden");
    menuSidebar.classList.remove("hidden");
  });

  backdrop.addEventListener("click", () => {
    backdrop.classList.add("hidden");
    menuSidebar.classList.add("hidden");
  });
}

// ====================
// Shopping Cart
// ====================

const productsDOM = document.querySelector(".services-tabs");
const cartContent = document.querySelector(".cart-content");
const cartTotal = document.querySelector(".cart-total");
const clearCartBtn = document.querySelector(".clear-cart");
const cartItems = document.querySelector(".cart-items");
const clearAllCards=document.querySelector(".clearAll-cart")
const popularDOM=document.querySelector(".popular-tab");
const SpecialDOM=document.querySelector(".Special");

let cart = [];
let buttonsDOM = [];

// ====================
// Products
// ====================

class Products {
  getProducts() {
    return productsData;
  }
}

// ====================
// UI
// ====================

class UI {
  displayProducts(products) {
    if (!productsDOM) {
      console.error("Element .services-tabs پیدا نشد!");
      return;
    }

    let result = "";

    products.forEach((item) => {
      result += `
        <div class="servise-tab">
          
          <img 
            class="services__tabs-image" 
            src="${item.imageUrl}" 
            alt="${item.title}"
          >

          <p class="services-text">${item.title}</p>

          <div class="services__tabs-discount">

            <div class="services__faiverit">
              <img 
              class="heart-icon"
                src="/assets/images/Heart.svg" 
                alt="heart-icon"
              >
              <p>افزودن به علاقه مندی ها</p>
            </div>

            <div>
              ${
                item.previousPrice
                  ? `<span class="services-price">
                      <del>${item.previousPrice} تومان</del>
                    </span>`
                  : ""
              }

              ${
                item.discount
                  ? `<span class="badge badge--primary">
                      ${item.discount}%
                    </span>`
                  : ""
              }
            </div>

          </div>

          <div class="services__tabs-price">

            <div class="section__star">
              <img 
                src="/assets/images/Star.svg" 
                alt="star-icon"
              >
              <span>5</span>
              <p>(52)</p>
            </div>

            <span class="services-price">
              ${item.price} تومان
            </span>

          </div>

          <div class="services__tabs-btn">
            <button 
              class="btn btn--primary add-to-cart" 
              data-id="${item.id}"
            >
              افزودن به سبد خرید
            </button>
          </div>

        </div>
      `;
      if (item.category === "popular") {
      popularDOM.innerHTML = result;
    }else if (item.category === "Special") {
      SpecialDOM.innerHTML = result;
    } 
    });

  /*   productsDOM.innerHTML = result; */


  }

  getAddToCartBtns() {
    const addToCartBtns = [
      ...document.querySelectorAll(".add-to-cart"),
    ];

    buttonsDOM = addToCartBtns;

    addToCartBtns.forEach((btn) => {
      const id = btn.dataset.id;

      const isInCart = cart.find(
        (product) => product.id === parseInt(id)
      );

      if (isInCart) {
        btn.innerText = "ادامه سفارش";
        btn.disabled = true;
      }

      btn.addEventListener("click", (event) => {
        event.target.innerText = "ادامه سفارش";
        event.target.disabled = true;

        // گرفتن محصول
        const product = Storage.getProduct(id);

        if (!product) {
          console.error("محصول پیدا نشد:", id);
          return;
        }

        const addedProduct = {
          ...product,
          quantity: 1,
        };

        // اضافه کردن به سبد
        cart = [...cart, addedProduct];

        // ذخیره
        Storage.saveCart(cart);

        // آپدیت تعداد و قیمت
        this.setCartValue(cart);

        // نمایش در سبد
        this.addCartItem(addedProduct);
      });
    });
  }

setCartValue(cart) {
    let tempCartItem = 0;

    const totalPrice = cart.reduce((acc, curr) => {
        tempCartItem += curr.quantity;
        return acc + curr.quantity * curr.price;
    }, 0);

    const cartTotalElement = document.querySelector(".cart-total");
    const cartItemsElement = document.querySelector(".cart-items");

    if (cartTotalElement) {
        cartTotalElement.innerText = `${totalPrice.toFixed(0)} تومان`;
    }

    if (cartItemsElement) {
        cartItemsElement.innerText = tempCartItem;
    }
}
  addCartItem(cartItem) {
   
        if (cart.length === 0) {
        window.location.href = "./shopping-cart";
        return;
    }else{

    }


    const div = document.createElement("div");

    div.classList.add("main-factor");

    div.dataset.id = cartItem.id;

    div.innerHTML = `
                <section class="shopping-cards">
        <div class="cards__content">
            <div class="cards__img">
            <img src=${cartItem.imageUrl} >
            </div>
            <div class="cards__description">
                <div class="cards-item">
                    <h2>${cartItem.title}</h2>
                    <a href=""><i class="clear-cart fa-regular fa-trash-can remove-item"  
                data-id="${cartItem.id}"></i></a>
                </div>
                  <div class="cards-item   Material-dascount">
                    <p>پاستا، قارچ، گوجه، کدوی خوردشده، پیاز خلالی‌شده</p>
              <div>
        <span class="services-price"><del>210,000</del></span>
        <span class="badge badge--primary">15%</span>
              </div>
        </div>
                 <div class="cards-item services__tabs-price">
        <div class="section__star">
<i class="fa-solid fa-star" style="color: #F4B740;"></i>
<i class="fa-solid fa-star" style="color: #F4B740;"></i>
<i class="fa-solid fa-star" style="color: #F4B740;"></i>
<i class="fa-regular fa-star" style="color:  #F4B740"></i>
<i class="fa-regular fa-star" style="color: #F4B740"></i>


</div>
<div class="cart-buttons">

              <button 
                class="quantity-up"
                data-id="${cartItem.id}"
              >
                +
              </button>

              <span class="quantity">
                ${cartItem.quantity}
              </span>

              <button 
                class="quantity-down"
                data-id="${cartItem.id}"
              >
                -
              </button>
            </div>
        <span class="services-price">${cartItem.price} تومان</span>
           </div>

            </div>

        </div>
    </section>

    `;
    cartContent.appendChild(div);
  }

  setUpApp() {
    cart = Storage.getCart();

    cart.forEach((cartItem) => {
      this.addCartItem(cartItem);
    });

    this.setCartValue(cart);
  }

  cartLogic() {
    if (!cartContent) {
      console.error(
        "عنصر .cart-content در HTML وجود ندارد!"
      );
      return;
    }

    cartContent.addEventListener("click", (event) => {
      const target = event.target;

      // افزایش تعداد
      if (target.classList.contains("quantity-up")) {
        const id = parseInt(target.dataset.id);

        const item = cart.find(
          (product) => product.id === id
        );

        if (!item) return;

        item.quantity++;

        target.parentElement.querySelector(
          ".quantity"
        ).innerText = item.quantity;

        Storage.saveCart(cart);
        this.setCartValue(cart);
      }

      // کاهش تعداد
      else if (target.classList.contains("quantity-down")) {
        const id = parseInt(target.dataset.id);

        const item = cart.find(
          (product) => product.id === id
        );

        if (!item) return;

        if (item.quantity === 1) {
          this.removeItem(id);

          const cartItem = target.closest(".main-factor");

          if (cartItem) {
            cartItem.remove();
          }

          return;
        }

        item.quantity--;

        target.parentElement.querySelector(
          ".quantity"
        ).innerText = item.quantity;

        Storage.saveCart(cart);
        this.setCartValue(cart);
      }

      // حذف محصول
      else if (target.classList.contains("remove-item")) {
        const id = parseInt(target.dataset.id);

        this.removeItem(id);

        const cartItem = target.closest(".main-factor");

        if (cartItem) {
          cartItem.remove();
        }
      }
    });
  }

  clearCart() {
     clearAllCards.addEventListener("click" , () => {
      cart.forEach(cItem => this.removeItem(cItem.id));
      //remove cart content
      while(cartContent.children.length){
        cartContent.removeChild(cartContent.children[0]);
      }

      
    })
    if (!clearCartBtn) return;

    clearCartBtn.addEventListener("click", () => {
       cart = [];


      Storage.saveCart(cart);

      if (cartContent) {
        cartContent.innerHTML = "";
      }

      this.setCartValue(cart);

      buttonsDOM.forEach((button) => {
        button.innerText = "افزودن به سبد خرید";
        button.disabled = false;
      });
    });


  }

  removeItem(id) {
    cart = cart.filter(
      (item) => item.id !== id
    );

    Storage.saveCart(cart);

    this.setCartValue(cart);

    this.getSingleButton(id);
  }

  getSingleButton(id) {
    const button = buttonsDOM.find(
      (btn) =>
        parseInt(btn.dataset.id) === parseInt(id)
    );

    if (button) {
      button.innerText = "افزودن به سبد خرید";
      button.disabled = false;
    }
  }
}

// ====================
// Storage
// ====================

class Storage {
  static saveProducts(products) {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );
  }

  static getProduct(id) {
    const products = JSON.parse(
      localStorage.getItem("products")
    );

    if (!products) return null;

    return products.find(
      (product) => product.id === parseInt(id)
    );
  }

  static saveCart(cart) {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }

  static getCart() {
    const cart = JSON.parse(
      localStorage.getItem("cart")
    );

    return cart || [];
  }
}

// ====================
// App
// ====================

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const products = new Products();
    const productsData = products.getProducts();

    const ui = new UI();

    // ذخیره محصولات

    Storage.saveProducts(productsData);

    // نمایش محصولات
    ui.displayProducts(productsData);

    // گرفتن دکمه‌های افزودن به سبد
    ui.getAddToCartBtns();

    // سبد خرید
    ui.cartLogic();

    // دریافت سبد ذخیره‌شده
    ui.setUpApp();

    // دکمه خالی کردن سبد
    ui.clearCart();
  }
);



//search
const filterBtns = document.querySelectorAll(".filter-btn");
const menuDOM = document.querySelector(".food-menu");
const searchInput = document.querySelector("#search");
const pizzaDOM = document.querySelector(".pizza");
const SandwichDOM = document.querySelector(".Sandwich");
const IranianFoodDOM = document.querySelector(".Iranian-food");
const NonIranianFoodCDOM= document.querySelector(".Non-Iranian-food");

let allProductsData = [];
const filters = {
  searchItems: "",
  category: "all",
};



document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3001/items")
    .then((res) => {
      allProductsData = res.data;
      renderProducts(res.data, filters);
    }).catch((err) => console.log(err));
});

function renderProducts(__products, _filters) {


const filteredProducts = __products.filter((p) => {
  const matchesSearch = p.title
    .toLowerCase()
    .includes(_filters.searchItems.toLowerCase());

  const matchesCategory =
    _filters.category === "all" ||
    p.category.toLowerCase() === _filters.category.toLowerCase();

  return matchesSearch && matchesCategory;
});

  menuDOM.innerHTML= "";
  pizzaDOM.innerHTML = "";
  SandwichDOM.innerHTML = "";
  IranianFoodDOM.innerHTML = "";
  NonIranianFoodCDOM.innerHTML = "";
  filteredProducts.forEach((item) => {
    const productDiv = document.createElement("div");

    productDiv.classList.add("items-menu");
    productDiv.innerHTML = `<div class="menu-item__img">
            <img src="${item.image}" alt="">
            </div>
            <div class="menu-item__description">
                <div class="menu-item">
                    <h2>${item.title}</h2>
                                  <div>
        <span class="services-price"><del>${item.previousPrice}</del></span>
        <span class="badge badge--primary">${item.discount}%</span>
              </div>
                </div>
                  <div class="menu-item-recepie">
                    <p>پاستا، قارچ، گوجه، کدوی خوردشده,...</p>
                     <span class="services-price">${item.price} تومان</span>
        </div>
                 <div class="menu-item-cart services__tabs-price">
                 <a href="#">   <i class="fa-regular fa-heart heart-icon"></i></a>
        <div class="section__star">
<i class="fa-solid fa-star" style="color: #F4B740;"></i>
<i class="fa-solid fa-star" style="color: #F4B740;"></i>
<i class="fa-solid fa-star" style="color: #F4B740;"></i>
<i class="fa-regular fa-star" style="color:  #F4B740"></i>
<i class="fa-regular fa-star" style="color: #F4B740"></i>
</div>
<button class="btn btn--primary ">افزودن به سبد خرید</button>
       
           </div>

            </div>
    `;
    menuDOM.appendChild(productDiv);

        if (item.category === "pizza") {
      pizzaDOM.appendChild(productDiv);
    }
        if (item.category === "Sandwich") {
      SandwichDOM.appendChild(productDiv);
    }
        if (item.category === "Non-Iranian-food") {
      NonIranianFoodCDOM.appendChild(productDiv);
    }
        if (item.category === "Iranian-food") {
      IranianFoodDOM.appendChild(productDiv);
    }
  });
  
  if (menuDOM) {
  menuDOM.addEventListener("click", (event) => {
    const heart= event.target.closest(".heart-icon");

    if (heart) {
      heart.classList.toggle("active");
    }
  });
}

}

searchInput.addEventListener("input", (e) => {
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});


filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.category = btn.target.filter;
    renderProducts(allProductsData, filters);
  });
});



//1.get products
class menuProducts{
  getProductmenu(){
     return allProductsData;
  }

}


//2.display products
class menuUI{

 displayProductsMenu(products){
   
 }

}

//3.storage
class menuStorage{
  static saveProductsMenu(products){
  localStorage.setItem("products",JSON.stringify(products))
 }
}


document.addEventListener("DOMContentLoaded",()=>{
   axios
    .get("http://localhost:3001/items")
    .then((res) => {
      allProductsData = res.data;})
 const menuProduct= new menuProducts();
 const menuProductsData=menuProduct.getProductmenu();
 console.log(menuProductsData);
 const menuui=new menuUI();
 menuui.displayProductsMenu(menuProductsData);
 menuStorage.saveProductsMenu(menuProductsData);
  
})