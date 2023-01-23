import 'bootstrap/dist/css/bootstrap.min.css'
import Rootlayout from '../components/layout'

export default function App({ Component, pageProps }) {
  return (
      <Rootlayout>
        <Component {...pageProps} />
      </Rootlayout> 
  )
}