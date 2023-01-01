import { AiFillEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, React } from 'react';
import useAxios from '../../../Axios/useAxios';
import { modalStatus, Fskills } from '../../../Redux/Freducer';
import Skills from './Skills';

function Card({ data }) {
  const api = useAxios();
  const dispatch = useDispatch();
  const [dataHandler, setDataHandler] = useState([]);
  const [addskill, setAddSkill] = useState(false);
  const check = useSelector((state) => state.freelancer.modelStatus);
  console.log(check);
  const handleClick = (newid) => {
    dispatch(Fskills(newid));

    dispatch(modalStatus('showmodal'));
  };
  const handleClickL = () => {
    setAddSkill(true)
    dispatch(modalStatus('showmodal'));
  };
  const skills = async () => {
    try {
      const response = await api.get(`/skills/`);
      console.log('response', response.data);

      setDataHandler(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    skills();
  }, [dispatch]);

  if (data === 'skills') {
    return (
      <div className="bg-zinc-200 order-4 rounded-lg  col-span-3  md:col-start-2 col-end-4">
        <div className="pt-2 pl-3 ">
          <h6 className="text-lg  font-bold dark:text-black">{data}</h6>
        </div>
        <ul className="divide-y bg-white rounded-lg pl-10 pr-10 shadow-md divide-white dark:divide-gray-700 m-4 ">
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
                  add skills
                </p>
              </div>
              <div className="hover:cursor-pointer focus:outline-none focus:border-purple-500  focus:pointer-events-auto  inline-flex items-center text-base font-semibold text-purple-600">
                <button onClick={handleClickL} type="button">
                  <AiFillEdit />
                </button>

                {check === 'showmodal' && <Skills addskill={addskill} skills={skills} />}
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
export default Card;
