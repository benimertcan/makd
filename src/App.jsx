import { ToastContainer } from 'react-toastify';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Carousel from './components/Carousel';
import Products from './components/Products';
import Furniture from './components/Furniture';
import Wrapper from './components/Wrapper';
import BestSeller, { BestSellerMini } from './components/BestSellerProducts';
import Photo from './components/Photo';
import MostPopular from './components/MostPopular';
import Brands from './components/Brands';
import FeaturedProducts from './components/FeaturedProducts';
import Things from './components/Things';
import UserForm from './components/UserForm';
import LoginForm from './components/LoginForm';
import ShopPage from './components/shoppage/ShopPage';
import Shop from './components/shoppage/Shop';
import ShopProducts from './components/shoppage/ShopProducts';
import ShopProductDetails from './components/shoppage/ShopProductDetails';
import AuthProvider from './components/auth/AuthProvider';
import ShopLayout from './components/shoppage/ShopLayout';
import ShoppingCart from './components/ShoppingCart';
import ProtectedRoute from './components/ProtectedRoute';
import CreateOrder from './pages/CreateOrder';
import Orders from './pages/Orders';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
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
                <Things/>
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
                <FeaturedProducts/>
              </Layout>
            )} />
            <Route path="/shop" exact render={() => (
              <ShopLayout>
                <ShopPage />
              </ShopLayout>
            )} />
            <Route 
              path="/shop/:gender/:categoryName/:categoryId" 
              exact
              render={() => (
                <ShopLayout>
                  <ShopPage />
                </ShopLayout>
              )}
            />
            <Route 
              path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" 
              exact 
              render={() => (
                <ShopLayout>
                  <ShopProductDetails />
                </ShopLayout>
              )} 
            />
            <Route path="/signup" render={() => (
              
                <UserForm />
           
            )} />
            <Route path="/login" render={() => (
           
                <LoginForm />
             
            )} />
            <Route path="/cart" render={() => (
              <Layout>
                <ShoppingCart />
              </Layout>
            )} />
            <ProtectedRoute path="/create-order">
              <Layout>
                <CreateOrder />
              </Layout>
            </ProtectedRoute>
            <ProtectedRoute path="/orders">
              <Layout>
                <Orders />
              </Layout>
            </ProtectedRoute>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
