const products = [
  {
    id: "123456789",
    title: "Red T-Shirt",
    image: "./media/red.png",
    priceBeforeSale: 150,
    priceAfterSale: 120,
    amount: 1,
  },
  {
    id: "456789123",
    title: "Black T-Shirt",
    image: "./media/black.png",
    priceBeforeSale: 180,
    priceAfterSale: 130,
    amount: 1,
  },
  {
    id: "789123456",
    title: "Blue T-Shirt",
    image: "./media/blue.png",
    priceBeforeSale: 200,
    priceAfterSale: 160,
    amount: 1,
  },
];

let productContainer = document.querySelector(".products");

//getting stored products
if (window.localStorage.getItem("products")) {
  let productsStored = JSON.parse(window.localStorage.getItem("products"));
  productsStored.forEach((item) => {
    productContainer.innerHTML += `
              <div class="product" id="${item.id}">
                <div class="product-img">
                  <img src="${item.image}" alt="redt-shirt" />
                </div>
                <div class="product-info">
                  <div class="product-details">
                    <p>${item.title}</p>
                    <div class="produc-price">
                      <span class="new">${item.priceAfterSale}</span>
                      <span class="old">${item.priceBeforeSale}</span>
                    </div>
                  </div>
                  <div class="product-dynamic">
                    <div class="del">
                      <img src="./media/Dell.svg" alt="delete" />
                    </div>
                    <div class="product-amount">
                      <span class="decrease">-</span>
                      <span class="amount">${item.amount}</span>
                      <span class="increase">+</span>
                    </div>
                  </div>
                </div>
              </div>`;
    deleteItem();
    addItem();
    decreaseItem();
    console.log("stored");
  });
}
//adding stored prdoucts to page
else {
  window.localStorage.setItem("products", JSON.stringify(products));
  let productsStored = JSON.parse(window.localStorage.getItem("products"));
  productsStored.forEach((item) => {
    productContainer.innerHTML += `
              <div class="product" id="${item.id}">
                <div class="product-img">
                  <img src="${item.image}" alt="redt-shirt" />
                </div>
                <div class="product-info">
                  <div class="product-details">
                    <p>${item.title}</p>
                    <div class="produc-price">
                      <span class="new">${item.priceAfterSale}</span>
                      <span class="old">${item.priceBeforeSale}</span>
                    </div>
                  </div>
                  <div class="product-dynamic">
                    <div class="del">
                      <img src="./media/Dell.svg" alt="delete" />
                    </div>
                    <div class="product-amount">
                      <span class="decrease">-</span>
                      <span class="amount">${item.amount}</span>
                      <span class="increase">+</span>
                    </div>
                  </div>
                </div>
              </div>`;
    deleteItem();
    addItem();
    decreaseItem();
  });
}

//delete products
function deleteItem() {
  let btn = document.querySelectorAll(".del");
  btn.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.target.closest(".product").remove();
      let index = products.findIndex(
        (itemy) => itemy.id === e.target.closest(".product").id
      );
      console.log(index);
      products.splice(index, 1);
      window.localStorage.setItem("products", JSON.stringify(products));
    });
  });
}

function addItem() {
  let btn = document.querySelectorAll(".increase");
  let productsStored = JSON.parse(window.localStorage.getItem("products"));
  btn.forEach((item) => {
    item.addEventListener("click", function (e) {
      let value = e.target.previousElementSibling;
      value.textContent = parseInt(value.textContent) + 1;
      console.log(productsStored);
      let index = productsStored.findIndex(
        (itemy) => itemy.id === e.target.closest(".product").id
      );
      console.log(index);
      productsStored[index].amount = value.textContent;
      window.localStorage.setItem("products", JSON.stringify(productsStored));
    });
  });
}

function decreaseItem() {
  let btn = document.querySelectorAll(".decrease");
  let productsStored = JSON.parse(window.localStorage.getItem("products"));

  btn.forEach((item) => {
    item.addEventListener("click", function (e) {
      let value = e.target.nextElementSibling;
      if (parseInt(value.textContent) >= 2) {
        value.textContent = parseInt(value.textContent) - 1;
        console.log(productsStored);
        let index = productsStored.findIndex(
          (itemy) => itemy.id === e.target.closest(".product").id
        );
        console.log(index);
        productsStored[index].amount = value.textContent;
        window.localStorage.setItem("products", JSON.stringify(productsStored));
      }
    });
  });
}
