import React, { useEffect, useState } from 'react';
import style from './AnnouncementBar.module.css';
import DiscountCodeService from '../../services/DiscountCodeService';

const AnnouncementBar: React.FC = () => {
  const [headerColor, setHeaderColor] = useState("#00ced1");
  const [discountCode, setDiscountCode] = useState('');
  const [error, setError] = useState(false);

  const blink = () => {
    setHeaderColor('#00e0e3');
    const timeoutID = setTimeout(() => {
      setHeaderColor('#00ced1');
      const timeoutID2 = setTimeout(() => {
        setHeaderColor('#00e0e3');
        const timeoutID3 = setTimeout(() => {
          setHeaderColor('#00ced1');
        }, 150);
        return () => clearTimeout(timeoutID3);
      }, 150);
      return () => clearTimeout(timeoutID2);
    }, 150);
    return () => clearTimeout(timeoutID);
  };

  useEffect(() => {
    const intervalID = setInterval(blink, 5000);

    DiscountCodeService.fetchActiveDiscountCode()
      .then((response) => {
        setDiscountCode(response.data.code);
        setError(false);
      })
      .catch(() => {
        setError(true);
      });

    return () => clearInterval(intervalID);
  }, []);

  if (error || !discountCode) {
    document.documentElement.style.setProperty('--ann-bar-height', '0px');
    return null;
  } else {
    if(window.innerWidth >= 1025) {
        document.documentElement.style.setProperty('--ann-bar-height', '39.8px');
    } else {
        document.documentElement.style.setProperty('--ann-bar-height', '32.8px');
    }
  }

  return (
    <div className={`${style.discount_banner} announcement_bar`} style={{ backgroundColor: headerColor }}>
      <div className={`${style.discount_code} u-h3 not_mobile`}>SUMMER SALE: {discountCode} for 25% OFF</div>
      <div className={`${style.discount_code} u-h3 not_pocket not_desktop`}>{discountCode} for 25% OFF</div>
    </div>
  );
};

export default AnnouncementBar;