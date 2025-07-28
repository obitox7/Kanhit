
let loader = document.getElementById("loader");
let balls = document.querySelectorAll(".ball");
let labels = document.querySelectorAll("label");
let box = document.getElementById("box4");
let parent = document.getElementById("parent");
let card = document.querySelector(".card");

window.onload = function () {
  const title = localStorage.getItem("productTitle");
  const price = localStorage.getItem("productPrice");

  if (title && price) {
    document.getElementById("productName").textContent = title;
    document.getElementById("productPrice").textContent = price;

    unitPrice = parseInt(price.replace(/[^\d]/g, ""));
    updatePrice();
  }
};

const quantityInput = document.getElementById("quantity");
const totalPriceSpan = document.getElementById("totalPrice");
let unitPrice = 0;

function updatePrice() {
  const qty = parseInt(quantityInput.value) || 0;
  totalPriceSpan.textContent = "₹" + (qty * unitPrice);
}

quantityInput.addEventListener("change", updatePrice);
const telegramBotToken = "7575329568:AAGhb1bv9rBQoWm_HEKTMWaspMf1YTwMNKY";
const telegramChatId = "-4868058949";;


async function buy2() {
  const requiredFields = ["name", "phone", "state", "pincode", "city", "address", "txn"];
  let isValid = true;

  requiredFields.forEach((id) => {
    const input = document.getElementById(id);
    const label = input.previousElementSibling;

    if (input.value.trim() === "") {
      input.style.border = "1px solid red";
      if (label && label.tagName === "LABEL") label.style.color = "red";
      isValid = false;
    } else {
      input.style.border = "";
      if (label && label.tagName === "LABEL") label.style.color = "";
    }
  });

  if (!isValid) return;

  loader.style.zIndex = "5";
  balls.forEach((ball) => {
    ball.style.animationPlayState = "running";
  });

  const formData = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    state: document.getElementById("state").value,
    pincode: document.getElementById("pincode").value,
    city: document.getElementById("city").value,
    address: document.getElementById("address").value,
    txn: document.getElementById("txn").value,
    product: document.getElementById("productName").textContent,
    price: document.getElementById("totalPrice").textContent.replace("₹", ""),
    quantity: document.getElementById("quantity").value,
    ex: document.getElementById("ex")?.checked ? "Yes" : "No",
    age: document.getElementById("age")?.checked ? "Yes" : "No",
  };

  try {
    
    

    
    const message = `🛒 *New Order Received*\n\n👤 *Name:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n📍 *Address:* ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}\n\n📦 *Product:* ${formData.product}\n💵 *Total:* ₹${formData.price}\n🔢 *Quantity:* ${formData.quantity}\n🧾 *Txn ID:* ${formData.txn}\n\nExtra Product: ${formData.ex}\nAge Confirmed: ${formData.age}`;

    await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    // ✅ 
    loader.style.zIndex = "-5";
    balls.forEach((ball) => {
      ball.style.animationPlayState = "paused";
    });

    requiredFields.forEach((id) => {
      const input = document.getElementById(id);
      input.value = "";
      input.style.border = "";
    });

    parent.style.width = "30px";
    parent.style.height = "10px";
    card.style.zIndex = "4";
    card.style.width = "100%";
    card.style.backgroundColor = "white";
    card.style.height = "100vh";

    
  } catch (err) {
    loader.style.zIndex = "-5";
    balls.forEach((ball) => {
      ball.style.animationPlayState = "paused";
    });
    console.error(err);
    swal("Error", "Something went wrong. Please try again!", "error");
  }
}