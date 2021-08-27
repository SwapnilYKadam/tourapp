import classes from "./Card.module.css";
import { GoLocation } from "react-icons/go";
import { AiOutlineCalendar, AiOutlineFlag } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Card = (props) => {
  const tour = props.tour;

  return (
    <div className={classes.card}>
      <div className={classes.card_image}>
        <img
          alt="cover-img"
          src={require(`./../../img/tours/${tour.imageCover}`).default}
        />
        <div className={classes.card_title}>{tour.name}</div>
      </div>
      <div className={classes.card_details}>
        <h4 className={classes.card_details_div}>
          {tour.difficulty} {tour.duration}-DAY Tour
        </h4>
        <div className={classes.card_details_div}>{tour.summary}</div>
        <div className={classes.card_info}>
          <div className={classes.card_info_div}>
            <div className={classes.card_info_div}>
              {" "}
              <GoLocation className={classes.icon} />
              <p>{tour.startLocation.description}</p>
            </div>
            <div className={classes.card_info_div}>
              {" "}
              <AiOutlineCalendar className={classes.icon} />
              <p>15 Aug</p>
            </div>
          </div>
          <div className={classes.card_info_div}>
            <div className={classes.card_info_div}>
              {" "}
              <AiOutlineFlag className={classes.icon} />
              <p>{tour.locations.length} stops</p>
            </div>
            <div className={classes.card_info_div}>
              {" "}
              <BsPersonFill className={classes.icon} />
              <p>{tour.maxGroupSize} people</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.card_details_nav}>
        <div className={classes.card_details_nav_price}>
          <p>
            <b>₹ {tour.price * 10}</b> per person
          </p>{" "}
          <p>
            <b>{tour.ratingsAverage}</b> rating({tour.ratingsQuantity})
          </p>
        </div>
        <div className={classes.details_btn}>
          <Link className="btn" to={`tours/${tour._id}`}>
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
