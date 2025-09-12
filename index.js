// Load categories
const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch(err => console.error("Error loading categories:", err));
};

// Load ALL plants
const loadPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => displayProducts(data.plants))
    .catch(err => console.error("Error loading all plants:", err));
};

// Load plants by category
const loadCategoryProducts = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => displayProducts(data.data.plants)) // ✅ FIXED
    .catch(err => console.error("Error loading category products:", err));
};

// Display products
const displayProducts =(products)=>{
  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML ="" ;

  for(let product of products){
    const div = document.createElement('div');
    div.className = "border rounded-xl shadow-sm p-4"; // ✅ added some styling
    div.innerHTML = ` <section class ="bg-white"> 
      <img class="w-[100%] h-[180px] object-cover mx-auto rounded" src="${product.image}" alt="${product.name}">
      <h3 class="font-bold mt-2">${product.name}</h3>
      <p class="text-sm text-gray-600">${product.description?.slice(0, 100) || ""}...</p>
      <section class="button-section flex justify-between mt-2">
          <button class="p-1 rounded-xl bg-[#DCFCE7] text-green-500">${product.category}</button>
          <button class="p-1 rounded-xl font-bold">৳${product.price}</button>
      </section>
      <button class="add-to-cart  onclick()  p-2 bg-green-700 text-white rounded-xl mt-2 w-full">Add to Cart</button> </section>
    `;
    productContainer.appendChild(div);
  }
};

// Display categories
const displayCatagories = (branches) => {
  const catagoryContainer = document.getElementById("catagory-container");
  catagoryContainer.innerHTML = "";

  for (let branch of branches) {
    const btn = document.createElement("div");
    btn.innerHTML = `
      <button onclick="loadCategoryProducts('${branch.category_id}')"   
        class="hover:bg-green-800 text-xl hover:text-white font-semibold mb-2 p-1 ml-2">
        ${branch.category_name}
      </button>`;
    catagoryContainer.appendChild(btn);
  }
};

// Initial load
loadCatagories();
loadPlants();


