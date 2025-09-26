import './App.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { themeSettings } from './style/theme';
import { RouterProvider, createBrowserRouter, } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';


import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache'

import * as locales from '@mui/material/locale';
import { arSD } from '@mui/x-data-grid/locales';
import Layout from './pages/Layout';
import ErrorPage from './pages/errors/ErrorPage';
import { routesLinks } from './settings/sidebarLinks';

function App() {

  const { mode } = useSelector(s => s.global)
  const theme = useMemo(() => createTheme(themeSettings(mode), locales["arSD"], arSD), [mode]) // he used useMemo ???

  const routes = [
    {
      path: "/", element: <Layout />, errorElement: <ErrorPage />,
      children: routesLinks
    }
  ]

  const routesObj = createBrowserRouter(routes, {
    future: {
      v7_partialHydration: true,
      v7_startTransition: true, // Enable the startTransition flag
      v7_skipActionErrorRevalidation: true, // Opt-in to skip revalidation on 4xx/5xx action errors
      v7_relativeSplatPath: true, // Opt into the new relative path resolution in splat routes
      v7_fetcherPersist: true, // Opt-in to the new fetcher persistence behavior
      v7_normalizeFormMethod: true, // Opt-in to normalize form method to uppercase
    }
  })
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });


  return (
    <div className="App">
      <CacheProvider value={cacheRtl}>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={routesObj}></RouterProvider>
        </ThemeProvider>

      </CacheProvider>
    </div>
  );
}

export default App;
