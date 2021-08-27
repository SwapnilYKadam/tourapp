import Card from "../../components/Card/Card";
import classes from "./Home.module.css";
// import tours from "./../../dev-data/data/tours";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listTours } from './../../actions/tourActions.js'
import { Loader } from './../../Loader/Loader.js'

const Home = () => {
  const dispatch = useDispatch()

  const tourList = useSelector(state => state.tourList);
  const { loading, error, tours } = tourList;

  useEffect(() => {
    dispatch(listTours())
  }, [dispatch]);

  return (
    <>
      {
        loading ? (<Loader className="loading" />) : error ? (<h3 className={classes.loading}>{error}</h3>) :
          <div className={classes.home}>
            {
              tours.map((tour) => (
                <Card key={tour._id} className={classes.row} tour={tour} />
              ))
            }
          </div>
      }
    </>
  );
};

export default Home;
