import { Product } from "@/types/data";
import React from "react";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

type ShopReducerAction =
  | {
      type: "ADD_PRODUCT";
      payload: Product;
    }
  | {
      type: "REMOVE_PRODUCT";
      payload: number;
    };

/**
 * 商品追加アクション
 *
 * @param {Product} product
 * @param {Product[]} state
 * @return {*}
 */
const addProductToCart = (product: Product, state: Product[]) => {
  return [...state, product];
};

/**
 *商品削除アクション
 *
 * @param {number} productId
 * @param {Product[]} state
 * @return {*}
 */
const removeProductFromCart = (productId: number, state: Product[]) => {
  const removedItemIndex = state.findIndex((item) => item.id === productId);

  state.splice(removedItemIndex, 1);

  return [...state];
};

export /**
 *ショッピングカートのReducer
 *
 * @param {Product[]} state
 * @param {ShopReducerAction} action
 * @return {*}
 */
const shopReducer: React.Reducer<Product[], ShopReducerAction> = (
  state: Product[],
  action: ShopReducerAction
) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.payload, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.payload, state);
    default:
      return state;
  }
};
