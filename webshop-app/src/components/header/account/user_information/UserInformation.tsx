import React, { useEffect, useState } from 'react';
import UserService from '../../../../services/UserService';
import { User } from '../../../MainContainerData';
import style from './UserInformation.module.css'

const UserInformation: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userInfo = UserService.getUserInfo();
        if (userInfo) {
            setUser(userInfo);
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    const [firstName, lastName] = splitName(user.name);

    function splitName(fullName: string): [string, string | null] {
        const [first, ...last] = fullName.split(' ');
        return [first, last.length > 0 ? last.join(' ') : null];
    }

    return (
        <div className={style.information_container}>
            <div className={`${style.information_heading} u-h1`}>User Information</div>
            <div>
                <div className="u-s3">{lastName ? "First Name" : "Name"}</div>
                <p>{firstName}</p>
            </div>
            {lastName &&
            <div>
                <div className="u-s3">Last Name</div>
                <p>{lastName}</p>
            </div> 
            }
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