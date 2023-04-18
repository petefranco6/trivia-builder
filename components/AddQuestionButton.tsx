interface AddQuestionButtonProps {
    onClick: () => void;
  }

  const AddQuestionButton: React.FC<AddQuestionButtonProps> = ({ onClick }) => {
    return (
      <button onClick={onClick} className="bg-green-500 text-white rounded-md px-3 py-2">
        Add Question
      </button>
    );
  };
