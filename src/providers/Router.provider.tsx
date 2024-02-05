import { BrowserRouter } from 'react-router-dom';

const Router = ({ children }: { children: React.ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default Router;
