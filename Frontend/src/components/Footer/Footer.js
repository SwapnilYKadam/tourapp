import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer_logo}>
        <img alt="logo" src={require("./../../img/logo-green.png").default} />
      </div>
      <div className={classes.footer_nav}>
        <ul>
          <li>About us</li>
          <li>Download app</li>
          <li>Become a guide</li>
          <li>Careers</li>
          <li>Contact</li>
        </ul>
        <p>&copy; by Swapnil Kadam</p>
      </div>
    </footer>
  );
};

export default Footer;
