type QuizBuilderProps = {
    questions: {
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
    onChange: (questions: QuizBuilderProps["questions"]) => void;
  };
  
  export const QuizBuilder: React.FC<QuizBuilderProps> = ({ questions, onChange }) => {
    const handleQuestionChange = (index: number, value: string) => {
      const updatedQuestions = [...questions];
      updatedQuestions[index].question = value;
      onChange(updatedQuestions);
    };
  
    const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
      const updatedQuestions = [...questions];
      updatedQuestions[qIndex].options[oIndex] = value;
      onChange(updatedQuestions);
    };
  
    const addOption = (index: number) => {
      const updatedQuestions = [...questions];
      updatedQuestions[index].options.push("");
      onChange(updatedQuestions);
    };
  
    const addQuestion = () => {
      onChange([...questions, { question: "", options: [""], correctAnswer: 0 }]);
    };
  
    return (
      <div className="space-y-4">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="p-4 border rounded-md space-y-4">
            <input
              type="text"
              placeholder="Enter question"
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            {q.options.map((option, oIndex) => (
              <div key={oIndex} className="flex space-x-2 items-center">
                <input
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            ))}
            <button
              type="button"
              className="text-blue-500"
              onClick={() => addOption(qIndex)}
            >
              + Add Option
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-green-500"
          onClick={addQuestion}
        >
          + Add Question
        </button>
      </div>
    );
  };