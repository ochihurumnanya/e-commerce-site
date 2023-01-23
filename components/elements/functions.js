/*
  * createSlides - Create slides based on available categories
  * Returns: An object containing Arrays of sorted images and 
  * categories based on available categories
  */
 //NOTE DO NOT CREATE SLIDS THIS WAY. EACH TIME STORE OWNERS CREATE A NEW PRODUCT THERI
 //CATEGORY REF IS UPDATE. SO PULL THIS CATEGORIES WHICH WILL HAVE THEIR VARIOUS PRODUCT
 //IMAGES. THIS MEANS THE SORTING WILL BE DON EON THE DASHBOARD.
 export const createSlides = (products) => {
  let catImg = [];
  let categories = [];
  let allCartName =  [];

  products.forEach((product)=>{
  if (!allCartName.includes(product.category)){
    categories.push(
                  {
                    category: product.category,
                    imgurl: product.img
                  }
                );

    allCartName.push(product.category);
  }
  });
  return categories
}