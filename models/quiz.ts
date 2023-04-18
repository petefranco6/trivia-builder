export interface quiz {
  category: string;
  description: string;
  id: string;
  name: string;
  questions: question[];
}

export interface question {
  answers: answer[];
  image: string;
  prompt: string;
  description: string;
}

export interface answer {
  text: string;
  isCorrect: boolean;
}
