async function getList() {
    let elementList = document.querySelector('.card__container')
    elementList.innerHTML = "";

    const url = "http://localhost:8080";
    const request = new XMLHttpRequest();

    console.log('Произошло обновление...')

    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
            let res = request.responseText
            res = JSON.parse(res)

            for (let i = 0; i < res.length; i++) {
                let card = document.createElement("div")
                let div__card__content = document.createElement("div")
                let h3__card__header = document.createElement("h3")
                let div__card__info = document.createElement("p");
                let div__card__price = document.createElement("p");
                let deleteButton =  document.createElement("button");
                deleteButton.innerHTML = "Удалить"
                deleteButton.setAttribute("onclick", "deletePost()")

                card.className = "card"
                div__card__content.className = "card__content";
                h3__card__header.className = "card__header";
                div__card__info.className = "card__info"
                div__card__price.className = "card__price"

                h3__card__header.innerHTML = res[i].title;
                div__card__info.innerHTML = res[i].description;
                div__card__price.innerHTML = "Цена: " + " " + res[i].price;

                div__card__content.append(h3__card__header, div__card__info, div__card__price, deleteButton)
                card.append(div__card__content)

                elementList.append(card);
            }
        }
    }

    request.open('GET', url, true);
    request.send(null);
}

async function addProduct() {
    let productName = document.getElementById('productName').value
    let productDescription = document.getElementById('productDescription').value
    let productPrice = document.getElementById('productPrice').value

    productPrice = parseInt(productPrice)

    const request = new XMLHttpRequest();
    const url = "http://localhost:8080/addPost";

    let body = {
        title: productName,
        description: productDescription,
        price: productPrice
    }

    let b = JSON.stringify(body)

    request.responseType = "json";
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(b)
    await getList()
}

async function deletePost () {
    alert('На фронте удаление не работает')
}

getList()