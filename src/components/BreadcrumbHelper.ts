import { AlgorithmCategories } from "../data/AlgorithmCategories";

export function mapUrlToBreadcrumbs(url: string) {
  let res = [{ name: "Home", url: "" }];

  let path = url.split("/").filter(Boolean);
  let category = AlgorithmCategories.find(({ url }) => url.endsWith(path[0]));

  if (category) {
    res.push({ name: category.category, url: category.url });

    let algorithm = category.implementations.find(({ url }) =>
      url.endsWith(path[1])
    );

    if (algorithm) {
      res.push({ name: algorithm.name, url: algorithm.url });
    }
  }
  return res;
}
