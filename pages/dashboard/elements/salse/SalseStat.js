import { useEffect } from "react"

const SalseStat = ({ salse }) => {

    const getAllProductsStatFromSalse = () => {
        //get all products from all salse
        let allproducts = []
        salse.forEach((sale) =>{
         const saleProducts = sale.products.map((product) => product )
         let tempProducts = [...allproducts, ...saleProducts]
         allproducts = tempProducts
        }) 
        
        //sorted product stat
        const productStats = []
        //sorted product name
        const productNames = []
  
        allproducts.forEach((product) => {
            if (!productNames.includes(product.name)) {
                productNames.push(product.name)
                productStats.push(0)
            }
  
            if (productNames.includes(product.name)) {
              const index = productNames.indexOf(product.name)
              productStats[index] += product.qty
            }
        })
        return {
          productNames: [...productNames.map((name, index) => name+" - "+productStats[index])],
          productStats: productStats
        }
  
      }

      useEffect(()=>{
        const labels = getAllProductsStatFromSalse().productNames.length > 0  ? getAllProductsStatFromSalse().productNames : []
        const stat = getAllProductsStatFromSalse().productStats.length > 0 ? getAllProductsStatFromSalse().productStats : []

        new Chartist.Line(
          '.ct-chart-line',
          {
            //labels: ['nxus 230 - 13','dell 420 - 15','iphone 14 pro - 12','wrist whatch - 50'],
            labels: labels,
            series: [
              //[13,15,12,50]
              stat
            ],
          },
          {
            showArea: true,
          }
          );

        }, [])

    

      return(
        <div class="col-md-12">
            <h2>Sales Stat</h2>
            <div class="ct-perfect-fourth ct-chart-line"></div>
        </div>
      )
}
export default SalseStat