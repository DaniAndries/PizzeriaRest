const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

// Products list
const products = [
  {
      "id": 1,
      "name": "Margarita",
      "price": 8.50,
      "type": "pizza",
      "size": "BIG",
      "ingredients": [
          {
              "id": 1,
              "name": "Mozzarella",
              "alergens": ["Dairy"]
          },
          {
              "id": 2,
              "name": "Tomato",
              "alergens": []
          },
          {
              "id": 3,
              "name": "Basil",
              "alergens": []
          }
      ]
  },
  {
      "id": 2,
      "name": "Pepperoni",
      "price": 9.00,
      "type": "pizza",
      "size": "MEDIANA",
      "ingredients": [
          {
              "id": 1,
              "name": "Mozzarella",
              "alergens": ["Dairy"]
          },
          {
              "id": 4,
              "name": "Pepperoni",
              "alergens": []
          }
      ]
  },
  {
      "id": 3,
      "name": "Spaghetti",
      "price": 7.00,
      "type": "pasta",
      "size": null,
      "ingredients": [
          {
              "id": 5,
              "name": "Spaghetti",
              "alergens": ["Gluten"]
          },
          {
              "id": 6,
              "name": "Carne Molida",
              "alergens": []
          },
          {
              "id": 7,
              "name": "Salsa Boloñesa",
              "alergens": ["Dairy"]
          }
      ]
  },
  {
      "id": 4,
      "name": "Coca-Cola",
      "price": 2.50,
      "type": "drinks",
      "size": "MEDIANA",
      "ingredients": [] // No tiene ingredients
  },
  {
      "id": 5,
      "name": "Mineral Water",
      "price": 1.50,
      "type": "drinks",
      "size": "PEQUENA",
      "ingredients": [] // No tiene ingredients
  },
  // Nueva pizza
  {
      "id": 6,
      "name": "Four Cheeses",
      "price": 10.00,
      "type": "pizza",
      "size": "BIG",
      "ingredients": [
          {
              "id": 1,
              "name": "Mozzarella",
              "alergens": ["Dairy"]
          },
          {
              "id": 2,
              "name": "Gorgonzola",
              "alergens": ["Dairy"]
          },
          {
              "id": 3,
              "name": "Parmesano",
              "alergens": ["Dairy"]
          },
          {
              "id": 4,
              "name": "Ricotta",
              "alergens": ["Dairy"]
          }
      ]
  },
  // Nueva drinks
  {
      "id": 7,
      "name": "Fanta Orange",
      "price": 2.00,
      "type": "drinks",
      "size": "MEDIANA",
      "ingredients": [] // No tiene ingredients
  },
  // Nuevo plato de pasta
  {
      "id": 8,
      "name": "Pasta Alfredo",
      "price": 8.00,
      "type": "pasta",
      "size": null,
      "ingredients": [
          {
              "id": 9,
              "name": "Noodles",
              "alergens": ["Gluten"]
          },
          {
              "id": 10,
              "name": "Salsa Alfredo",
              "alergens": ["Dairy"]
          },
          {
              "id": 11,
              "name": "Parsley",
              "alergens": []
          }
      ]
  }
];

// Ruta para obtener productos
app.get('/products', (req, res) => {
  res.send(products);  // Enviar solo la lista de productos
});

// List of clients
let clients = [
    {
        id: 1,
        dni: "12345678A",
        name: "Juan Pérez",
        direction: "Calle Falsa 123",
        phone: "555123456",
        mail: "juan@gmail.com",
        password: "1234",
        orders: [] 
      }
]
app.get('/clients', (req, res) => {
  res.send(clients);
});

// Ruta para agregar un nuevo cliente
app.post('/clients/register', (req, res) => {
  console.log("Data receive:" + req.body); 
  const { dni, name, direction, phone, mail, password } = req.body;
  // Verificar si ya existe un cliente con el mismo mail
  const clientExistent = clients.find(c => c.mail === mail);
  if (clientExistent) {
    // Si el mail ya está registrado, devolver un error
    return res.status(400).send({ message: 'The user with the mail: ${mail} already exist.' });
  }
  // Crear un nuevo cliente
  const newClient = {
    id: clients.length + 1, // Generar un nuevo ID
    dni,
    name,
    direction,
    phone,
    mail,
    password,
    orders: [] // Inicialmente vacío
  };

  // Agregar el nuevo cliente a la lista
  clients.push(newClient);

  // Responder con el nuevo cliente
  res.status(201).send(newClient);
});

// Ruta para login de un cliente
app.post('/clients/login', (req, res) => {
  const { mail, password } = req.body;

  // Buscar el cliente por mail
  const client = clients.find(c => c.mail === mail);

  // Verificar si el cliente existe y si la contraseña coincide
  if (client && client.password === password) {
    res.status(200).send(client);
  } else {
    res.status(401).send({ message: 'mail or pasword wrong' });
  }
});

// Servidor escuchando
app.listen(port, () => {
  console.log(`Server listening on the port: ${port}`);
});
