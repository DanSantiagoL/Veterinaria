const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la BD (ajusta tus credenciales aquí)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mascotas_bd'
});

db.connect(err => {
  if (err) {
    console.error('❌ Error conectando a la BD:', err);
  } else {
    console.log('✅ Conectado a la BD MySQL');
  }
});

// Rutas de prueba
app.get('/', (req, res) => {
  res.send('Backend Veterinaria funcionando 🚀');
});

// Puerto
app.listen(3000, () => {
  console.log('Servidor backend corriendo en http://localhost:3000');
});

// =======================
// CRUD Cliente
// =======================

// Crear cliente
app.post('/cliente', (req, res) => {
  const { Nombre, Email, Telefono} = req.body;
  const sql = "INSERT INTO cliente (Nombre, Email, Telefono) VALUES (?, ?, ?)";
  db.query(sql, [Nombre, Email, Telefono], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, Nombre, Email, Telefono });
  });
});

// Listar todos los clientes
app.get('/cliente', (req, res) => {
  const sql = "SELECT * FROM cliente";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Obtener un cliente por Id
app.get('/cliente/:id', (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM cliente WHERE Id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ mensaje: "Cliente no encontrado" });
    res.json(result[0]);
  });
});

// Actualizar cliente
app.put('/cliente/:id', (req, res) => {
  const { id } = req.params;
  const { Nombre, Email, Telefono } = req.body;
  const sql = "UPDATE cliente SET Nombre=?, Email=?, Telefono=? WHERE Id=?";
  db.query(sql, [Nombre, Email, Telefono, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Cliente actualizado" });
  });
});

// Eliminar cliente
app.delete('/cliente/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM cliente WHERE Id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Cliente eliminado" });
  });
});


// =======================
// CRUD Mascotas
// =======================

// Crear mascota
app.post('/mascota', (req, res) => {
  const { Nombre, Especie, Raza, Edad, IdCliente } = req.body;
  const sql = "INSERT INTO mascota (Nombre, Especie, Raza, Edad, IdCliente) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [Nombre, Especie, Raza, Edad, IdCliente], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, Nombre, Especie, Raza, Edad, IdCliente });
  });
});

// Listar todas las mascotas
app.get('/mascota', (req, res) => {
  const sql = "SELECT * FROM mascota";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Obtener mascota por ID
app.get('/mascota/:Id', (req, res) => {
  const {Id} = req.params;
  const sql = "SELECT * FROM mascota WHERE Id = ?";
  db.query(sql, [Id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ mensaje: "Mascota no encontrada" });
    res.json(result[0]);
  });
});

// Actualizar mascota
app.put('/mascota/:Id', (req, res) => {
  const {Id} = req.params;
  const { Nombre, Especie, Raza, Edad, IdCliente } = req.body;
  const sql = "UPDATE mascota SET Nombre=?, Especie=?, Raza=?, Edad=?, IdCliente=? WHERE Id=?";
  db.query(sql, [Nombre, Especie, Raza, Edad, IdCliente, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Mascota actualizada" });
  });
});

// Eliminar mascota
app.delete('/mascota/:id', (req, res) => {
  const {Id} = req.params;
  const sql = "DELETE FROM mascota WHERE Id=?";
  db.query(sql, [Id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Mascota eliminada" });
  });
});

// =======================
// CRUD Administrador
// =======================

//Crear administrador
app.post('/administrador', (req, res) => {
  const {Nombre} = req.body;
  const sql = "INSERT INTO administrador (Nombre) VALUES (?)";
  db.query(sql, [Nombre], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, Nombre});
  });
});

// Listar todos los administradores
app.get('/administrador', (req, res) => {
  const sql = "SELECT * FROM administrador";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Obtener un administrador por Id
app.get('/administrador/:id', (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM administrador WHERE Id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ mensaje: "Administrador no encontrado" });
    res.json(result[0]);
  });
});

// Actualizar administrador
app.put('/administrador/:id', (req, res) => {
  const { id } = req.params;
  const { Nombre } = req.body;
  const sql = "UPDATE administrador SET Nombre=? WHERE Id=?";
  db.query(sql, [Nombre, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Administrador actualizado" });
  });
});

// Eliminar administrador
app.delete('/administrador/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM administrador WHERE Id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Administrador eliminado" });
  });
});

// =======================
// CRUD Cita
// =======================

// Crear cita
app.post('/cita', (req, res) => {
  const { Fecha, Hora, Servicio, Estado, IdEmpleado, IdMascota} = req.body;
  const sql = "INSERT INTO cita (Fecha, Hora, Servicio, Estado, IdEmpleado, IdMascota) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [Fecha, Hora, Servicio, Estado, IdEmpleado, IdMascota], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, Fecha, Hora, Servicio, Estado, IdEmpleado, IdMascota});
  });
});

// Listar todas las citas
app.get('/cita', (req, res) => {
  const sql = "SELECT * FROM cita";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Obtener una cita por Id
app.get('/cita/:id', (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM cita WHERE Id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ mensaje: "Cita no encontrada" });
    res.json(result[0]);
  });
});

// Actualizar cita
app.put('/cita/:id', (req, res) => {
  const { id } = req.params;
  const { Fecha, Hora, Servicio, Estado, IdEmpleado, IdMascota } = req.body;
  const sql = "UPDATE cita SET Fecha=?, Hora=?, Servicio=?, Estado=?, IdEmpleado=?, IdMascota=? WHERE Id=?";
  db.query(sql, [Fecha, Hora, Servicio, Estado, IdEmpleado, IdMascota, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Cita actualizada" });
  });
});

// Eliminar cita
app.delete('/cita/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM cita WHERE Id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Cita eliminada" });
  });
});

// =======================
// CRUD Empleado
// =======================

// Crear empleado
app.post('/empleado', (req, res) => {
  const {Nombre, Rol} = req.body;
  const sql = "INSERT INTO empleado (Nombre, Rol) VALUES (?, ?)";
  db.query(sql, [Nombre, Rol], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, Nombre, Rol});
  });
});

// Listar todos los empleados
app.get('/empleado', (req, res) => {
  const sql = "SELECT * FROM empleado";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Obtener empleado por Id
app.get('/empleado/:id', (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM empleado WHERE Id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ mensaje: "Empleado no encontrado" });
    res.json(result[0]);
  });
});

// Actualizar empleado
app.put('/empleado/:id', (req, res) => {
  const { id } = req.params;
  const { Nombre, Rol } = req.body;
  const sql = "UPDATE empleado SET Nombre=?, Rol=? WHERE Id=?";
  db.query(sql, [Nombre, Rol, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Empleado actualizado" });
  });
});

// Eliminar empleado
app.delete('/empleado/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM empleado WHERE Id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Empleado eliminado" });
  });
});

// =======================
// CRUD Pago
// =======================

// Crear pago
app.post('/pago', (req, res) => {
  const {Monto, Fecha, Metodo, IdCliente} = req.body;
  const sql = "INSERT INTO pago (Monto, Fecha, Metodo, IdCliente) VALUES (?, ?, ?, ?)";
  db.query(sql, [Monto, Fecha, Metodo, IdCliente], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, Monto, Fecha, Metodo, IdCliente});
  });
});

// Listar todos los pagos
app.get('/pago', (req, res) => {
  const sql = "SELECT * FROM pago";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Obtener pago por Id
app.get('/pago/:id', (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM pago WHERE Id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ mensaje: "Pago no encontrado" });
    res.json(result[0]);
  });
});

// Actualizar pago
app.put('/pago/:id', (req, res) => {
  const { id } = req.params;
  const { Monto, Fecha, Metodo, IdCliente } = req.body;
  const sql = "UPDATE pago SET Monto=?, Fecha=?, Metodo=?, IdCliente=? WHERE Id=?";
  db.query(sql, [Monto, Fecha, Metodo, IdCliente, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Pago actualizado" });
  });
});

// Eliminar pago
app.delete('/pago/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM pago WHERE Id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Pago eliminado" });
  });
});

// =======================
// CRUD Servicio
// =======================

// Crear servicio
app.post('/servicio', (req, res) => {
  const {Nombre, Descripcion, Costo, IdCita,IdAdmin} = req.body;
  const sql = "INSERT INTO servicio (Nombre, Descripcion, Costo, IdCita, IdAdmin) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [Nombre, Descripcion, Costo, IdCita, IdAdmin], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, Nombre, Descripcion, Costo, IdCita,IdAdmin});
  });
});

// Listar todos los servicios
app.get('/servicio', (req, res) => {
  const sql = "SELECT * FROM servicio";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Obtener servicio por Id
app.get('/servicio/:id', (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM servicio WHERE Id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ mensaje: "Servicio no encontrado" });
    res.json(result[0]);
  });
});

// Actualizar servicio
app.put('/servicio/:id', (req, res) => {
  const { id } = req.params;
  const { Nombre, Descripcion, Costo, IdCita, IdAdmin } = req.body;
  const sql = "UPDATE servicio SET Nombre=?, Descripcion=?, Costo=?, IdCita=?, IdAdmin=? WHERE Id=?";
  db.query(sql, [Nombre, Descripcion, Costo, IdCita, IdAdmin, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Servicio actualizado" });
  });
});

// Eliminar servicio
app.delete('/servicio/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM servicio WHERE Id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Servicio eliminado" });
  });
});

