import mongoose from 'mongoose';

function connect(){

const URI =`mongodb+srv://franciscogelabert:k6fNeJCfUJeOy77u@ecommerce.yssf83p.mongodb.net/?retryWrites=true&w=majority`;

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