// Daftar produk dengan gambar
const products = [
    {id: 1, name: 'BENG-BENG', price: 2000, img: 'img/beng beng.jpg' },
    {id: 2, name: 'BONCABE', price: 1000, img: 'img/boncabe.png' },
    {id: 3, name: 'CHOCOPIE', price: 2000, img: 'img/chocopie.jpg' },
    {id: 4, name: 'MAXICORN', price: 2000, img: 'img/maxicorn.jpg' },
    {id: 5, name: 'QTELA', price: 2000, img: 'img/qtella.png' },
   

];

// Keranjang belanja
let cart = [];

// Fungsi untuk menampilkan daftar produk
function displayproducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(products => {
        const productsDiv = document.createElement('div');
        productsDiv.classList.add('products');
        productsDiv.innerHTML = `
        <img src="${products.img}" alt="${products.name}">
        <h3>${products.name}</h3>
        <p>Rp ${products.price}</p>
        <button onclick="addToCart(${products.id})">tambah ke keranjang</button>
        `;
        productsContainer.appendChild(productsDiv);
    });
}

// Fungsi untuk menambah produk ke keranjang belanja
function addToCart(productId) {
    const products =products.find(p => p.id === productId);
    const cartItem =cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1 });
    }

    updateCart();
}

// Fungsi untuk menampilkan isi keranjang belanja
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalprice = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x ${item.quantity} - Rp ${item.price * item.quantity}`;
        cartItemsContainer.appendChild(listItem);

        totalprice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = totalprice;
}

// Fungsi untuk melakukan checkout
function checkout() {
    if (cart.length === 0) {
        alert('keranjang anda kosong.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const payment = prompt(`total belanja Anda Rp ${total}. masukan jumlah pembayaran:`);

    if (payment >= total)  {
        alert(`pembayaran berhasil| kembalian Anda: Rp ${payment - total}`);
        cart =[];
        updateCart();
    } else {
        alert(`uang Anda tidak mencukupi.`);
    }
}

// Event listener untuk tombol checkout
document.getElementById(`checkout-btn`).addEventListener(`click`, checkout);

// Tampilkan produk saat halaman dimuat
displayproducts();
