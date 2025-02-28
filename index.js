async function searchProducts() {
    const searchTerm = document.getElementById('search-input').value;
    const loadingElement = document.getElementById('loading');
    const errorMessageElement = document.getElementById('error-message');
    const productsList = document.getElementById('products-list');
  
    loadingElement.style.display = 'block';
    productsList.innerHTML = ''; 
    errorMessageElement.style.display = 'none';
  
    try {
      const response = await fetch(`http://localhost:3000/api/products/search?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
  
      const products = await response.json();
      loadingElement.style.display = 'none';
  
      if (products.length === 0) {
        productsList.innerHTML = '<li>Nenhum produto encontrado.</li>';
      } else {
        products.forEach(product => {
          const li = document.createElement('li');
          li.classList.add('product-item');
          li.innerHTML = `
            <div>
              <h3>${product.name}</h3>
              <p><span>Preço:</span> R$ ${product.price}</p>
              <p><span>Categoria:</span> ${product.category || 'Não especificado'}</p>
              <p><span>Descrição:</span> ${product.description || 'Sem descrição disponível.'}</p>
              <button class="download-button" onclick="downloadRoom('${product.name}')">Baixar Room</button>
              <div id="download-message-${product.id}" class="download-message" style="display: none;">Download iniciado...</div>
            </div>
            <img src="comix_zone.jpg" alt="Imagem do produto">
          `;
          productsList.appendChild(li);
        });
      }
    } catch (error) {
      loadingElement.style.display = 'none';
      errorMessageElement.style.display = 'block';
      console.error(error);
    }
  }
  
  function downloadRoom(productName) {
    const downloadMessage = document.getElementById(`download-message-${productName}`);
    downloadMessage.style.display = 'block';
    setTimeout(() => {
      downloadMessage.style.display = 'none';
    }, 2000);
  }
  