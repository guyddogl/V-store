const sectionCards = document.getElementById('cards');

const fetchProducts = async () => {
  try {
    const URL = 'https://dummyjson.com/products';
    const result = await fetch(URL);
    const data = await result.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

const starRating = (stars) => {
  const totalStars = Math.round(stars);
  let starIcon = '';
  for (let i = 0; i < totalStars; i += 1) {
    starIcon += `<i class="fa-solid fa-star text-secondary"></i>`
  }
  return `${starIcon}`
}

const createProductCard = (product) => {
  const divCol = document.createElement('div');
  divCol.className = 'col';

  const divCard = document.createElement('div');
  divCard.className = 'card shadow-sm';
  divCol.appendChild(divCard);
  divCard.innerHTML = `<img src="${product.thumbnail}" alt="${product.title}" class="card-img-top" width="100%" height="225" />`

  const divCardBody = document.createElement('div');
  divCardBody.className = 'card-body';
  divCard.appendChild(divCardBody);

  const divRow = document.createElement('div');
  divRow.className = 'row';
  divCardBody.appendChild(divRow);

  const divCol9 = document.createElement('div');
  divCol9.className = 'col-9';
  divCol9.innerHTML = `<span class="card-text d-block"><b>${product.title.substr(0, 20)}</b> - R${product.price}</span><br/>${starRating(product.rating)}`
  divRow.appendChild(divCol9);

  const divCol3 = document.createElement('div');
  divCol3.className = 'col-3 text-center';
  divCol3.innerHTML = `<div class="bg-light text-success p-1 border rounded-3"><b>${Math.floor(product.discountPercentage)}% OFF</b></div>`
  divRow.appendChild(divCol3);

  const pCard = document.createElement('p');
  pCard.className = 'card-text my-4';
  pCard.innerHTML = `<p className="card-text my-4" style="height: 40px;">${product.description.substr(0, 70)}...</p>`
  divCardBody.appendChild(pCard);

  const button = document.createElement('div');
  button.className = 'row p-3';
  button.innerHTML = `<button type="button" class="btn btn-md btn-primary"><i class="fa-solid fa-cart-plus me-2"></i>Comprar</button>`
  divCardBody.appendChild(button);

  return divCol;
};

window.onload = async () => {
  const result = await fetchProducts();
  result.products.forEach((product) => {
    sectionCards.appendChild(createProductCard(product));
  });
  console.log(result.products);
};
