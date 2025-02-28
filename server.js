const express = require('express');
const app = express();
const cors = require('cors'); 
const port = 3000;

app.use(cors()); 

const data = [
  { id: 1, name: 'Comix Zone', price: 10.00, category: 'Arcade', description: 'Sega Genesis' },
  { id: 2, name: 'Produto B', price: 20.00, category: 'Categoria 2', description: 'Descrição do Produto B' },
  { id: 3, name: 'Produto C', price: 30.00, category: 'Categoria 1', description: 'Descrição do Produto C' },
  { id: 4, name: 'Produto D', price: 40.00, category: 'Categoria 3', description: 'Descrição do Produto D' },
  { id: 5, name: 'Produto E', price: 50.00, category: 'Categoria 2', description: 'Descrição do Produto E' },
];


app.get('/api/products', (req, res) => {
  res.json(data);
});


app.get('/api/products/search', (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : '';
  const filteredProducts = data.filter(product => 
    product.name.toLowerCase().includes(query) || 
    product.category.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );
  
  res.json(filteredProducts);
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
