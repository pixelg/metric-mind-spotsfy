import BaseLayout from "@/components/BaseLayout.tsx";

function Welcome() {
  return (
    <BaseLayout>
      <div className="container mx-auto p-10">
        <h1>Welcome to Metric Mind Jams!</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit
          ligula et porttitor lacinia. Praesent blandit augue nec feugiat mattis.
          Integer efficitur, odio non ultrices dictum, felis turpis aliquam nulla,
          sed convallis augue ante sit amet urna. Mauris ut mattis felis, nec
          tristique tellus. Proin dictum libero nec dolor sodales, id hendrerit nibh
          fermentum. Vestibulum hendrerit nisl at lacus fermentum, ac congue ligula
          malesuada. Pellentesque gravida viverra nunc vel convallis. Aliquam
          pulvinar metus a sem rhoncus accumsan. Sed congue, nisi eget venenatis
          imperdiet, lacus lorem sodales massa, vel pulvinar augue lacus et arcu.
          Nullam pretium, arcu vitae volutpat rhoncus, ipsum eros tincidunt velit,
          id feugiat neque lacus vel odio.
        </p>
      </div>
    </BaseLayout>
  );
}

export default Welcome;