import React from 'react';

import ContactSection from '../Client/ServicePage/Components/ContactSection';
import PublicProfileLeft from './ProfileComponents/PublicProfileLeft';

function PublicProfile() {
  return (
    <div className="grid grid-cols-10 gap-4 ">
      <div className="md:col-span-4 col-span-full  ml-5 mr-5 mt-5">
        <ContactSection status />
      </div>
      <div className="md:col-span-6   col-span-full ">
        <PublicProfileLeft />
      </div>
    </div>
  );
}

export default PublicProfile;
