# **Asistente Personal - API Backend**

## Descripción

Este proyecto es la API de un asistente personal que permite gestionar pendientes (tareas). Está desarrollado utilizando **Node.js**, **Express**, **Mongoose** y **MongoDB**. La aplicación permite a los usuarios crear, leer, actualizar y eliminar pendientes, así como asociarlos a un usuario específico.

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:
/mi-proyecto │ ├── /controlador # Lógica para manejar las operaciones de los modelos. ├── /modelo # Definición de los esquemas de MongoDB. ├── /ruta # Rutas para las solicitudes de la API. │ 
├── index.js # Archivo principal del servidor Express. ├── package.json # Archivo de configuración del proyecto. 
├── README.md # Este archivo de documentación. └── .env # Variables de entorno (opcional para la configuración).



### **Archivos Principales**

- **index.js**: El archivo que inicia el servidor Express y maneja la conexión con MongoDB.
- **/controlador/Pendiente.js**: Controlador que contiene la lógica para manejar las solicitudes relacionadas con los pendientes (crear, obtener, actualizar y eliminar).
- **/modelo/Pendiente.js**: Definición del esquema de MongoDB para los pendientes.
- **/ruta/PendienteRuta.js**: Rutas que exponen los endpoints de la API relacionados con los pendientes.

## Instalación

### Requisitos
- **Node.js** (preferiblemente la versión LTS)
- **MongoDB** (local o en la nube, como MongoDB Atlas)

### Pasos para la instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/mi-proyecto.git
   cd mi-proyecto


### **Archivos Principales**

- **index.js**: El archivo que inicia el servidor Express y maneja la conexión con MongoDB.
- **/controlador/Pendiente.js**: Controlador que contiene la lógica para manejar las solicitudes relacionadas con los pendientes (crear, obtener, actualizar y eliminar).
- **/modelo/Pendiente.js**: Definición del esquema de MongoDB para los pendientes.
- **/ruta/PendienteRuta.js**: Rutas que exponen los endpoints de la API relacionados con los pendientes.

## Instalación

### Requisitos
- **Node.js** (preferiblemente la versión LTS)
- **MongoDB** (local o en la nube, como MongoDB Atlas)

### Pasos para la instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/mi-proyecto.git
   cd mi-proyecto

###Endpoints de la API

La API está organizada en los siguientes endpoints:

Usuarios
POST /api/users: Crear un nuevo usuario.

GET /api/users: Obtener todos los usuarios.

GET /api/users/:id: Obtener un usuario por su ID.

PUT /api/users/:id: Actualizar los datos de un usuario por su ID.

DELETE /api/users/:id: Eliminar un usuario por su ID.

Pendientes
POST /api/pendientes: Crear un nuevo pendiente.
GET /api/pendientes: Obtener todos los pendientes.

GET /api/pendientes/:id: Obtener un pendiente por su ID.

PUT /api/pendientes/:id: Actualizar un pendiente por su ID.
DELETE /api/pendientes/:id: Eliminar un pendiente por su ID.

Modelo de Datos
Pendiente
El modelo Pendiente se define con los siguientes campos:

Titulo: (Requerido) El título del pendiente.

Descripcion: (Requerido) Una descripción del pendiente.

Fecha: (Requerido) La fecha en que se debe completar el pendiente.

Estado: El estado del pendiente. Puede ser:

'Pendiente' (valor por defecto)

'Completado'

Prioridad: La prioridad del pendiente. Puede ser:

'Baja'

'Media' (valor por defecto)

'Alta'

FechaCreacion: Fecha de creación del pendiente (gestionada automáticamente por Mongoose).

FechaActualizacion: Fecha de última actualización (gestionada automáticamente por Mongoose).

Usuario: Referencia al usuario que creó el pendiente.

Usuario
El modelo Usuario debe tener los siguientes campos básicos (dependiendo de cómo lo hayas definido):

Nombre: Nombre del usuario.

Correo: Correo electrónico del usuario.

Pendientes: Lista de pendientes asociados al usuario.
