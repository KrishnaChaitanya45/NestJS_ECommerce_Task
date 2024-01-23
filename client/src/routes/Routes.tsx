import React, { createContext, useEffect } from 'react';

//? Types
type RouterProps = {
  initialPath: string;
  children: React.ReactNode;
};

export const RouterContext = createContext({
  path: '',
  pushState: (path: string) => {},
  replaceState: (path: string) => {},
});

export const Router = ({ initialPath, children }: RouterProps) => {
  const canIUseWindow = typeof window !== 'undefined';
  const [path, setPath] = React.useState(
    canIUseWindow ? window.location.pathname : initialPath,
  );

  const pushState = (path: string) => {
    window.history.pushState({}, '', path);
    setPath(path);
  };

  const replaceState = (path: string) => {
    window.history.replaceState({}, '', path);
    setPath(path);
  };

  useEffect(() => {
    //? handle back and forward buttons in window
    window.onpopstate = () => {
      setPath(window.location.pathname);
    };
  }, []);

  return (
    <RouterContext.Provider value={{ path, pushState, replaceState }}>
      {children}
    </RouterContext.Provider>
  );
};
