import React from 'react';
import { useParams } from 'react-router-dom';
export default function User() {
  let { uid } = useParams();
  console.log(uid);

  return <div>{uid}</div>;
}
