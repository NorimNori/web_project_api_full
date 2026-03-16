# Alrededor de los EE. UU. (React + Node.js) 🇺🇸📸

## 📝 Descripción del proyecto

**"Alrededor de los EE. UU."** es una galería web interactiva creada como parte del proyecto número 18 del bootcamp de desarrollo web de [TripleTen](https://tripleten.com/). El proyecto fue migrado para ser adaptado al framework **React.js** utilizando **JSX**, y posteriormente se desarrolló un **backend propio con Node.js y Express** para manejar autenticación, usuarios y tarjetas.

La aplicación ofrece una experiencia completa de usuario que incluye validación de formularios, visualización de errores en la interfaz, edición de perfil, creación de nuevas tarjetas con imagen, botones de “me gusta” y eliminación de contenido.

La información del perfil y las tarjetas se almacenan en una base de datos y se gestionan a través de una API REST protegida con autenticación mediante **JSON Web Tokens (JWT)**.

### 🖱️ Funcionalidades implementadas

- Ventanas modales con funcionalidad de abrir/cerrar.
- Visualización de una galería de lugares destacados en Estados Unidos.
- Diseño responsivo para distintas resoluciones.
- Vista ampliada de la imagen mediante un popup modal al hacer clic sobre la foto.
- Edición del perfil directamente desde un formulario emergente.
- Botón de "like" que cambia de estado activo/inactivo.
- Eliminación de tarjetas creadas por el usuario.
- Actualización de la imagen de perfil.
- Registro de nuevos usuarios con confirmación de éxito o error.
- Inicio de sesión con autenticación mediante JWT.
- Cierre de sesión desde el encabezado.
- Rutas protegidas que impiden el acceso al contenido principal sin autenticación.
- Persistencia de sesión mediante almacenamiento del token en `localStorage`.
- Header dinámico que cambia según el estado de autenticación del usuario.
- Validación y sanitización de datos tanto en frontend como en backend.

### 💻 Tecnologías utilizadas

**Frontend**
- React.js
- React Context
- JSX
- HTML5
- CSS3
- JavaScript (ES6+)
- Metodología BEM

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Celebrate & Joi (validación)
- Winston & Morgan (logging)

**Infraestructura**
- Nginx
- PM2
- Certbot (HTTPS)
- Google Cloud VM
- FreeDNS

**Control de versiones**
- Git
- GitHub

---

## 🌐 Acceso al servidor

La aplicación se encuentra desplegada en un servidor remoto.

- **Frontend:**  
  https://chasing.green-alien.net  

- **API Backend:**  
  https://api.chasing.green-alien.net  

El servidor está configurado con **Nginx** como servidor web, ejecuta la aplicación backend con **Node.js** administrado por **PM2**, y utiliza **HTTPS mediante Certbot** para conexiones seguras.

---

## 💡 Planes de mejora

A futuro, me gustaría implementar las siguientes mejoras:

- Añadir animaciones suaves al abrir/cerrar popups.
- Implementar loaders en botones de envío de formularios.
- Optimizar la gestión de estado global.
- Mejorar accesibilidad (ARIA).
- Añadir pruebas unitarias y de integración.

---

Este proyecto marcó la continuación de mi práctica con **React** y el desarrollo de **APIs backend con Node.js**, permitiéndome construir una aplicación full-stack completa y desplegarla en un entorno de producción.