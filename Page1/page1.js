async function Main_api(){
    let res = await fetch('./ss.json');
    let data = await res.json();
    return data;
}

async function ShowImages(){
    let product = await Main_api();
    const con = document.getElementById("cardsContainer");
    const liveCount = document.getElementById('liveCount');

    liveCount.innerText = product.length;

    for (let first of product){

        let box = document.createElement("div");
        let img = document.createElement("img");
        let place = document.createElement("p");
        let price = document.createElement("h2");
        let avidiv = document.createElement("div");
        let status = document.createElement("button");
        let view_details= document.createElement("button");
        let img_Wrapper = document.createElement("div");

        box.className = "box";
        img.className = "img";
        place.className = "place";
        price.className = "price";
        status.className = "status";
        view_details.className = 'view_details';
        img_Wrapper.className = 'img_Wrapper'
        

    
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
        price.innerText = `$ ${first.price}`;
        view_details.innerText = 'View Details';

        if (first.status === 'For Sale'){
            status.innerText = `Available For Sale`;
            avidiv.className = "avidiv sale";
        } else {
            status.innerText = `For Rent`;
            avidiv.className = "avidiv rent";
        }
        img_Wrapper.appendChild(img);
        img_Wrapper.appendChild(view_details);
        avidiv.appendChild(status);
        box.append(img_Wrapper, place, price, avidiv);
        con.appendChild(box);
    }
}

ShowImages();