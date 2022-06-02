import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import Head from "next/head";

const Profile = () => {
  const followerList = [
    { nickname: "장택진" },
    { nickname: "바보" },
    { nickname: "리액트sns" },
  ];
  const followingList = [
    { nickname: "장택진" },
    { nickname: "바보" },
    { nickname: "리액트sns" },
  ];

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" date={followerList} />
      </AppLayout>
    </>
  );
};
export default Profile;
