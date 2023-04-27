import React from 'react';
import { useLocation } from 'react-router-dom';
import NavigationPaths from '../../route/navigationPath';
import { getUser } from '../../utils/common';
import LowerFooter from "./component/LowerFooter";
import UpperFooter from "./component/UpperFooter";
const Footer = () => {
  const loggedUser = getUser();
  const location = useLocation()
  let path = location.pathname.split("/")[1].split("-")[0]
  let route = NavigationPaths.APP_REFER.split("/")[1].split("-")[0]

  return (
    <>
      {
        path === route ? null :
          <>
            {!loggedUser &&
              <UpperFooter />
            }
            <LowerFooter />
          </>
      }

    </>
  );
}
export default Footer;