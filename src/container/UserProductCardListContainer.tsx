import ProductCard from "@/components/organisms/ProductCard";
import ProductCardList from "@/components/organisms/ProductCardList";
import useSearch from "@/service/products/use-search";
import { ApiContext, Product } from "@/types/data";
import Link from "next/link";
import { Fragment } from "react";

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_BASE_PATH || "/api/proxy",
};

interface UserProductCardListContainerProps {
  /**
   *商品を保有するユーザーID
   *
   * @type {number}
   * @memberof UserProductCardListContainerProps
   */
  userId: number;

  /**
   *初期で表示する商品情報
   *
   * @type {Product[]}
   * @memberof UserProductCardListContainerProps
   */
  products?: Product[];
}

//ユーザー商品カードリストコンテナ
const UserProductCardListContainer = ({
  userId,
  products,
}: UserProductCardListContainerProps) => {
  const { products: userProducts } = useSearch(context, {
    userId,
    initial: products,
  });

  return (
    <ProductCardList numberPerRow={6} numberPerRowForMobile={2}>
      {userProducts.map((p) => (
        <Fragment key={p.id}>
          <Link href={`/products/${p.id}`} passHref>
            <a>
              {/* 商品カード */}
              <ProductCard
                variant="small"
                title={p.title}
                price={p.price}
                imageUrl={p.imageUrl}
              />
            </a>
          </Link>
        </Fragment>
      ))}
    </ProductCardList>
  );
};

export default UserProductCardListContainer;