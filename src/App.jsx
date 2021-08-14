import React from 'react';
import { Game, Loader } from './components';
import { useScreenManager } from './reducers/hooks';

function App() {
  const { isLoading } = useScreenManager();
  return (
    <div className="center-flex-vh" style={{ minHeight: '100vh' }}>
      <Loader show={isLoading} />
      <Game />
    </div>
  );
}

export default App;
