const URL_API=  'https://fakestoreapi.com/products';

const method=process.argv[2];
const path=process.argv[3] || "";
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

switch(method){
    case 'GET':
        if(resource == 'products'){
            getProducts();
        }
        break;
    case 'DELETE':
        if(resource == 'products'){
            deleteProduct();
        }
        break;    
    default:
        console.log("Comando no reconocido")
        break;    
}