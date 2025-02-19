import { Button } from "@/components/ui/button.tsx";
import { login } from "@/lib/spotify-auth.ts";
import logo from "@/assets/metric-minds-logo.svg";

export const LandingRoute = () => {
  return (
    <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
      <img className="size-12 shrink-0" src={logo} alt="Metric Minds Logo" />
      <div>
        <div className="text-xl font-medium text-black dark:text-white">
          Metric Minds
        </div>
        {/*<p className="text-gray-500 dark:text-gray-400">You have a new message!</p>*/}
      </div>
      <Button
        variant="outline"
        className="bg-green-500 hover:bg-green-600 text-white"
        onClick={async () => (window.location.href = await login())}
      >
        Login with Spotify
      </Button>
    </div>

    // <div className="flex flex-col items-center justify-center min-h-screen">
    //   <h1 className="text-3xl font-bold mb-8">Metric Minds</h1>
    //   <Button
    //     variant="outline"
    //     className="bg-green-500 hover:bg-green-600 text-white"
    //     onClick={async () => (window.location.href = await login())}
    //   >
    //     Login with Spotify
    //   </Button>
    // </div>
  );
};
