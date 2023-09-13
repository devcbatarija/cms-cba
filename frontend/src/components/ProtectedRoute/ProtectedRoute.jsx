import { Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function  ProtectedRoute({ element, ...rest }) {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.login.auth);

  useEffect(()=>{
      if(!auth) {
        navigate('/404');
      }
  },[])
  return(
    <Route {...rest} element={auth ? element : null} />
  ) 
}
export default ProtectedRoute;