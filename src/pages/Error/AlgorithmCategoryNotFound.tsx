export default function AlgorithmCategoryNotFound({
  category,
}: {
  category: string;
}) {
  return (
    <div className="m-auto  ">
      <h1 className="dark:text-white text-5xl sm:text-6xl">
        Unknown Category!
      </h1>
      <h2 className="dark:text-white text-2xl my-8 sm:max-w-[90%]">
        The category "{category}" does not exist.
      </h2>
    </div>
  );
}
