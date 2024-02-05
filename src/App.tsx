import { Toaster } from 'sonner';
import Mantine from './providers/Mantine.provider';
import AppRouter from './providers/Router.provider';
import { Navigate, Route, Routes } from 'react-router-dom';
import Query from './providers/Query.provider';
import { useUser } from './store/useAuth';
import AuthLayout from './layouts/Auth.layout';
import HomeLayout from './layouts/Home.layout';
import LoginPage from './pages/Login.page';
import RegisterPage from './pages/Register.page';
import HomePage from './pages/Home.page';
import ProfilePage from './pages/Profile.page';
import WordPage from './pages/Word.page';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ProfileWords from './pages/ProfileWords.page';
import ProfileLearning from './pages/ProfileLearning.page';
import ProfileResults from './pages/ProfileResults.page';
import Dashboard from './pages/Dashboard.page';

dayjs.extend(relativeTime);

const App = () => {
  const { token, user } = useUser();

  return (
    <AppRouter>
      <Toaster richColors position='top-center' />
      <Mantine>
        <Query>
          <Routes>
            <Route path='/auth' element={!token ? <AuthLayout /> : <Navigate to='/' />}>
              <Route index element={<Navigate to='/auth/login' />} />
              <Route path='login' element={<LoginPage />} />
              <Route path='register' element={<RegisterPage />} />
            </Route>
            <Route path='/' element={token ? <HomeLayout /> : <Navigate to='/auth' />}>
              <Route index element={<HomePage />} />
              <Route path='dashboard' element={user?.isAdmin ? <Dashboard /> : <Navigate to='/' />} />
              <Route path='profile' element={<ProfilePage />}>
                <Route index element={<ProfileWords />} />
                <Route path='learning' element={<ProfileLearning />} />
                <Route path='results' element={<ProfileResults />} />
              </Route>
              <Route path='word/:id' element={<WordPage />} />
            </Route>
          </Routes>
        </Query>
      </Mantine>
    </AppRouter>
  );
};

export default App;
