export const ProductService = {
  getProductsData() {
    return [
     {
       id: "1009",
       code: "cm230f032",
       name: "Gaming Set",
       description: "Product Description",
       image: "gaming-set.jpg",
       price: 299,
       category: "Electronics",
       quantity: 63,
       inventoryStatus: "INSTOCK",
       rating: 3,
       orders: [
         {
           id: "1009-0",
           productCode: "cm230f032",
           date: "2020-06-24",
           amount: 299,
           quantity: 1,
           customer: "Kadeem Mujtaba",
           status: "PENDING",
         },
         {
           id: "1009-1",
           productCode: "cm230f032",
           date: "2020-05-11",
           amount: 299,
           quantity: 1,
           customer: "Ashley Wickens",
           status: "DELIVERED",
         },
         {
           id: "1009-2",
           productCode: "cm230f032",
           date: "2019-02-07",
           amount: 299,
           quantity: 1,
           customer: "Julie Johnson",
           status: "DELIVERED",
         },
         {
           id: "1009-3",
           productCode: "cm230f032",
           date: "2020-04-26",
           amount: 299,
           quantity: 1,
           customer: "Tony Costa",
           status: "CANCELLED",
         },
       ],
     },
     {
       id: "1010",
       code: "plb34234v",
       name: "Gold Phone Case",
       description: "Product Description",
       image: "gold-phone-case.jpg",
       price: 24,
       category: "Accessories",
       quantity: 0,
       inventoryStatus: "OUTOFSTOCK",
       rating: 4,
       orders: [
         {
           id: "1010-0",
           productCode: "plb34234v",
           date: "2020-02-04",
           amount: 24,
           quantity: 1,
           customer: "James Butt",
           status: "DELIVERED",
         },
         {
           id: "1010-1",
           productCode: "plb34234v",
           date: "2020-05-05",
           amount: 48,
           quantity: 2,
           customer: "Josephine Darakjy",
           status: "DELIVERED",
         },
       ],
     },
   ];
  },



  getProducts() {
    return Promise.resolve(this.getProductsData());
  },


};
