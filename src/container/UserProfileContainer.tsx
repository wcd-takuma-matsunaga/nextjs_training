import UserProfile from "@/components/organisms/UserProfile";
import useUser from "@/service/users/use-user";
import { ApiContext, User } from "@/types/data";

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_BASE_PATH || "/api/proxy",
};

interface UserProfileContainerProps {
  /**
   *ユーザーID
   *
   * @type {number}
   * @memberof UserProfileContainerProps
   */
  userId: number;
  /**
   *初期で表示するユーザー情報
   *
   * @type {User}
   * @memberof UserProfileContainerProps
   */
  user?: User;
}

const UserProfileContainer = ({ userId, user }: UserProfileContainerProps) => {
  // 最新のユーザー情報を取得し、更新があった場合にはinitialで指定されているデータを上書きする
  const { user: u } = useUser(context, { id: userId, initial: user });

  if (!u) return <div>Loading...</div>;

  return (
    <UserProfile
      username={`${u.username} (${u.displayName})`}
      profileImageUrl={u.profileImageUrl}
      numberOfProducts={100}
      description={u.description}
    />
  );
};

export default UserProfileContainer;
