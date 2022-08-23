export default function AlgorithmNotFound({
  algorithm,
  category,
}: {
  algorithm: string;
  category: string;
}) {
  return (
    <div className="m-auto  ">
      <h1 className="dark:text-white text-5xl sm:text-6xl">
        Unknown Algorithm!
      </h1>
      <h2 className="dark:text-white text-2xl my-8 sm:max-w-[90%]">
        The algorithm "{algorithm}" does not exist in the category "{category}".
      </h2>
    </div>
  );
}
