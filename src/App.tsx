import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {SpotifyAuthHandler} from "./components/spotify/SpotifyAuthHandler.tsx";
import {AppContent} from "@/AppContent.tsx";
import {AuthProvider} from "@/components/auth/contexts/AuthProvider.tsx";
import RecentlyPlayed from "@/components/spotify/RecentlyPlayed.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/callback" element={<SpotifyAuthHandler
              onAuthSuccess={() => window.location.href="/"}
              onAuthFailure={(error) => {console.log(error);}}
            />}
            />
            <Route path="/" element={<AppContent />} />
            <Route path="/recently-played" element={<RecentlyPlayed />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
