import AppLogo from "@/components/atoms/AppLogo";
import Box from "@/components/layout/Box";
import Flex from "@/components/layout/Flex";
import Layout from "@/components/templates/Layout";
import { NextPage } from "next";
import { useRouter } from "next/router";

const SigninPage: NextPage = () => {
  const router = useRouter();
  const handleSignin = async (err?: Error) => {
    if (!err) {
      // サインイン成功してクエリが指定されている場合はそのURLに移動
      //デフォルトはトップページに移動
      const redirectTo = (router.query["redirect_to"] as string) || "/";

      console.log("Redirecting", redirectTo);
      await router.push(redirectTo);
    }
  };

  return (
    <Layout>
      <Flex
        paddingTop={2}
        paddingBottom={2}
        paddingLeft={{ base: 2, md: 0 }}
        paddingRight={{ base: 2, md: 0 }}
        justifyContent="center"
      >
        <Flex
          width="400px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box marginBottom={2}>
            <AppLogo />
          </Box>
          <Box width="100%">
            {/*
              サインインフォームコンテナ
              SigninFormのユーザー名・パスワードから認証APIを呼び出し、
              onSigninコールバックが呼び出される
            */}
            <SigninFormContainer onSignin={handleSignin} />
          </Box>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default SigninPage;
