import React from 'react';
import MainPage from  './MainPage';
import {Redirect} from 'react-router-dom';

export default function Home({history})
{
  const local=localStorage.getItem('auth');
  return(
          (local?(<MainPage history={history}/>):<Redirect to="/"/>)
  );
}
