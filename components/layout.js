
import Header from './Header'
import Footer from './Footer'
import Context from '../context/context'



export default function Rootlayout({ children }){
    return(
      <Context>
            <Header />
                { children }
            <Footer/>
      </Context>
    )
}
