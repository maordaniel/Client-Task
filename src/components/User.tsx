import React from "react";
import '../styles/HomePageStyle.css';
import {UserType} from "../types/UserTyps";
import moment from 'moment';

interface Props{
  user: UserType
}

function User({user}: Props){

  const calcDays = (end_date1:string, end_date2:string) =>{
    const jobA = moment(end_date1);
    const jobB = moment(end_date2);

    return jobA.diff(jobB, 'days')
  }

  return(
    <div className="user-card">
      <h1 className="title"> Hello {user.contact_info.name.formatted_name}</h1>
      <div>
        {user.experience.length === 0 ? <h3>No experience</h3>
          :
          user.experience.map((item, index, elements) =>
            <div key={index} className="jobs">
              <span>Worked as: {item.title}, From {item.start_date} To {item.end_date}</span>
              {elements[index+1] && elements[index+1].end_date &&
                <span>Gap between jobs: {calcDays(item.end_date, elements[index+1].end_date)}</span>}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default User