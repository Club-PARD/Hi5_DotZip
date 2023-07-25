import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePageRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/home');
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div>
      {/* 여기에 원하는 리다이렉트 화면을 구성할 수 있습니다. */}
      {/* 예를 들어, 로딩 스피너 또는 리다이렉트 안내 메시지 등을 추가할 수 있습니다. */}
    </div>
  );
};

export default HomePageRedirect;
