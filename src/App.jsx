import { ToastContainer } from 'react-toastify';
import './App.css'

import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Carousel from './components/Carousel';
function App() {


  return (
    <>
       <ToastContainer />
       <Layout>
        <Carousel/>
        </Layout>
    </>
  )
}

export default App
