import './Error.css'
import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { DEFAULT_ROUTE } from '../../utils/consts';

const Error = () => {
  const [translation] = useTranslation();
  const error = useRouteError()
  const navigate = useNavigate()
        return (
          <div className="error" onClick={() => 
            navigate(DEFAULT_ROUTE)
          }>
            <h1>{translation('error.status')} {error.status}</h1>
            <h1>{translation('error.message')} {error.data}</h1>
          </div>             
        )
}
  export default Error;