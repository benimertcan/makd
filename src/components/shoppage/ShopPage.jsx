import { Route, Switch } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import ShopProductDetails from './ShopProductDetails';
import Shop from './Shop';
import Brands from '../Brands.jsx';
function ShopPage() {
    const dispatch = useDispatch();
    const username = useSelector((store) => {
        return store.auth.username;
    });

    return (
        <main className="flex-1 flex flex-col justify-center items-start w-full max-w-[1200px] mx-auto px-4">
            <Switch>
                <Route exact path="/shop" component={Shop} />
                <Route path="/shop/:gender/:categoryName/:categoryId" component={Shop} />
                <Route path="/shop/product/:id" component={ShopProductDetails} />
            </Switch>
            <Brands />
        </main>
    );
}

export default ShopPage;