import { useSelector } from "react-redux";

const Footer = (props) => {
  const loggedInUser = useSelector((state) => state.auth.user.data);

  if (!loggedInUser || !loggedInUser.email) {
    return <></>;
  }

  return (
    <footer>
      <p className="text-center text">Copyright © Your Website 2021</p>
    </footer>
  );
};

export default Footer;
