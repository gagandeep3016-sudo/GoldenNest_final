let allProducts = [];

async function Main_api(){
    let res = await fetch('./ss.json');
    let data = await res.json();
    return data;
}

function renderCards(products) {
    const con = document.getElementById("cardsContainer");
    con.innerHTML = "";

    for (let first of products){
        let box = document.createElement("div");
        let img = document.createElement("img");
        let place = document.createElement("p");
        let price = document.createElement("h2");
        let avidiv = document.createElement("div");
        let status = document.createElement("button");
        let view_details = document.createElement("button");
        let img_Wrapper = document.createElement("div");

        box.className = "box";
        img.className = "img";
        place.className = "place";
        price.className = "price";
        status.className = "status";
        view_details.className = 'view_details';
        img_Wrapper.className = 'img_Wrapper';

        img.src = first.image;
        img.alt = "Currently unavailable property";

        img.onerror = function () {
            img.remove();
            let fallback = document.createElement("div");
            fallback.innerText = "Currently Unavailable";
            fallback.className = "no-image";
            box.prepend(fallback);
        };

        place.innerText = `📍 ${first.location.city}`;
        price.innerText = `$ ${first.price.toLocaleString()}`;
        view_details.innerText = 'View Details';
        status.innerText = `${first.status}`;

        let detailsPopup = document.createElement("div");
        detailsPopup.className = "details_popup";
        detailsPopup.innerHTML = `
            <span class="popup_close">✕</span>
            <p class="popup_row">🏠 <span>Type</span> ${first.type}</p>
            <p class="popup_row">📞 <span>Agent</span> ${first.agent.phone}</p>
            <p class="popup_row">📍 <span>City</span> ${first.location.city}, ${first.location.state}</p>
            <p class="popup_row">💰 <span>Price</span> $${first.price.toLocaleString()}</p>
            <p class="popup_row">🛏 <span>Beds</span> ${first.details.bedrooms}</p>
            <p class="popup_row">🚿 <span>Baths</span> ${first.details.bathrooms}</p>
            <p class="popup_row">📐 <span>Area</span> ${first.details.area_sqft} sqft</p>
            <p class="popup_row">🏗 <span>Year Built</span> ${first.details.year_built}</p>
            <p class="popup_row">🚗 <span>Garage</span> ${first.details.garage ? 'Yes' : 'No'}</p>
            <p class="popup_row">🏊 <span>Pool</span> ${first.details.pool ? 'Yes' : 'No'}</p>
        `;

        view_details.addEventListener("click", (e) => {
            e.stopPropagation();
            detailsPopup.classList.toggle("active");
        });

        detailsPopup.querySelector(".popup_close").addEventListener("click", (e) => {
            e.stopPropagation();
            detailsPopup.classList.remove("active");
        });

        img_Wrapper.appendChild(img);
        img_Wrapper.appendChild(view_details);
        img_Wrapper.appendChild(status);
        box.append(img_Wrapper,place,price, avidiv,detailsPopup);
        con.appendChild(box);
    }
}

function handleSort(value) {
    let sorted = [...allProducts];

    if (value==='price-asc') {
        sorted.sort((a, b) => a.price - b.price);
    } 
    else if (value==='price-desc') {
        sorted.sort((a, b) => b.price - a.price);
    } 
    else if (value==='rating-desc') {
        sorted.sort((a, b) => (b.details.year_built) - (a.details.year_built));
    } 
    else {
        sorted=[...allProducts];
    }

    renderCards(sorted);
}

function handleSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!query) {
        renderCards(allProducts);
        return;
    }
    const filtered = allProducts.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query) ||
        p.location.city.toLowerCase().includes(query)
    );
    renderCards(filtered);
}

// Allow pressing Enter to trigger search
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
});

async function ShowImages(){
    allProducts = await Main_api();
    const liveCount = document.getElementById('liveCount');
    liveCount.innerText = allProducts.length;
    renderCards(allProducts);
}

ShowImages();
