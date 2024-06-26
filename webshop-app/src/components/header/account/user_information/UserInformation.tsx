import React, { useEffect, useState, useRef } from 'react';
import UserService from '../../../../services/UserService';
import { User } from '../../../MainContainerData';
import style from './UserInformation.module.css';
import ElementaryAnimation from '../../../../scripts/ElementaryAnimation';

const UserInformation: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await UserService.getUserInfo();
      if (userInfo) {
        setUser(userInfo);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (user && containerRef.current) {
      new ElementaryAnimation(containerRef.current); // Manually trigger animation
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const [firstName, lastName] = splitName(user.name);

  function splitName(fullName: string): [string, string | null] {
    const [first, ...last] = fullName.split(' ');
    return [first, last.length > 0 ? last.join(' ') : null];
  }

  return (
    <div ref={containerRef} className={`${style.information_container} animated_content`} data-animation="elementScaleIn">
      <div className={`${style.information_heading} u-h1`}>User Information</div>
      <div>
        <div className="u-s3">{lastName ? "First Name" : "Name"}</div>
        <p>{firstName}</p>
      </div>
      {lastName && (
        <div>
          <div className="u-s3">Last Name</div>
          <p>{lastName}</p>
        </div>
      )}
      <div>
        <div className="u-s3">Email</div>
        <p>{user.email}</p>
      </div>
      <div>
        <div className="u-s3">Role</div>
        <p>{user.role}</p>
      </div>
    </div>
  );
};

export default UserInformation;