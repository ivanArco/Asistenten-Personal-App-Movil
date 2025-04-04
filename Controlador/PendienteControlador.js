const Pendiente = require('../Modelo/Pendiente');
const User = require('../Modelo/Usuario');
const mongoose = require('mongoose');


// Crear un pendiente
const createPendiente = async (req, res) => {
    try {
        console.log("Datos recibidos:", req.body);
        const { Usuario, Titulo, Descripcion, Fecha, Estado, Prioridad } = req.body;

        // Verificar que los datos obligatorios estén presentes
        if (!Titulo || !Descripcion || !Fecha) {
            return res.status(400).json({ message: "Todos los campos obligatorios deben estar completos." });
        }

        // Crear un nuevo pendiente
        const nuevoPendiente = new Pendiente({
            Titulo,
            Descripcion,
            Fecha,
            Estado: Estado || "Pendiente",
            Prioridad: Prioridad || "Media",
            Usuario
        });

        // Guardar el pendiente
        nuevoPendiente.FechaActualizacion = Date.now();
        const pendienteGuardado = await nuevoPendiente.save();

        // Actualizar el usuario con la referencia al nuevo pendiente
        await User.findByIdAndUpdate(Usuario, { $push: { Pendientes: pendienteGuardado._id } });

        res.status(201).json(pendienteGuardado);
    } catch (error) {
        console.error("Error al crear pendiente:", error.message);
        res.status(500).json({ message: "Ocurrió un error " + error.message });
    }
};

module.exports = {
    createPendiente
};


// Recuperar todos los pendientes
const getPendientes = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        console.log("Usuario ID recibido:", usuarioId); // Verifica qué se recibe

        if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
            return res.status(400).json({ message: 'ID de usuario no válido' });
        }

        const pendientes = await Pendiente.find({ Usuario: usuarioId }).populate('Usuario', 'Nombre Correo');
        console.log("Pendientes encontrados:", pendientes); // Imprime los resultados de la consulta

        if (pendientes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron pendientes para este usuario' });
        }

        res.status(200).json(pendientes);
    } catch (error) {
        console.error(`Error al recuperar los pendientes:`, error);
        res.status(500).json({ message: 'Ocurrió un error ' + error.message });
    }
};




// Recuperar un pendiente por su ID
const getPendienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const pendiente = await Pendiente.findById(id).populate('Usuario', 'Nombre Correo');
        if (!pendiente) {
            return res.status(404).json({ message: 'Pendiente no encontrado' });
        }
        res.status(200).json(pendiente);
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error ' + error.message });
    }
}


// Actualizar un pendiente por su ID para un usuario específico
const updatePendienteById = async (req, res) => {
    try {
        // Suponer que pasas el ID del usuario como parámetro o en el body
        const { id } = req.params;
        const userId = req.body.usuarioId; // O de donde obtengas el ID del usuario

        // Buscar y actualizar el pendiente que pertenece al usuario
        const pendienteActualizado = await Pendiente.findOneAndUpdate(
            { 
                _id: id,     // Buscar por el ID del pendiente
                usuario: userId // Y asegurarse que pertenece al usuario
            }, 
            {
                ...req.body, // Spread de los campos a actualizar
                FechaActualizacion: Date.now() // Actualizar fecha de modificación
            }, 
            { 
                new: true,   // Devolver el documento actualizado
                runValidators: true // Ejecutar validadores del esquema
            }
        );

        // Si no se encuentra el pendiente
        if (!pendienteActualizado) {
            return res.status(404).json({ 
                message: 'Pendiente no encontrado o no tienes permisos para actualizarlo' 
            });
        }

        res.status(200).json(pendienteActualizado);
    } catch (error) {
        console.error('Error al actualizar pendiente:', error);
        res.status(500).json({ 
            message: 'Ocurrió un error al actualizar el pendiente',
            error: error.message 
        });
    }
}

// Eliminar un pendiente por su ID
const deletePendienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const pendienteEliminado = await Pendiente.findByIdAndDelete(id);
        if (!pendienteEliminado) {
            return res.status(404).json({ message: 'Pendiente no encontrado' });
        }

        // Actualizar el usuario para eliminar la referencia al pendiente
        await User.findByIdAndUpdate(pendienteEliminado.Usuario, { $pull: { Pendientes: id } });

        res.status(200).json({ message: 'Pendiente eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error ' + error.message });
    }
}

module.exports = {
    createPendiente,      // Crear un pendiente
    getPendientes,        // Recuperar todos los pendientes
    getPendienteById,     // Recuperar un pendiente por su ID
    updatePendienteById,  // Actualizar un pendiente por su ID
    deletePendienteById   // Eliminar un pendiente por su ID
}