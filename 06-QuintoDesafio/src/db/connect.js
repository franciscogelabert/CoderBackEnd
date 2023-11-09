import mongoose from "mongoose";

function connect(){
const MONGO_HOST = 'localhost';
const MONGO_DB = 'Prueba';

const URI =`mongodb://${MONGO_HOST}/${MONGO_DB}`;
mongoose.connect(URI)
.then(

    ()=>{
        console.log('Base de datos lista para usarse');
    },
    (err)=>{
        console.log('Ha ocurrido un error --> ',err);
    }
)
}

export default connect;