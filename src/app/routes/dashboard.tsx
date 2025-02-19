import logo from "@/assets/metric-minds-logo.svg";

export const DashboardRoute = () => {
  return (
    <>
      <div className="w-full h-screen container mx-auto p-10">
        <div className="flex items-center gap-x-4 py-6">
          <img
            className="size-12 shrink-0"
            src={logo}
            alt="Metric Minds Logo"
          />
          <div className="text-xl font-medium text-black dark:text-white">
            Welcome to Metric Minds Dashboard!
          </div>
        </div>

        <p className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          suscipit ligula et porttitor lacinia. Praesent blandit augue nec
          feugiat mattis. Integer efficitur, odio non ultrices dictum, felis
          turpis aliquam nulla, sed convallis augue ante sit amet urna. Mauris
          ut mattis felis, nec tristique tellus. Proin dictum libero nec dolor
          sodales, id hendrerit nibh fermentum. Vestibulum hendrerit nisl at
          lacus fermentum, ac congue ligula malesuada. Pellentesque gravida
          viverra nunc vel convallis. Aliquam pulvinar metus a sem rhoncus
          accumsan. Sed congue, nisi eget venenatis imperdiet, lacus lorem
          sodales massa, vel pulvinar augue lacus et arcu. Nullam pretium, arcu
          vitae volutpat rhoncus, ipsum eros tincidunt velit, id feugiat neque
          lacus vel odio.
        </p>
      </div>
    </>
  );
};
