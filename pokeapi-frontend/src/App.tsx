import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/layout";
import Home from "./pages/home";
import PokemonDetailsPage from "./pages/pokemon-details";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        {
          path: "/",
          index: true,
          Component: Home,
        },
        {
          path: "/view/:pokemonId",
          Component: PokemonDetailsPage,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
