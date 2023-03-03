import Spinner from 'react-bootstrap/Spinner'

const Spinners = () => {
    return(
        <div className="container" style={{marginBottom: "200px", margingTop: "50px"}}>
            <br/>
            <center>
                <Spinner animation='grow' varient="dark"/>
                <Spinner animation='grow' varient="dark"/>
                <Spinner animation='grow' varient="dark"/>
                <Spinner animation='grow' varient="dark"/>
            </center>
        </div>
      )
}
export default Spinners