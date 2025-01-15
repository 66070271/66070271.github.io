let cartCount = 0;
function contact(imgId) {
    if (imgId == 'ig-img') {
        let condes = document.getElementById('contact-des');
        condes.innerHTML = "instragram : @271Restaurant"
    } else if (imgId == 'face-img') {
        let condes = document.getElementById('contact-des');
        condes.innerHTML = "Facebook : 271RestaurantOfficial"
    } else if (imgId == 'phone-img') {
        let condes = document.getElementById('contact-des');
        condes.innerHTML = "Tel : 062-852-5854"
    }
}
function cart() {
    showlocal();
    calculate();
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';

}
function closepop() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';

}
function show_maincourse(data) {
    const container = document.getElementById('maincourse-con');
    data.forEach(item => {
        const maincourse_box = document.createElement('div');
        maincourse_box.className = 'maincourse_box';
        const img = document.createElement('img');
        img.src = item.image;
        img.className = "food-img";
        img.setAttribute('onclick', 'savetojson("' + item.name + '","' + item.price + '"' + ')')
        const price = document.createElement('p');
        price.textContent = item.price + " Baht";
        price.className = "food-des food-price"
        const name = document.createElement('p')
        name.textContent = item.name;
        name.className = "food-des food-name"
        const description = document.createElement('p');
        description.textContent = item.description;
        description.className = "food-des"
        maincourse_box.appendChild(img);
        maincourse_box.appendChild(name);
        maincourse_box.appendChild(description);
        maincourse_box.appendChild(price);
        container.appendChild(maincourse_box);
    })
}
function show_drinks(data) {
    const container = document.getElementById('drinks-con');
    data.forEach(item => {
        const maincourse_box = document.createElement('div');
        maincourse_box.className = 'maincourse_box';
        const img = document.createElement('img');
        img.src = item.image;
        img.className = "food-img";
        img.setAttribute('onclick', 'savetojson("' + item.name + '","' + item.price + '"' + ')')
        const price = document.createElement('p');
        price.textContent = item.price + " Baht";
        price.className = "food-des food-price"
        const name = document.createElement('p')
        name.textContent = item.name;
        name.className = "food-des food-name"
        const description = document.createElement('p');
        description.textContent = item.description;
        description.className = "food-des"
        maincourse_box.appendChild(img);
        maincourse_box.appendChild(name);
        maincourse_box.appendChild(description);
        maincourse_box.appendChild(price);
        container.appendChild(maincourse_box);
    })
}
function show_desserts(data) {
    const container = document.getElementById('desserts-con');
    data.forEach(item => {
        const maincourse_box = document.createElement('div');
        maincourse_box.className = 'maincourse_box';
        const img = document.createElement('img');
        img.src = item.image;
        img.className = "food-img";
        img.setAttribute('onclick', 'savetojson("' + item.name + '","' + item.price + '"' + ')')
        const price = document.createElement('p');
        price.textContent = item.price + " Baht";
        price.className = "food-des food-price"
        const name = document.createElement('p')
        name.textContent = item.name;
        name.className = "food-des food-name"
        const description = document.createElement('p');
        description.textContent = item.description;
        description.className = "food-des"
        maincourse_box.appendChild(img);
        maincourse_box.appendChild(name);
        maincourse_box.appendChild(description);
        maincourse_box.appendChild(price);
        container.appendChild(maincourse_box);
    })
}
function savetojson(name, price) {
    alert("Menu's added to your cart please check on the cart menu icon");
    const item = {
        name: name,
        price: price
    };
    let savedData = JSON.parse(localStorage.getItem('savedData')) || { items: [] };
    savedData.items.push(item);
    localStorage.setItem('savedData', JSON.stringify(savedData));
    console.log(savedData);
    cartCount++;
    updateCartCount();
}
function showlocal() {
    const savedData = JSON.parse(localStorage.getItem('savedData')) || { items: [] };
    const tbody = document.getElementById('tablebody');
    tbody.innerHTML = '';
    cartCount = 0;
    updateCartCount();
    savedData.items.forEach(item => {
        const tr = document.createElement('tr');
        const td_name = document.createElement('td');
        td_name.textContent = item.name;
        const td_price = document.createElement('td');
        td_price.textContent = item.price;
        tr.appendChild(td_name);
        tr.appendChild(td_price);
        tbody.appendChild(tr);
        cartCount++;
        updateCartCount();
    });
}
function calculate() {
    let totalprice = 0;
    const savedData = JSON.parse(localStorage.getItem('savedData')) || { items: [] };
    const showPrice = document.getElementById('totalPrice');
    savedData.items.forEach(item => {
        let price = parseInt(item.price);
        totalprice += price;
    })
    showPrice.textContent = "Total = " + totalprice + " Baht"
}
function clearcart() {
    localStorage.clear();
    cartCount = 0;
    updateCartCount();
    showlocal();
    calculate();
}
function fetch_maincourse(){
    fetch('maincourse.json')
    .then(response => response.json())
    .then(data => show_maincourse(data))
    .catch(error => console.error('error:', error));
}
function fetch_drinks(){
    fetch('drinks.json')
    .then(response => response.json())
    .then(data1 => show_drinks(data1))
    .catch(error => console.error('error:', error));
}
function fetch_desserts(){
    fetch('desserts.json')
    .then(response => response.json())
    .then(data2 => show_desserts(data2))
    .catch(error => console.error('error:', error));
}
function fetch_ref(){
    fetch('ref.json')
    .then(response => response.json())
    .then(data3 => showref(data3))
    .catch(error => console.error('error:', error));
}
function showref(data){
    const refbodycon = document.getElementById('ref-body-id');
    data.forEach(item=>{
        const p = document.createElement('a');
        p.textContent = item.ref;
        p.setAttribute('href' , item.ref)
        refbodycon.appendChild(p);
        
    })
}
fetch_maincourse();
fetch_desserts();
fetch_drinks();
fetch_ref();
showlocal();
function updateCartCount(){
    const cartcount = document.getElementById('cart-count');
    cartcount.textContent = cartCount
    if(cartCount === 0){
        cartcount.style.display = 'none';
    }else{
        cartcount.style.display = 'flex';
        cartcount.classList.add('animate');
        setTimeout(() => {
            cartcount.classList.remove('animate');
        }, 200);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.ref-con');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); 
            } else {
                entry.target.classList.remove('visible'); 
            }
        });
    });

    elements.forEach(element => observer.observe(element));
});
