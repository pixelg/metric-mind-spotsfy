import BaseLayout from "@/components/BaseLayout.tsx";

function Welcome() {
  return (
    <BaseLayout>
      <div className="container mx-auto p-6 md:p-10 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 shadow-md">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-blue-300 dark:text-blue-400">
          Welcome to Metric Mind Jams!
        </h1>
        <p className="text-sm md:text-base leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit
          ligula et porttitor lacinia. Praesent blandit augue nec feugiat mattis.
        </p>
      </div>
    </BaseLayout>
  );
}

export default Welcome;