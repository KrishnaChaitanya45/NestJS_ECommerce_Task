import React, { useContext } from 'react';
import { RouterContext } from './Routes';
export const Route = ({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) => {
  const { path: currentPath } = useContext(RouterContext);
  //? we company the url by removing the query string
  if (currentPath.split('?')[0] == path.split('?')[0]) {
    return <>{children}</>;
  } else {
    return null;
  }
};
