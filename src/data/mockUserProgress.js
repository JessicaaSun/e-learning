import { buttonShadow } from "@/common/colors";
import HTML from "../../public/assets/images/html.png";
import JavaScript from "../../public/assets/images/js.png";
import CSS from "../../public/assets/images/css.png";
import Java from "../../public/assets/images/java-file-6867951-5607407.png";

export const userProgress = [
  {
    id: 1,
    course: {
      id: 2,
      image: CSS,
      title: "CSS",
      language: "CSS",
      description:
        "Start at the beginning by learning CSS basics — an important foundation for building and editing web pages.",
      level: "Basic",
      lesson: "18",
      quiz: "10",
      exercise: "20",
      requiredTime: "19",
      btnColor: "bg-gradient-secondary",
      btnShadow: buttonShadow.secondary,
      bgColor: "linear-gradient(111.14deg, #F5C6D8 2.36%, #F07AA6 100%)",
    },

    lessonRead: 12,
    exerciseCompleted: 18,
    quizCompleted: 8,
  },
  {
    id: 2,
    course: {
      id: 1,
      image: HTML,
      title: "HTML",
      language: "HTML",
      description:
        "Start at the beginning by learning HTML basics — an important foundation for building and editing web pages.",
      level: "Basic",
      lesson: "12",
      quiz: "7",
      exercise: "14",
      requiredTime: "19",
      requiredTime: "32",
      btnColor: "bg-gradient-primary",
      btnShadow: buttonShadow.primary,
      bgColor:
        "linear-gradient(111.72deg, rgba(61, 92, 255, 0.3) 2.03%, rgba(61, 92, 255, 0.7) 100%)",
    },

    lessonRead: 3,
    exerciseCompleted: 4,
    quizCompleted: 5,
  },
];
