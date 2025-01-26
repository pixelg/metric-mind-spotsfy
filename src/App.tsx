import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {SpotifyCallback} from "./components/spotify/SpotifyCallback.tsx";
import {AppContent} from "@/AppContent.tsx";
import {AuthProvider} from "@/components/spotify/AuthProvider.tsx";

const queryClient = new QueryClient();

const storageKey = "metric-minds-auth-state";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider storageKey={storageKey}>
        <BrowserRouter>
          <Routes>
            <Route path="/callback" element={<SpotifyCallback onAuthSuccess={(token) => console.log({token})} />} />
            <Route path="/" element={<AppContent />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
