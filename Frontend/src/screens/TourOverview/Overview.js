import classes from "./Overview.module.css";
import { BiTimeFive } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { AiOutlineCalendar, AiOutlineStar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import { useLocation } from "react-router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./../../Loader/Loader.js";
import { getTourDetails } from "./../../actions/tourActions.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const Overview = ({ match }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const getTour = useSelector((state) => state.getTour);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, tour } = getTour;

  useEffect(() => {
    dispatch(getTourDetails(id));
  }, [dispatch, id]);

  const handleBooking = () => {
    let bookingBtn = document.getElementById("booking");
    bookingBtn.textContent = "Processing...";
    const addStripe = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const session = await axios.get(
        `/api/booking/checkoutsession/${id}/${userInfo._id}`,
        config
      );

      const stripePromise = loadStripe(
        "pk_test_51JQctCSBSSpWSSeFvjdOljj6944N2c5isoW0H3wWOo0tQ8ggF5GiKlwCWyr3uYY6BWmdIrXTOWDQX3XYhHGBqS3I00u9h5FtJ2"
      );
      const stripe = await stripePromise;

      await stripe.redirectToCheckout({
        sessionId: session.data.session.id,
      });
    };
    addStripe();
  };

  if (!loading && tour && Object.keys(tour).length !== 0)
    // if (Object.keys(tour).length !== 0)
    return (
      <>
        <div>
          <div className={classes.overview_coverimage}>
            <img
              alt="cover-img"
              src={require(`./../../img/tours/${tour.imageCover}`).default}
            />
          </div>
          <div className={classes.intro}>
            <div className={classes.intro_title}>{tour.name} Tour</div>
            <div className={classes.intro_info}>
              <div className={classes.intro_info_text}>
                <BiTimeFive className={classes.intro_info_text_icon} />{" "}
                <p>{tour.duration} days</p>
              </div>
              <div className={classes.intro_info_text}>
                <GoLocation className={classes.intro_info_text_icon} />
                <p>{tour.startLocation.description}</p>
              </div>
            </div>
          </div>
          <div className={classes.details}>
            <div className={classes.details_spec}>
              <div>
                <div className={classes.details_spec_facts}>
                  <h1 className="title">Quick facts</h1>
                  <div className={classes.details_spec_fact}>
                    <AiOutlineCalendar className={classes.icon} />{" "}
                    <p>
                      <b>NEXT DATE</b> 15 Augest
                    </p>{" "}
                  </div>
                  <div className={classes.details_spec_fact}>
                    <FiTrendingUp className={classes.icon} />{" "}
                    <p>
                      <b>DIFFICULTY</b> {tour.difficulty}
                    </p>{" "}
                  </div>
                  <div className={classes.details_spec_fact}>
                    <BsPersonFill className={classes.icon} />{" "}
                    <p>
                      <b>PARTICIPANTS</b> {tour.maxGroupSize}
                    </p>{" "}
                  </div>
                  <div className={classes.details_spec_fact}>
                    <AiOutlineStar className={classes.icon} />{" "}
                    <p>
                      <b>RATINGS</b> {tour.ratingsAverage}/5
                    </p>{" "}
                  </div>
                </div>
                <div className={classes.tourguide}>
                  <h1 className="title">Your Tour Guide</h1>
                  <div className={classes.details_spec_fact}>
                    <img
                      alt="guide"
                      src={
                        require(`./../../img/users/${tour.guides[0].photo}`)
                          .default
                      }
                    />
                    <p>
                      <b className={classes.role}>{tour.guides[0].role}</b>
                      {tour.guides[0].name}
                    </p>
                  </div>
                  <div className={classes.details_spec_fact}>
                    <img
                      alt="guide"
                      src={
                        require(`./../../img/users/${tour.guides[1].photo}`)
                          .default
                      }
                    />
                    <p>
                      <b className={classes.role}>{tour.guides[1].role}</b>
                      {tour.guides[1].name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.details_summary}>
              <div>
                <h1 className="title">About {tour.name}</h1>
                <p>{tour.description}</p>
              </div>
            </div>
          </div>
          <div className={classes.imageGallery}>
            <img
              src={require(`./../../img/tours/${tour.images[0]}`).default}
              alt={tour.images[0]}
            />
            <img
              src={require(`./../../img/tours/${tour.images[1]}`).default}
              alt={tour.images[1]}
            />
            <img
              src={require(`./../../img/tours/${tour.images[2]}`).default}
              alt={tour.images[2]}
            />
          </div>
          <div className={classes.booking}>
            <div className={classes.booking_div}>
              <div>
                <h1 className="title">WHAT ARE YOU WAITING FOR?</h1>
                <h3>
                  {tour.duration} days, 1 adventure. Infinite memories. Make it
                  yours today!
                </h3>
              </div>
              <div>
                {userInfo ? (
                  <Link
                    to="/auth/login"
                    id="booking"
                    className="btn"
                    onClick={handleBooking}
                  >
                    Book Tour
                  </Link>
                ) : (
                  <a className="btn" href="/auth/login">
                    log in to book tour
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  else return <Loader className="loading" />;
};

export default Overview;
