import { useParams } from 'react-router-dom';

export const useParam = (key = 'id') => {
  const params = useParams();
  return params[key] as string;
};
