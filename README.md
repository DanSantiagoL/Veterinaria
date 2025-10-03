# 🐾 Veterinaria Backend

Este es el backend del sistema de gestión para la veterinaria.  
Está desarrollado en **Node.js + Express + MySQL** y expone endpoints para manejar clientes, empleados, citas, pagos, servicios, administradores y mascotas.

---

## 🚀 Tecnologías
- Node.js
- Express
- MySQL
- CORS

---

## 📦 Instalación

1. Clonar el repositorio:
   ```
   git clone https://github.com/DanSantiagoL/Veterinaria.git
   cd veterinaria-backend
   ```
2. Instalar dependecias
   ```
   npm install
   ```

 3. Configurar la base de datos en MySql
    
    3.1. Crear la base de datos:
    ```
    CREATE DATABASE veterinaria;
    ```
    3.2. Importar el archivo SQL incluido en la carpeta bd/
    ```
    mysql -u root -p veterinaria < db/veterinaria.sql
    ```
    **(tambien se puede importar copiando y pegando directamente el script)**
5. Revisar credenciales de conexión en veterinaria-backend.js
   ```
   const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',    // pon tu contraseña si aplica
   database: 'veterinaria'
   });
   ```
6. Levantar el servidor
   ```
   node veterinaria-backend.js
   ```
