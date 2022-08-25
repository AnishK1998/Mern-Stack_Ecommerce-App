import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { getProduct , clearErrors} from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard";


const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products} = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);

  return (
    <Fragment>
      { loading ? <Loader />
        :  <Fragment>
        <MetaData title="Ecommerce" />
        <div className="banner">
          <p>Welcome to Clothing Store</p>
          <h1>FIND AMAZING PRODUCTS BELOW</h1>
          <a href="#container">
            <button>
              Scroll <CgMouse />
            </button>
          </a>
        </div>
        <div className="homeHeading">Featured Products</div>
        <div className="container" id="container">
          {products && products.map((product) => <ProductCard product={product} />)}
        </div>
      </Fragment>
      }
    </Fragment>
   
  );
};

export default Home;
