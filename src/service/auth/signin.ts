import { ApiContext, User } from "@/types/data";
import { fetcher } from "@/utils";

export type SigninParams = {
  username: string;
  password: string;
};

/**
 * 認証API
 *
 * @param {ApiContext} context
 * @param {SigninParams} params
 * @return ログインユーザー情報
 */
const signin = async (
  context: ApiContext,
  params: SigninParams
): Promise<User> => {
  return await fetcher(
    `${context.apiRooteUrl.replace(/\/$/g, "")}/auth/signin`,
    {
      method: "POST",
      headers: {
        Accpet: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );
};

export default signin;
