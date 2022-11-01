import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './components/Home';
import Question from './components/Question';
import Result from './components/Result';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path: "/quiz",
    element: <Question></Question>
  },
  {
    path: "/result",
    element: <Result></Result>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
