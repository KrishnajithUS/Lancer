import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAxios from '../../Axios/useAxios';
import ContactSection from '../Client/ServicePage/Components/ContactSection';
import PublicProfileLeft from './ProfileComponents/PublicProfileLeft';

function PublicProfile() {
  const [dataN, setData] = useState([]);
  const [eduData, setEduData] = useState([]);
  const [expData, setExpData] = useState([]);
  const [skill, setSkill] = useState([]);
  const api = useAxios();
  const FreelancerId = useSelector((state) => state.freelancer.Freelancer?.id);
  const id = useSelector((state) => state.user.freelancer_id?.user_id);
  console.log(useSelector((state) => state));
  const data = async () => {
    try {
      const response = await api.post(`publicprofile/`, {
        id: FreelancerId || id,
      });
      console.log(response);
      setData(response?.data);
      setEduData(response.data?.education);
      setExpData(response.data?.experience);
      setSkill(response.data?.skills);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    data();
  }, []);
  console.log(FreelancerId, 'the freelancer id');

  return (
    <div className="grid grid-cols-10 gap-4 mb-auto">
      <div className="md:col-span-4 col-span-full  ml-5 mr-5 mt-5">
        <ContactSection dataN={dataN || ''} status />
      </div>
      <div className="md:col-span-6   col-span-full ">
        <PublicProfileLeft skill={skill} eduData={eduData} expData={expData} />
      </div>
    </div>
  );
}

export default PublicProfile;
