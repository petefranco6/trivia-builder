import Link from "next/link";
import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";
import QuizList from "@/components/QuizList";
import { useState } from "react";
import { useRouter } from "next/router";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
//import { socket } from "./socket";
import useQuizList from "@/hooks/useQuizList";
import NavBar from "@/components/NavBar";

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
  console.log("quizzes", quizzes);

  const { data: user } = useCurrentUser();

  return (
    <div >
      <NavBar />
      <div>
        <QuizList data={quizzes} title="All Quizzes" />
      </div>
    </div>
  );
}
