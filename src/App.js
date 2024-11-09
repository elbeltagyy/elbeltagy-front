import './App.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { themeSettings } from './style/theme';
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { routes } from './settings/routes/routes';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache'

import * as locales from '@mui/material/locale';
import { arSD } from '@mui/x-data-grid/locales';

function App() {

  const { mode } = useSelector(s => s.global)
  const theme = useMemo(() => createTheme(themeSettings(mode), locales["arSD"], arSD), [mode]) // he used useMemo ???


  const routesObj = createBrowserRouter(routes, {
    future: {
      v7_partialHydration: true
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
