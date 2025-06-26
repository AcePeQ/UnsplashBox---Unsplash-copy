import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Layout from "./components/Layouts/Layout";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage/SearchPage"));
const CollectionsPage = lazy(
  () => import("./pages/CollectionsPage/CollectionsPage")
);
const ImagePage = lazy(() => import("./pages/ImagePage/ImagePage"));
const CollectionPage = lazy(
  () => import("./pages/CollectionPage/CollectionPage")
);

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/image/:image_id" element={<ImagePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route
              path="/collection/:collection_name"
              element={<CollectionPage />}
            />
            <Route path="/search/:query" element={<SearchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        theme="light"
        pauseOnHover
        transition={Zoom}
        style={{ zIndex: "100000" }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
