import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Container fluid className='pt-3'>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default App
