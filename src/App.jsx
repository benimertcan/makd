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
import ShopHeader from './components/shoppage/shopHeader';
import ShopPage from './components/shoppage/ShopPage';
import Shop from './components/shoppage/Shop';
import ShopProducts from './components/shoppage/ShopProducts';
import ShopProductDetails from './components/shoppage/ShopProductDetails';
import AuthProvider from './components/auth/AuthProvider';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Protected Route component
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" state={{ from: props.location }} replace />
        )
      }
    />
  );
};

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
            <ProtectedRoute path="/shop" component={ShopPage} />
            <Route path="/signup" component={UserForm} />
            <Route path="/login" component={LoginForm} />
            {/* Add other protected routes here */}
          </Switch>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
