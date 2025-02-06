import mongoose from "mongoose";
import Topic from "./models/topicModel.js";
import Quiz from "./models/quizModel.js";
import dotenv from "dotenv";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Limpiar la base de datos (opcional)
    await Topic.deleteMany({});
    await Quiz.deleteMany({});

    // Crear temas
    const topic1 = new Topic({
      title: "Bases sobre la Teoría General de Sistemas",
      description:
        "Introducción a la Teoría General de Sistemas (TGS) y su enfoque interdisciplinario.",
      content:
        "La Teoría General de Sistemas (TGS) es un enfoque interdisciplinario propuesto por el biólogo Ludwig von Bertalanffy en los años 50, que busca comprender y analizar los sistemas de cualquier tipo (biológicos, sociales, tecnológicos, etc.) como conjuntos de elementos interdependientes. A diferencia de enfoques tradicionales, la TGS se centra en las relaciones y la organización del sistema en su conjunto, proponiendo que las propiedades de un sistema no pueden entenderse solo al analizar sus partes por separado.",
    });
    await topic1.save();

    const topic2 = new Topic({
      title: "Enfoque Reduccionista vs. Enfoque de la TGS",
      description:
        "Comparación entre el enfoque reduccionista y el enfoque de la Teoría General de Sistemas.",
      content:
        "El enfoque reduccionista ha sido el método dominante en las ciencias durante siglos y consiste en analizar un fenómeno complejo dividiéndolo en sus partes más simples, estudiando cada una de ellas de manera independiente. Por otro lado, la TGS se plantea como una alternativa al reduccionismo, enfocándose en la relación entre las partes y el comportamiento del sistema como un todo. Conceptos clave de la TGS incluyen la totalidad o holismo, la sinergia, la interdependencia, la entropía y la homeostasis.",
    });
    await topic2.save();

    const topic3 = new Topic({
      title: "Fundamentos de Sistemas",
      description:
        "Definiciones básicas y elementos de un sistema según la Teoría General de Sistemas.",
      content:
        "Un sistema es un conjunto de elementos interrelacionados que interactúan entre sí y con su entorno, trabajando en conjunto para lograr uno o más objetivos específicos. Los elementos clave de un sistema incluyen objetivos, sinergia, recursividad, corrientes de entrada, proceso de conversión, corrientes de salida, retroalimentación, fronteras del sistema y entorno. Además, los sistemas pueden clasificarse en megasistemas, supersistemas y subsistemas.",
    });
    await topic3.save();

    const topic4 = new Topic({
      title: "Dinámica de Sistemas",
      description:
        "Conceptos básicos de la Dinámica de Sistemas y su aplicación en el análisis de sistemas complejos.",
      content:
        "La Dinámica de Sistemas es una metodología para el análisis y modelado de sistemas complejos, donde el comportamiento del sistema cambia con el tiempo debido a interacciones entre sus elementos. Se utiliza para estudiar sistemas económicos, sociales, ecológicos y organizacionales. Conceptos clave incluyen sistemas dinámicos, diagramas sinérgicos o de influencias, diagramas de Forrester, y sistemas dinámicos de primer y segundo orden.",
    });
    await topic4.save();

    // Crear cuestionarios
    const quiz1 = new Quiz({
      topicId: topic1._id,
      question: "¿Quién propuso la Teoría General de Sistemas?",
      options: [
        "Ludwig von Bertalanffy",
        "Albert Einstein",
        "Isaac Newton",
        "Charles Darwin",
      ],
      correctAnswer: "Ludwig von Bertalanffy",
    });
    await quiz1.save();

    const quiz2 = new Quiz({
      topicId: topic1._id,
      question:
        "¿Qué enfoque se centra en las relaciones entre las partes de un sistema?",
      options: [
        "Enfoque Reduccionista",
        "Teoría General de Sistemas",
        "Enfoque Matemático",
        "Enfoque Biológico",
      ],
      correctAnswer: "Teoría General de Sistemas",
    });
    await quiz2.save();

    const quiz3 = new Quiz({
      topicId: topic2._id,
      question: "¿Qué es la sinergia en el contexto de la TGS?",
      options: [
        "El efecto combinado de las partes del sistema es mayor que la suma de los efectos individuales",
        "La capacidad de un sistema para mantenerse en equilibrio",
        "La descomposición de un sistema en partes más simples",
        "La interacción de un sistema con su entorno",
      ],
      correctAnswer:
        "El efecto combinado de las partes del sistema es mayor que la suma de los efectos individuales",
    });
    await quiz3.save();

    const quiz4 = new Quiz({
      topicId: topic3._id,
      question: "¿Qué es un subsistema?",
      options: [
        "Un sistema que contiene varios sistemas complejos",
        "Una unidad más pequeña dentro de un sistema con una función específica",
        "Un sistema que no interactúa con su entorno",
        "Un sistema que solo existe en teoría",
      ],
      correctAnswer:
        "Una unidad más pequeña dentro de un sistema con una función específica",
    });
    await quiz4.save();

    const quiz5 = new Quiz({
      topicId: topic4._id,
      question: "¿Qué es un sistema dinámico de primer orden?",
      options: [
        "Un sistema donde la tasa de cambio de una variable depende de su valor actual",
        "Un sistema donde la tasa de cambio de la tasa de cambio depende de la variable principal",
        "Un sistema que no cambia con el tiempo",
        "Un sistema que solo existe en simulaciones",
      ],
      correctAnswer:
        "Un sistema donde la tasa de cambio de una variable depende de su valor actual",
    });
    await quiz5.save();

    console.log("Datos precargados exitosamente.");
    process.exit();
  } catch (error) {
    console.error("Error al precargar los datos:", error);
    process.exit(1);
  }
};

seedData();
