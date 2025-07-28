const params =new
URLSearchParams(window.location.search);
const productId =params.get("id");

const products = {
    1:{
        image:"images/p1.webp",
        title :"Sweet heat sweater",
        description :"A cozy, handcrafted sweater featuring vibrant red and pink stripes with a bold heart motif at the center — perfect for chilly days with a touch of love.",
        price :"₹1999"
    },
        2:{
        image :"images/p2.webp",
        title :"pastel ruffle bag",
        description :"A soft pink crochet handbag trimmed with creamy ruffles and satin bows, combining cuteness with charm. A dainty and delightful accessory for any outfit.",
        price :"₹799"
    },
        3:{
        image :"images/p3.webp",
        title :"chick on a swing night lamp",
        description :"A whimsical crochet chick sits on a swing beneath blooming flowers, all lit by warm fairy lights — perfect as a cozy desk lamp or dreamy room decor.",
        price :"₹699"
    },
        4:{
        image :"images/p4.webp",
        title :"Denim Blue Crochet Co-Ord Set",
        description :"This stunning handmade co-ord set includes a fitted crop top with heart lacework and a flowy skirt — crafted in denim-tone yarn for a playful yet elegant look.",
        price :"₹2500"
    }
};
const product = products[productId];
if (product){
    document.getElementById("title").textContent =product.title;
    document.getElementById("des").textContent =product.description;
    document.getElementById("price").textContent =product.price;
    document.getElementById("image").src =product.image;}
    else{};
    function buy(){
        
    localStorage.setItem("productTitle", product.title);
    localStorage.setItem("productPrice", product.price);
    window.location.href = "index3.html";
    };
    gsap.from("#parent",{
        opacity:0,
        transition:0.5
    })
    gsap.from("#box",{
        y:"-150%",
        delay:0.5,
        duration:0.5
    })
    gsap.from("#title",{
        x:"200%",
        delay:0.9,
        duration:0.7
    })
    gsap.from("#des",{
        x:"200%",
        delay:1,
        duration:0.8
    })
    gsap.from("#price",{
        y:-50,
        opacity:0,
        delay:1.7,
        duration:1
    })
    gsap.from("#btn",{
        width:0,
        padding:"0px 0px",
        delay:2,
        duration:0.5,
        textShadow:"0 0 0 transparent",
        color:"transparent"
    })
