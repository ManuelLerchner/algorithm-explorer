import { AlgorithmCategories } from "../../data/AlgorithmCategories";

export function mapUrlToBreadcrumbs(url: string) {
  let breadcrumbs = [{ name: "Home", url: "/" }];

  let pathElements = url
    .split("/")
    .filter(Boolean)
    .map((p) => "/" + p);

  let currentCategory: any = AlgorithmCategories;
  let currentPath = "";
  let validUntil = 0;

  pathElements.forEach((p, i) => {
    currentPath += p;

    if (currentCategory)
      currentCategory = currentCategory.find((c: any) => c.url === currentPath);

    if (!currentCategory) {
      breadcrumbs.push({
        name: pathElements[i].substring(1),
        url: currentPath,
      });
    } else {
      breadcrumbs.push({
        name: currentCategory.name,
        url: currentCategory.url,
      });
      currentCategory = currentCategory.implementations;
      validUntil += 1;
    }
  });

  return { breadcrumbs, validUntil };
}
