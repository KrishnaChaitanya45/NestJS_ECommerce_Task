import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { RouterContext } from "../routes/Routes";

export const AuthenticationGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useContext(AuthContext);
  const { replaceState } = useContext(RouterContext);

  if (!user) {
    replaceState("/signin");
  }

  return <>{children}</>;
};
