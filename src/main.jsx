import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';


import { store } from './toolkit/store';

// ## Sentry Tracking ##
import * as Sentry from "@sentry/react";

import.meta.env.VITE_NODE_ENV === 'production' &&
  Sentry.init({
    dsn: "https://0784ad202f2f2c0f6fe694052b61202a@o4508263180337152.ingest.us.sentry.io/4508263195607041",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    // Tracing
    tracesSampleRate: .01, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    // tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    // Session Replay
    replaysSessionSampleRate: 0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>

      <HelmetProvider>
        <App />
      </HelmetProvider>

    </Provider>
  </StrictMode>

);
