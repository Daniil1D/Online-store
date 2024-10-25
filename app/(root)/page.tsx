import { Container, Filters, Title, TopBar } from "@/shared/components/shared";
import { ProductsGroupList } from "@/shared/components/shared/products-group-list";
import { findProduct, GetSearchParams } from "@/shared/lib/find-product";

import { Suspense } from "react";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findProduct(searchParams)

  return (
    <div>
      <Container className="mt-10">
        <Title text="Все товары" size="lg" className="font-extrabold" />
      </Container>

      {/* Проверяем наличие категорий с товарами(Если в категории есть товары то показываем ее, если нету товара то не показывай категорию)*/}
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />

      <Container className="mt-10">
        <div className="flex gap-[60px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                      listClassName={""}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
