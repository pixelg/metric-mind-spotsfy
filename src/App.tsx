import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {SpotifyCallback} from "./components/spotify/SpotifyCallback.tsx";
import {AppContent} from "@/AppContent.tsx";
import {SpotifyAuthProvider} from "@/components/spotify/SpotifyAuthProvider.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SpotifyAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/callback" element={<SpotifyCallback onAuthSuccess={(token) => console.log({token})} />} />
            <Route path="/" element={<AppContent />} />
          </Routes>
        </BrowserRouter>
      </SpotifyAuthProvider>
    </QueryClientProvider>
  )
}

export default App
