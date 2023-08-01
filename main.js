import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.path = "./products.txt";
    this.products = [];
  };

  static id = 0;

  addProducts = async (title, description, price, thumbnail, code, stock) => {
    ProductManager.id++;
    let newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: ProductManager.id
    };

    this.products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(this.products));
    };

//Funcion para leer los productos
    readProducts = async () => {
      let respuesta = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(respuesta)
    };

    getProducts = async () => {
      let respuesta2 = await this.readProducts();
      return console.log(respuesta2,);
    };

    getProductsById = async (id) => {
      let respuesta3 = await this.readProducts();
      if(!respuesta3.find(product => product.id === id)) {
        console.log("ID Not Found")
      } else {
        console.log(respuesta3.find(product => product.id === id))
      }
      
    };

    deleteProduct = async (id) => {
      let respuesta3 = await this.readProducts();
      let productFilter = respuesta3.filter(products => products.id != id)
      await fs.writeFile(this.path, JSON.stringify(productFilter));
    };

    updateProduct = async ({ id, ...producto }) => {
      await this.deleteProduct(id);
      let productOld = await this.readProducts()
      let productUpdated = [{...producto, id}, ...productOld];
      await fs.writeFile(this.path, JSON.stringify(productUpdated));
    };
}

const productos = new ProductManager();

//productos.addProducts("Termo", "Un buen termo", 8000, "img1", "code1", 7);
//productos.addProducts("Mate", "Un buen mate", 5000, "img2", "code2", 7);
//productos.addProducts("Bobilla", "Una buena bombilla", 1000, "img3", "code3", 10);

productos.getProducts();

//productos.getProductsById(2);

//productos.deleteProduct(1);

/*
productos.updateProduct({
    title: 'Yerbero',
    description: 'Alto Yerbero',
    price: 800,
    thumbnail: 'img4',
    code: 'code4',
    stock: 12,
    id: 2
})
*/