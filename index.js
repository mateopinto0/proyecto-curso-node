const URL_API=  'https://fakestoreapi.com/products';

const method=process.argv[2].toUpperCase();
const path=process.argv[3] || "";
const title= process.argv[4];
const price= process.argv[5];
const category= process.argv[6];
const[resource,id]=path.split("/");

async function getProducts(){
    
        try{
            const url= id ? `${URL_API}/${id}` : `${URL_API}`;
            const res= await fetch(url);
            const data= await res.json();
            console.log(data);
        }catch(error){
            console.log(error)
        }
}

async function deleteProduct() {
        
    if(!id){
        console.log("No existe el id del producto que desea eliminar")
        return
    }

    try{
            const url = id ? `${URL_API}/${id}` : `${URL_API}`;
            const res=await fetch(url, {
                method: 'DELETE'
            });
            const data= await res.json();
            console.log(data)
    }catch(error){
        console.log(error)
    }
}

async function postProduct() {
      const nuevoProducto = { title: title, price: parseFloat(price), category:category}

    try{
     const res= await fetch(URL_API,{
        method: 'POST',
        headers:{ 'Content-Type' : 'application/json'},
        body: JSON.stringify(nuevoProducto)
      });
      const data= await res.json();
      console.log(data)
    }catch(error){
        console.log(error)
    }
}
if(resource != "products"){
    console.log("Recurso no valido, utilice products")
}else{
switch(method){
    case 'GET':
            getProducts();
        break;
    case 'DELETE':
            deleteProduct();
        break; 
    case 'POST':
            postProduct()
        break;    
    default:
        console.log("Comando no reconocido")
        break;    
}
}