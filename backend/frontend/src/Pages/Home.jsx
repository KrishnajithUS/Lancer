import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Banner from '../Components/Constants/Banner';

function Home() {
  const navigate = useNavigate();
  const userAuth = Boolean(useSelector((state) => state.user.user.isLoggedIn));

  const FAuth = Boolean(
    useSelector((state) => state.freelancer.Freelancer.isLoggedIn),
  );
  useEffect(() => {
    if (userAuth) {
      navigate('/cprofile');
    } else if (FAuth) {
      navigate('/fprofile');
    }
  }, []);
  return (
    <div>
      <Banner />
    </div>
  );
}

export default Home;
