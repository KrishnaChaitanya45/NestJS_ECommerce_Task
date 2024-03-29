import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import { AuthenticationGuard } from "./guards/AuthenticationGuard";
import SignIn from "./pages/Authentication/SignIn/SignIn";
import SignUp from "./pages/Authentication/SignUp/SignUp";
import Cart from "./pages/Cart/Cart";
import Homepage from "./pages/Homepage/Homepage";
import Orders from "./pages/Orders/Orders";
import User from "./pages/Users/User";
import { Route } from "./routes/Route";
import { Router } from "./routes/Routes";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router initialPath="/">
          <Route path="/">
            <AuthenticationGuard>
              <Homepage />
            </AuthenticationGuard>
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/cart">
            <AuthenticationGuard>
              <Cart />
            </AuthenticationGuard>
          </Route>
          <Route path="/orders">
            <AuthenticationGuard>
              <Orders />
            </AuthenticationGuard>
          </Route>
          <Route path="/users">
            <AuthenticationGuard>
              <User />
            </AuthenticationGuard>
          </Route>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
