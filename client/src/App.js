import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultComponent from './components/UserComponent/DefaultComponent/DefaultComponent';
const {routes} = require('./routes/index');

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
              <Page/>
                </Layout>
            }/>
            )
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
