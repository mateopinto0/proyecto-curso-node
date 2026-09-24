const URL_API=  'https://fakestoreapi.com/products';

const [, , methodInput = '', path= '',title,price,category  ]= process.argv;
const method=methodInput.toUpperCase();
const[resource,id]=path.split("/");

async function apiRequest(url,options= {}){
    try{
        const res= await fetch(url,options);
        const data = await res.json();

        console.dir(data,{depth: null , colors: true})
    }catch(error){
        console.log("Ocurrio el siguiente error " + error)
    }
}

async function getProducts(){

            const url= id ? `${URL_API}/${id}` : `${URL_API}`;
            await apiRequest(url);
}

async function deleteProduct() {
        
    if(!id){
        console.log("No existe el id del producto que desea eliminar")
        return
    }

            const url = id ? `${URL_API}/${id}` : `${URL_API}`;
            await apiRequest(url, {
                method: 'DELETE'
            });
}

async function postProduct() {
      const nuevoProducto = { title: title, price: parseFloat(price), category:category}
     await apiRequest(URL_API,{
        method: 'POST',
        headers:{ 'Content-Type' : 'application/json'},
        body: JSON.stringify(nuevoProducto)
      });
}

const ACTIONS= {
    GET: getProducts,
    POST: postProduct,
    DELETE: deleteProduct
}

function main(){
    if(resource != "products"){
        console.log("Recurso no valido, utilice products")
    }

    const action= ACTIONS[method];
    if(!action){
        return console.log("Metodo no reconocido utilice GET,POSTO DELETE.")
    }
    action();
}

main();