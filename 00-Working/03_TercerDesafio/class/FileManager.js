import fs from 'fs';
import path from 'path';

class FileManager {
    constructor(archivo, ruta) {
        this.fs = fs;
        this.path = path;
        this.archivo = this.path.join(ruta, archivo);

    }

    setArchivo(origenDatos) {
        try {
            this.fs.writeFileSync(this.archivo, JSON.stringify(origenDatos), 'utf8');
            console.log('Archivo escrito con éxito');
        } catch (error) {
            console.error('Error al escribir en el archivo:', error);
        }
    }

    async getItemsArchivo() {
        try {
            const data = await this.fs.promises.readFile(this.archivo, 'utf8');
            const contenido = JSON.parse(data);
            return contenido;
        } catch (error) {
            console.error('Error al leer el archivo:', error);
        }
    }

   eliminarArchivo() {
        try {
            this.fs.unlinkSync(this.archivo);
            console.log('Archivo eliminado con éxito');
        } catch (error) {
            console.error('Error al eliminar el archivo:', error);
        }
    }

    validarExistenciaArchivo(archivo) {
        try {
            if (this.fs.existsSync(archivo)) {
                
                return true;
            } else {
                
                return false;
            }
            } catch (error) {
            console.log('El archivo no existe');
        }
    }

}

export default FileManager;


// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de fatos y la ruta
const farchivo = new FileManager('archivo.json', 'C:/Proyectos/Coder/00-working/03_tercerdesafio');
//const farchivo = new FileManager('archivo.json', 'C:/Coderhouse/Backend/03-TercerDesafio');
console.log('01- el archivo es', farchivo.archivo);

farchivo.validarExistenciaArchivo('C:/Proyectos/Coder/00-working/03_tercerdesafio/archivo.json');
farchivo.validarExistenciaArchivo('C:/Proyectos/Coder/00-working/03_tercerdesafio/archivo2.json');








