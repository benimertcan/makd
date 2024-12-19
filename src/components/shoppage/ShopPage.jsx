import { User, Search, ShoppingCart, Menu, ChevronDown, LogOut, Heart } from 'lucide-react';
import { Link, Route, Switch } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Footer from '../Footer';
import ShopFooter from './ShopFooter';
import ShopProductDetails from './ShopProductDetails';
import Shop from './Shop';
import Header from '../Header';

function ShopPage() {
    const dispatch = useDispatch();
    const username = useSelector((store) => {
        return store.auth.username;
    });

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header/>

            {/* Main Content */}
            <main className="flex-1 flex justify-center items-start w-full max-w-[1200px] mx-auto px-4">
                <Switch>
                    <Route exact path="/shop" component={Shop} />
                    <Route path="/shop/product/:id" component={ShopProductDetails} />
                </Switch>
            </main>

            {/* Footer */}
            <ShopFooter/>
        </div>
    );
}

export default ShopPage;