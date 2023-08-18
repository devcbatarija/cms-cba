module.exports={
    test:async(valor)=>{
        try {
            return "<h1>Hola mundo</h1>"
        } catch (error) {
            return error;
        }
    },
    testRegister:async(user)=>{
        try {
            // console.log(user)
            return user;
        } catch (error) {
            
        }
    },
    testDelete:async(id)=>{ //endpint, punto final logica de negocio
        try {
            return id;
        } catch (error) {
            
        }
    }
}