import Link from "next/link";
import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";
import QuizList from "@/components/QuizList";
import { useState } from "react";
import { useRouter } from "next/router";
//import { socket } from "./socket";
import useQuizList from "@/hooks/useQuizList";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanant: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  const {data: quizzes =[] } = useQuizList();

  const { data: user } = useCurrentUser();

  return (
    <div className="text-rose-500 text-2xl">
      <div>
        <QuizList data={quizzes} title="All Quizzes" />
        <p className="text-white">Logged in as {user?.username}</p>
        <button className="h-10 w-full bg-white" onClick={() => signOut()}>
          Sign Out
        </button>
        <Link href={"/creator"} className=" text-white h-10 w-full bg-red-700">
          Create Trivia
        </Link>
      </div>
    </div>
  );
}
