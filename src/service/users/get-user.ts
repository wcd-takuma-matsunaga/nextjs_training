import { ApiContext, User } from "@/types/data";
import { fetcher } from "@/utils";

export type GetUserParams = {
  id: number;
};

const getUser = async (
  context: ApiContext,
  { id }: GetUserParams
): Promise<User> => {
  // {
  //   //ユーザーのサンプルレスポンス
  //   "id": 1,
  //   "username": "test",
  //   "displayName": "テストユーザー",
  //   "email": "test@example.com",
  //   "profileImageUrl": "/users/a.png",
  //   "description": "テストユーザーです",
  // }
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, "")}/users/${id}`,
    {
      headers: {
        Accpet: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};

export default getUser;
