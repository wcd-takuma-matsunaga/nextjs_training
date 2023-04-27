export type Category = "shoes" | "clothes" | "book";
export type Condition = "new" | "used";

// user
export type User = {
  id: number;
  username: string;
  displayName: string;
  email: string;
  profileImageUrl: string;
  description: string;
};

// product
export type Product = {
  id: number;
  category: Category;
  title: string;
  description: string;
  imageUrl: string;
  blurDataURL: string;
  price: number;
  condition: Condition;
  owner: User;
};

// API Context
export type ApiContext = {
  apiRooteUrl: string;
};
