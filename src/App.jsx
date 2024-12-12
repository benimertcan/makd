import React from "react";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Carousel from './components/Carousel';
import Products from './components/Products';
import Furniture from './components/Furniture';
import Wrapper from './components/Wrapper';
import BestSeller from './components/BestSellerProducts';
import Photo from './components/Photo';
import MostPopular from './components/MostPopular';
import UserForm from "./components/UserForm";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Switch>
          <Route path="/" exact render={() => (
            <Layout>
              <Carousel />
              <Products />
              <Wrapper>
                <Furniture source={"/images/furnitureFirst.jpg"} />
                <BestSeller />
              </Wrapper>
              <Wrapper>
                <Photo source={"/images/photoOne.jpg"} />
                <MostPopular />
              </Wrapper>
            </Layout>
          )} />
          <Route path="/signup" component={UserForm} />
          {/* Add other routes here */}
        </Switch>
      </Router>
    </>
  );
}

export default App;