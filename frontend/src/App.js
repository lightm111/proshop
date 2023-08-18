import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container fluid className='pt-3'>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer autoClose={3000} theme="dark" position="top-center" />
    </>
  )
}

export default App
