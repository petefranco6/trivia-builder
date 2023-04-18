import React from "react";
import { PencilIcon, PlayIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import { quiz, question, answer } from "@/models/quiz";


interface QuizCardProps {
  data: Record<string, any>;
  onDelete: (data: quiz) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ data, onDelete }) => {
  const { data: user } = useCurrentUser();

  const router = useRouter();

  const deleteQuiz = async () => {
    try {
      const response = await axios.delete(`/api/delete/${data.id}`)

      if(response.status >= 200 && response.status <= 299)
      {
        onDelete(response.data);
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      {data.questions[0].image ? (
        <img
          src={data.questions[0].image}
          alt="Quiz"
          draggable={false}
          className="
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-md
        group-hover:opacity-90
        sm:group-hover:opacity-0
        delay-300
        w-full
        h-[12vw]
      "
        />
      ) : (
        <img
          src="/images/default-question.jpg"
          alt="Quiz"
          draggable={false}
          className="
      cursor-pointer
      object-cover
      transition
      duration
      shadow-xl
      rounded-md
      group-hover:opacity-90
      sm:group-hover:opacity-0
      delay-300
      w-full
      h-[12vw]
    "
        />
      )}

      <div
        className="
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        group-hover:scale-110
        group-hover:-translate-y-[2vw]
        group-hover:translate-x-[2vw]
        group-hover:opacity-100
      "
      >
        {data.questions[0].image ? (
          <img
            src={data.questions[0].image}
            alt="Quiz"
            draggable={false}
            className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-t-md
          w-full
          h-[12vw]
        "
          />
        ) : (
          <img
            src="/images/default-question.jpg"
            alt="Quiz"
            draggable={false}
            className="
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-t-md
        w-full
        h-[12vw]
      "
          />
        )}

        <div
          className="
          z-10
          bg-zinc-800
          p-2
          lg:p-4
          absolute
          w-full
          transition
          shadow-md
          rounded-b-md
          "
        >
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={() => router.push(`/play/${data?.id}`)}
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
            >
              <PlayIcon className="text-black w-4 lg:w-6" />
            </div>
            <div
              onClick={() => router.push(`/edit/${data?.id}`)}
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
            >
              <PencilIcon className="text-black w-4 lg:w-6" />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.name}</p>
          </div>
          <div className="flex flex-row justify-between gap-2 mt-4 text-[8px] text-white lg:text-sm">
            <p> Genre : {data.category}</p>
            <div>
              {data.authorId == user?.id && (
                <TrashIcon onClick={deleteQuiz} className="text-white w-4 lg:w-6" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
