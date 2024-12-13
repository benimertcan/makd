import { ToastContainer } from 'react-toastify';
import './App.css'

import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Carousel from './components/Carousel';
import Products from './components/Products';
import Furniture from './components/Furniture';
import Wrapper from './components/Wrapper';
import BestSeller, { BestSellerMini } from './components/BestSellerProducts';
import Photo from './components/Photo';
import MostPopular from './components/MostPopular';
import Brands from './components/Brands';
function App() {


  return (
    <>
      <ToastContainer />
      <Layout>
        <Carousel />
        <Products />
        <Wrapper>
          <Furniture source={"/images/furnitureFirst.jpg"} />
          <BestSeller />
        </Wrapper>
        <Wrapper>
          <Photo source={"/images/photoOne.jpg"}/>
          <MostPopular/>
        </Wrapper>
        <Wrapper>          
          <BestSeller />
          <Furniture source={"/images/donut.jpg"} />
        </Wrapper>
        <Wrapper>
          <MostPopular/>
          <Photo source={"/images/sandwich.jpg"}/>
        </Wrapper>
        <BestSellerMini />
        <Brands/>
      </Layout>
    </>
  )
}

export default App
