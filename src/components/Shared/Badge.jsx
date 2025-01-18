import React from 'react';
import useAdoptedPet from '../../Hooks/useAdoptedPet';

const Badge = () => {
    const {adopted} = useAdoptedPet()
  return (
    <span
      className={`inline-block rounded-full text-sm font-semibold text-rose-700 bg-rose-200`}
    >
      {adopted.length}+
    </span>
  );
};

export default Badge;
