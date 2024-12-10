import { ToastContainer } from 'react-toastify';
import './App.css'

import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Carousel from './components/Carousel';
import Products from './components/Products';
function App() {


  return (
    <>
       <ToastContainer />
       <Layout>
        <Carousel/>
        <Products/>
        </Layout>
    </>
  )
}

export default App
