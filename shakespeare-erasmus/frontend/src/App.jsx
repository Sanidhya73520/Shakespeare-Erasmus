import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import IdleTimeout from './components/IdleTimeout';

const EntryPortal    = React.lazy(() => import('./components/Pages/EntryPortal'));
const MainHub        = React.lazy(() => import('./components/Pages/MainHub'));
const DiscoverYourself  = React.lazy(() => import('./components/Pages/DiscoverYourself'));
const CharacterResult   = React.lazy(() => import('./components/Pages/CharacterResult'));
const MeetTheCharacter  = React.lazy(() => import('./components/Pages/MeetTheCharacter'));
const DiscoverEvents    = React.lazy(() => import('./components/Pages/DiscoverEvents'));
const Step1_Details     = React.lazy(() => import('./components/Pages/PlantYourLegacy/Step1_Details'));
const Step2_FlowerChoice= React.lazy(() => import('./components/Pages/PlantYourLegacy/Step2_FlowerChoice'));
const Step3_Confirmation= React.lazy(() => import('./components/Pages/PlantYourLegacy/Step3_Confirmation'));
const ShakespeareGarden = React.lazy(() => import('./components/Pages/ShakespeareGarden'));
const ExploreWorld   = React.lazy(() => import('./components/Pages/ExploreWorld'));
const JourneySummary = React.lazy(() => import('./components/Pages/JourneySummary'));
const Layout           = React.lazy(() => import('./components/Layout/Layout'));
const BehindTheCurtain = React.lazy(() => import('./components/Pages/BehindTheCurtain'));

const LoadingSpinner = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-shakespeare-dark">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-festival-orange border-t-transparent"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <IdleTimeout timeoutMs={120000}>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="min-h-screen bg-shakespeare-dark text-white font-body selection:bg-festival-purple selection:text-white">
              <Routes>
                {/* Global Layout wrapping all routes for constant navigation */}
                <Route element={<Layout />}>
                  <Route path="/" element={<EntryPortal />} />

                  {/* Discover Yourself — chatbot flow */}
                  <Route path="/discover"        element={<DiscoverYourself />} />
                  <Route path="/discover/result" element={<CharacterResult />} />

                  {/* Plant Your Legacy — multi-step flow */}
                  <Route path="/plant"       element={<Step1_Details />} />
                  <Route path="/plant/step2" element={<Step2_FlowerChoice />} />
                  <Route path="/plant/step3" element={<Step3_Confirmation />} />

                  {/* Garden */}
                  <Route path="/garden" element={<ShakespeareGarden />} />

                  {/* Behind the Curtain */}
                  <Route path="/behind-curtain" element={<BehindTheCurtain />} />

                  {/* Main app sections */}
                  <Route path="/main-hub" element={<MainHub />} />
                  <Route path="/meet"     element={<MeetTheCharacter />} />
                  <Route path="/events"   element={<DiscoverEvents />} />
                  <Route path="/globe"    element={<ExploreWorld />} />
                  <Route path="/summary"  element={<JourneySummary />} />
                </Route>
              </Routes>
            </div>
          </Suspense>
        </IdleTimeout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
