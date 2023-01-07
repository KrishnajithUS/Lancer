/* eslint-disable quotes */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/img-redundant-alt */

import { AiFillEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, React } from 'react';
import useAxios from '../../../Axios/useAxios';
import { modalStatus, modalStatusN, Fskills } from '../../../Redux/Freducer';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';

function Card({ data }) {
  const api = useAxios();
  const dispatch = useDispatch();
  const [dataHandler, setDataHandler] = useState([]);
  const [edataHandler, setDataeHandler] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [expState, setExpState] = useState('');
  const [eduState, setEduState] = useState('');

  const check = useSelector((state) => state.freelancer.modelStatus);
  const checkL = useSelector((state) => state.freelancer.modelStatusN);
  console.log(educationData);
  const handleClick = (newid) => {
    dispatch(Fskills(newid));

    dispatch(modalStatus('showmodal'));
  };
  const handleClickL2 = (newid) => {
    dispatch(Fskills(newid));
    setExpState('showexp');
  };
  const handleClickL3 = () => {
    setExpState('showexp2');
    console.log('experience', expState);
  };
  const handleClickL = () => {
    dispatch(modalStatusN('showmodal'));
  };
  const handleClickE = (newid) => {
    dispatch(Fskills(newid));
    setEduState('showedu');
  };
  const handleClickE2 = () => {
    setEduState('showedu2');
  };
  console.log('experience state', expState);
  const skills = async () => {
    try {
      const response = await api.get(`/skills/`);
      console.log('response', response.data);

      setDataHandler(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const experience = async () => {
    try {
      const response = await api.get(`/eupdate/`);
      console.log('response', response.data);

      setDataeHandler(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const education = async () => {
    try {
      const response = await api.get(`/edupdate/`);
      console.log('response educatjion', response.data);

      setEducationData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    skills();
    experience();
    education();
  }, []);

  if (data === 'skills') {
    return (
      <div className="bg-zinc-200 order-4 rounded-lg  col-span-3  md:col-start-2 col-end-4">
        <div className="pt-2 pl-3 ">
          <h6 className="text-lg  font-bold dark:text-black">{data}</h6>
        </div>
        <ul
          role="list"
          className="divide-y bg-white rounded-lg pl-10 pr-10 shadow-md divide-white dark:divide-gray-700 m-4 "
        >
          {dataHandler.map((item) => {
            return (
              <li key={item.id} className="py-3 sm:py-4">
                <div className="flex justify-end items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                      {item.skills}
                    </p>
                  </div>
                  <div className="hover:cursor-pointer focus:outline-none focus:border-purple-500  focus:pointer-events-auto  inline-flex items-center text-base font-semibold text-purple-600">
                    <button onClick={() => handleClick(item)} type="button">
                      <AiFillEdit />
                    </button>

                    {check === 'showmodal' && (
                      <Skills dataHandler={dataHandler} skills={skills} />
                    )}
                  </div>
                </div>
              </li>
            );
          })}
          <li className="py-3 sm:py-4">
            <div className="flex justify-end items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                  Add skills
                </p>
              </div>
              <div className="hover:cursor-pointer focus:outline-none focus:border-purple-500  focus:pointer-events-auto  inline-flex items-center text-base font-semibold text-purple-600">
                <button onClick={handleClickL} type="button">
                  <AiFillEdit />
                </button>

                {checkL === 'showmodal' && <Skills addskill skills={skills} />}
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
  if (data === 'Experience') {
    return (
      <div className="bg-zinc-200 order-4 rounded-lg  col-span-3  md:col-start-2 col-end-4">
        <div className="pt-2 pl-3 ">
          <h6 className="text-lg  font-bold dark:text-black">{data}</h6>
        </div>
        <ul
          role="list"
          className="divide-y bg-white rounded-lg pl-10 pr-10 shadow-md divide-white dark:divide-gray-700 m-4 "
        >
          {edataHandler.map((item) => (
            <li className="py-3 sm:py-4">
              <div className="flex justify-end items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                    {item.company}
                  </p>
                </div>
                <div className="hover:cursor-pointer focus:outline-none focus:border-purple-500  focus:pointer-events-auto  inline-flex items-center text-base font-semibold text-purple-600">
                  <button onClick={() => handleClickL2(item)} type="button">
                    <AiFillEdit />
                  </button>

                  {expState === 'showexp' && (
                    <Experience
                      experience={experience}
                      setExpState={setExpState}
                      expState={expState}
                    />
                  )}
                </div>
              </div>
            </li>
          ))}

          <li className="py-3 sm:py-4">
            <div className="flex justify-end items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                  Add Experience
                </p>
              </div>
              <div className="hover:cursor-pointer focus:outline-none focus:border-purple-500  focus:pointer-events-auto  inline-flex items-center text-base font-semibold text-purple-600">
                <button onClick={() => handleClickL3()} type="button">
                  <AiFillEdit />
                </button>

                {expState === 'showexp2' && (
                  <Experience
                    experience={experience}
                    addnew
                    setExpState={setExpState}
                    expState={expState}
                  />
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
  if (data === 'Education') {
    return (
      <div className="bg-zinc-200 order-4 rounded-lg  col-span-3  md:col-start-2 col-end-4">
        <div className="pt-2 pl-3 ">
          <h6 className="text-lg  font-bold dark:text-black">{data}</h6>
        </div>
        <ul
          role="list"
          className="divide-y bg-white rounded-lg pl-10 pr-10 shadow-md divide-white dark:divide-gray-700 m-4 "
        >
          {educationData.map((item) => (
            <li key={item.id} className="py-3 sm:py-4">
              <div className="flex justify-end items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                    {item.university}
                  </p>
                </div>
                <div className="hover:cursor-pointer focus:outline-none focus:border-purple-500  focus:pointer-events-auto  inline-flex items-center text-base font-semibold text-purple-600">
                  <button onClick={() => handleClickE(item)} type="button">
                    <AiFillEdit />
                  </button>

                  {eduState === 'showedu' && (
                    <Education
                      education={education}
                      setEduState={setEduState}
                      eduState={eduState}
                    />
                  )}
                </div>
              </div>
            </li>
          ))}
          <li className="py-3 sm:py-4">
            <div className="flex justify-end items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                  add skills
                </p>
              </div>
              <div className="hover:cursor-pointer focus:outline-none focus:border-purple-500  focus:pointer-events-auto  inline-flex items-center text-base font-semibold text-purple-600">
                <button onClick={() => handleClickE2()} type="button">
                  <AiFillEdit />
                </button>

                {eduState === 'showedu2' && (
                  <Education
                    education={education}
                    setEduState={setEduState}
                    eduState={eduState}
                    addnew
                  />
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Card;
