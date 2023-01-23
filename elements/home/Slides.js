//import Carousel from 'react-bootstrap/Carousel';
import styles from '../../styles/Home.module.css'
import Carousel from 'react-bootstrap/Carousel'

/**
 * 
 * @color {*this is the site background color} param0 
 * @categories {*array containing objects of [category, imgurl] fields} param1
 * @shopDsc {*Short description of all available product categories} param2
 * @returns Carousel of the different available categories
 * 
 */
const HomeSlides = ({color, categories, shopDsc}) => {
  return (
    <div style={{background: color}} className={styles.outerSlides}>
        <Carousel>
             {
                  categories ? categories.map((item) =>
                  <Carousel.Item key={item.category}>
                    <div className='d-flex justify-content-center'>
                      <img
                        className={ styles.slideImg }
                        src={item.imgurl}
                        alt={item.category}
                      />
                    </div>
                    <Carousel.Caption>
                      <div className='d-flex justify-content-center'>
                        <div className={styles.transparent}>
                        <a className={styles.productCart} href={'#products'}>{item.category}</a>
                          <p>{shopDsc}</p>
                        </div>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>
                  ) : ""
             }  
        </Carousel>
      </div>
  );
}

export default HomeSlides;

