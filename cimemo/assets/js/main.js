
//INDEX 
// Mendapatkan semua tab buttons dan tab items
const tabs = document.querySelectorAll('.tab__btn');
const tabItems = document.querySelectorAll('.tab__item');

// Menambahkan event listener untuk setiap tab
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetId = tab.dataset.tab; // Mendapatkan nilai dari data-tab
        const target = document.querySelector(targetId); // Memilih tab item berdasarkan ID

        if (target) {
            // Menghapus kelas active-tab dari semua tab dan items
            tabs.forEach(t => t.classList.remove('active-tab'));
            tabItems.forEach(item => item.classList.remove('active-tab'));

            // Menambahkan kelas active-tab ke tab yang diklik dan itemnya
            tab.classList.add('active-tab');
            target.classList.add('active-tab');
        } else {
            console.error(`Target dengan ID ${targetId} tidak ditemukan.`);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Ambil semua elemen tab
    const tabs = document.querySelectorAll(".detail__tab");
    const tabContents = document.querySelectorAll(".details__tab-content");

    tabs.forEach((tab) => {
        tab.addEventListener("click", function () {
            // Hapus kelas active-tab dari semua tab dan kontennya
            tabs.forEach((t) => t.classList.remove("active-tab"));
            tabContents.forEach((content) => content.classList.remove("active-tab"));

            // Tambahkan kelas active-tab ke tab yang diklik
            this.classList.add("active-tab");

            // Dapatkan ID target dari atribut data-target
            const targetId = this.getAttribute("data-target");
            const targetContent = document.querySelector(targetId);

            // Pastikan elemen target ditemukan sebelum menambahkan class
            if (targetContent) {
                targetContent.classList.add("active-tab");
            } else {
                console.error(`Elemen dengan ID ${targetId} tidak ditemukan.`);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Add to cart functionality
    const addToCartBtn = document.querySelector('.details__add-cart');
    
    addToCartBtn.addEventListener('click', () => {
        // Dapatkan data produk yang dipilih
        const selectedSize = document.querySelector('.size__button.active')?.dataset.size;
        const quantity = document.querySelector('.quantity__input').value;
        
        if (!selectedSize) {
            alert('Silakan pilih ukuran sepatu terlebih dahulu');
            return;
        }
        
        // Di sini Anda bisa menambahkan logika untuk menyimpan data ke localStorage jika diperlukan
        // Contoh:
        const productData = {
            name: document.querySelector('.details__title').textContent,
            price: document.querySelector('.new__price').textContent,
            size: selectedSize,
            quantity: quantity
        };
        
        // Simpan ke localStorage jika diperlukan
        localStorage.setItem('cartItem', JSON.stringify(productData));
        
        // Redirect ke halaman keranjang
        window.location.href = 'keranjang.html';
    });
    // Size buttons functionality
    const sizeButtons = document.querySelectorAll('.size__button');
    
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
        });
    });

    // Quantity functionality
    const quantityInput = document.querySelector('.quantity__input');
    const plusButton = document.querySelector('.quantity__button.plus');
    const minusButton = document.querySelector('.quantity__button.minus');
    const maxQuantity = 5; // Sesuai dengan stok yang tersedia

    plusButton.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < maxQuantity) {
            quantityInput.value = currentValue + 1;
        }
    });

    minusButton.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    // Like button functionality
    const likeButton = document.querySelector('.details__like');
    
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('active');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Delete product functionality
    const deleteButtons = document.querySelectorAll('.table__delete');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const row = this.closest('tr');
            row.remove();
            updateTotal();
        });
    });

    // Continue shopping button
    const continueButton = document.querySelector('.cart__continue');
    
    continueButton.addEventListener('click', function() {
        window.location.href = 'belanja.html';
    });

    // Checkout button
    const checkoutButton = document.querySelector('.checkout__btn');
    
    checkoutButton.addEventListener('click', function() {
        window.location.href = 'checkout.html';
    });

    // Update cart total
    function updateTotal() {
        const subtotals = document.querySelectorAll('td:nth-child(5)');
        let total = 0;

        subtotals.forEach(subtotal => {
            const amount = parseInt(subtotal.textContent.replace('Rp ', '').replace('.', ''));
            total += amount;
        });

        // Format total with thousand separator
        const formattedTotal = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        document.querySelector('.summary__row span:last-child').textContent = `Rp ${formattedTotal}`;
    }

    // Update quantity functionality
    const updateButtons = document.querySelectorAll('.quantity__update');
    
    updateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const quantitySpan = this.previousElementSibling;
            const currentQuantity = parseInt(quantitySpan.textContent);
            // You can add logic here to show a quantity input modal
            console.log('Update quantity for product');
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Quantity functionality
    const quantityWrappers = document.querySelectorAll('.quantity__wrapper');
    
    quantityWrappers.forEach(wrapper => {
        const minusBtn = wrapper.querySelector('.minus');
        const plusBtn = wrapper.querySelector('.plus');
        const input = wrapper.querySelector('.quantity__input');
        
        minusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
                updateSubtotal(wrapper);
            }
        });
        
        plusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            if (value < 5) {
                input.value = value + 1;
                updateSubtotal(wrapper);
            }
        });
    });

    // Update subtotal for a single item
    function updateSubtotal(wrapper) {
        const row = wrapper.closest('tr');
        const priceText = row.querySelector('td:nth-child(3)').textContent;
        const price = parseInt(priceText.replace('Rp ', '').replace(/\./g, ''));
        const quantity = parseInt(wrapper.querySelector('.quantity__input').value);
        const subtotal = price * quantity;
        
        // Format subtotal with thousand separator
        const formattedSubtotal = subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        row.querySelector('td:nth-child(5)').textContent = `Rp ${formattedSubtotal}`;
        
        updateTotal();
    }

    // Update total price
    function updateTotal() {
        const subtotalElements = document.querySelectorAll('td:nth-child(5)');
        let total = 0;

        subtotalElements.forEach(element => {
            const subtotal = parseInt(element.textContent.replace('Rp ', '').replace(/\./g, ''));
            total += subtotal;
        });

        // Format total with thousand separator
        const formattedTotal = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        document.querySelector('.total__value').textContent = `Rp ${formattedTotal}`;
    }



    // Perbarui Keranjang button
    const updateCartButton = document.querySelector('.cart__perbarui');
    
    updateCartButton.addEventListener('click', function() {
        // Update all subtotals and total
        quantityWrappers.forEach(wrapper => {
            updateSubtotal(wrapper);
        });
        alert('Keranjang berhasil diperbarui!');
    });

    // Lanjutkan Berbelanja button
    const continueShoppingButton = document.querySelector('.cart__continue');
    
    continueShoppingButton.addEventListener('click', function() {
        window.location.href = 'belanja.html';
    });

    const addcart = document.querySelector('.add-to-cart');
    
    continueShoppingButton.addEventListener('click', function() {
        window.location.href = 'keranjang.html';
    });

    

    // Checkout button
    const checkoutButton = document.querySelector('.checkout__btn');
    
    checkoutButton.addEventListener('click', function() {
        // Save cart data to localStorage if needed
        const cartItems = [];
        const rows = document.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const item = {
                name: row.querySelector('.table__title').textContent,
                price: row.querySelector('td:nth-child(3)').textContent,
                quantity: row.querySelector('.quantity__input').value,
                subtotal: row.querySelector('td:nth-child(5)').textContent
            };
            cartItems.push(item);
        });

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartTotal', document.querySelector('.total__value').textContent);

        // Redirect to checkout page
        window.location.href = 'checkout.html';
    });

    // Initial calculation of all subtotals and total
    quantityWrappers.forEach(wrapper => {
        updateSubtotal(wrapper);
    });
});


//CHECKOUT
document.addEventListener('DOMContentLoaded', function () {
    // Ambil elemen-elemen penting
    const shippingForm = document.getElementById('shippingForm');
    const additionalInfo = document.querySelector('.textarea');
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const orderBtn = document.getElementById('orderBtn');

    // Fungsi untuk mengecek validitas form
    function checkFormValidity() {
        const formInputs = shippingForm.querySelectorAll('input');
        let isValid = true;

        // Pastikan semua input dalam form pengiriman telah diisi
        formInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
            }
        });

        // Pastikan textarea informasi tambahan diisi
        if (!additionalInfo.value.trim()) {
            isValid = false;
        }

        // Pastikan salah satu metode pembayaran dipilih
        const paymentSelected = Array.from(paymentOptions).some(radio => radio.checked);
        if (!paymentSelected) {
            isValid = false;
        }

        // Aktifkan/tidak tombol berdasarkan validitas
        orderBtn.disabled = !isValid;
        orderBtn.style.backgroundColor = isValid ? 'var(--primary-medium)' : 'var(--primary-light)';
    }

    // Tambahkan event listener untuk memantau perubahan pada form
    shippingForm.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', checkFormValidity);
    });

    additionalInfo.addEventListener('input', checkFormValidity);

    paymentOptions.forEach(radio => {
        radio.addEventListener('change', checkFormValidity);
    });

    // Tangani pengiriman pesanan ketika tombol ditekan
    orderBtn.addEventListener('click', function (e) {
        e.preventDefault(); // Mencegah reload halaman

        // Tampilkan alert sukses
        alert('Pembayaran berhasil! Terima kasih telah berbelanja.');

        // Clear cart data jika ada di localStorage (opsional)
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartTotal');

        // Redirect ke halaman beranda
        window.location.href = 'index.html';
    });

    // Validasi awal untuk memeriksa apakah form sudah terisi
    checkFormValidity();
});


//LOGIN
// Menangkap elemen form login, register, dan tombol
const loginForm = document.querySelector('.login .form');
const registerForm = document.querySelector('.register .form');
const orderButton = document.querySelector('#orderBtn');

// Fungsi untuk memvalidasi form login
function isLoginFormValid() {
    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const password = loginForm.querySelector('input[type="password"]').value.trim();
    return email !== "" && password !== "";
}

// Fungsi untuk memvalidasi form register
function isRegisterFormValid() {
    const name = registerForm.querySelector('input[placeholder="Masukkan Nama Pengguna"]').value.trim();
    const email = registerForm.querySelector('input[type="email"]').value.trim();
    const password = registerForm.querySelector('input[type="password"]').value.trim();
    const confirmPassword = registerForm.querySelector('input[placeholder="Konfirmasi Password"]').value.trim();

    return (
        name !== "" &&
        email !== "" &&
        password !== "" &&
        confirmPassword !== "" &&
        password === confirmPassword
    );
}

// Fungsi untuk mengaktifkan tombol "Pesan Sekarang"
function updateOrderButtonState() {
    if (isLoginFormValid() || isRegisterFormValid()) {
        orderButton.disabled = false;
    } else {
        orderButton.disabled = true;
    }
}

// Menambahkan event listener pada form login
loginForm.addEventListener('input', updateOrderButtonState);

// Menambahkan event listener pada form register
registerForm.addEventListener('input', updateOrderButtonState);

// Event listener pada tombol "Pesan Sekarang"
orderButton.addEventListener('click', (event) => {
    event.preventDefault(); // Mencegah refresh halaman

    if (orderButton.disabled) return;

    alert('Pembayaran berhasil! Anda akan diarahkan ke halaman beranda.');

    // Mengarahkan ke halaman beranda (ganti 'index.html' sesuai dengan nama file beranda Anda)
    window.location.href = 'index.html';
});

//KURSUS
function reservasiKursus(namaKursus, harga) {
    const confirmation = confirm(`Anda akan melakukan reservasi untuk ${namaKursus} dengan harga Rp ${harga}. Lanjutkan ke WhatsApp?`);
    
    if (confirmation) {
        // Nomor WhatsApp dan pesan
        const phoneNumber = "628880663719"; 
        const message = `Halo, saya ingin reservasi kursus ${namaKursus} dengan harga Rp ${harga}`;
        
        // Membuat URL WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Buka WhatsApp di tab baru
        window.open(whatsappUrl, '_blank');
    }
}

