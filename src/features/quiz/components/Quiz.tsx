// import { useState } from "react";
// import { Card, Button, Radio, message, Typography, Divider, List } from "antd";
// import { Question, SkinCareProcess } from "../dto/quiz.dto";

// const { Title, Text } = Typography;

// const quizData: Question[] = [
//   {
//     id: 1,
//     question: "How does your skin feel after washing your face?",
//     options: [
//       { text: "Tight and dry", skinType: "Dry" },
//       { text: "Oily and shiny", skinType: "Oily" },
//       { text: "Normal", skinType: "Normal" },
//       { text: "Sensitive or red", skinType: "Sensitive" },
//     ],
//   },
//   {
//     id: 2,
//     question: "How often do you notice acne or blackheads?",
//     options: [
//       { text: "Rarely", skinType: "Normal" },
//       { text: "Often", skinType: "Oily" },
//       { text: "Almost never", skinType: "Dry" },
//       { text: "Sometimes, but it irritates easily", skinType: "Sensitive" },
//     ],
//   },
//   {
//     id: 3,
//     question: "How does your skin feel at the end of the day?",
//     options: [
//       { text: "Very oily", skinType: "Oily" },
//       { text: "Dry or flaky", skinType: "Dry" },
//       { text: "Balanced", skinType: "Normal" },
//       { text: "Irritated or itchy", skinType: "Sensitive" },
//     ],
//   },
// ];

// const skinCareProcesses: SkinCareProcess[] = [
//   {
//     skinType: "Dry",
//     description: "Hydrating and moisturizing routine for dry skin.",
//     price: "$50/session",
//     steps: [
//       { title: "Cleanse", description: "Use a gentle, hydrating cleanser." },
//       {
//         title: "Moisturize",
//         description: "Apply a rich moisturizer to lock in hydration.",
//       },
//       {
//         title: "Protect",
//         description: "Use SPF to protect against sun damage.",
//       },
//     ],
//   },
//   {
//     skinType: "Oily",
//     description: "Oil control and acne prevention routine.",
//     price: "$40/session",
//     steps: [
//       { title: "Cleanse", description: "Use a foaming cleanser." },
//       { title: "Tone", description: "Apply an oil-controlling toner." },
//       {
//         title: "Treat",
//         description: "Use salicylic acid or other acne treatments.",
//       },
//     ],
//   },
//   {
//     skinType: "Normal",
//     description: "Balanced skincare routine for normal skin.",
//     price: "$35/session",
//     steps: [
//       { title: "Cleanse", description: "Use a mild cleanser." },
//       { title: "Hydrate", description: "Apply a light moisturizer." },
//       { title: "Protect", description: "Use SPF daily." },
//     ],
//   },
//   {
//     skinType: "Sensitive",
//     description: "Gentle routine for sensitive skin.",
//     price: "$60/session",
//     steps: [
//       { title: "Cleanse", description: "Use a fragrance-free cleanser." },
//       { title: "Soothe", description: "Apply a calming serum." },
//       { title: "Protect", description: "Use SPF for sensitive skin." },
//     ],
//   },
// ];

// const QuizTest = () => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
//   const [resultSkinType, setResultSkinType] = useState<string | null>(null);

//   const currentQuestion = quizData[currentQuestionIndex];

//   const handleNext = () => {
//     if (!selectedSkinTypes[currentQuestionIndex]) {
//       message.warning("Please select an answer!");
//       return;
//     }

//     if (currentQuestionIndex < quizData.length - 1) {
//       setCurrentQuestionIndex((prev) => prev + 1);
//     } else {
//       const mostCommonSkinType = selectedSkinTypes.sort(
//         (a, b) =>
//           selectedSkinTypes.filter((type) => type === b).length -
//           selectedSkinTypes.filter((type) => type === a).length
//       )[0];
//       setResultSkinType(mostCommonSkinType);
//     }
//   };

//   const handleSelect = (skinType: string) => {
//     const updated = [...selectedSkinTypes];
//     updated[currentQuestionIndex] = skinType;
//     setSelectedSkinTypes(updated);
//   };

//   const recommendedProcess = skinCareProcesses.find(
//     (process) => process.skinType === resultSkinType
//   );

//   return (
//     <div style={{ maxWidth: 600, margin: "50px auto", padding: 20 }}>
//       {!resultSkinType ? (
//         <Card style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
//           <Title level={4}>
//             Question {currentQuestionIndex + 1}/{quizData.length}
//           </Title>
//           <Text style={{ fontSize: 16 }}>{currentQuestion.question}</Text>
//           <Radio.Group
//             onChange={(e) => handleSelect(e.target.value)}
//             value={selectedSkinTypes[currentQuestionIndex]}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "10px",
//               marginTop: 20,
//             }}
//           >
//             {currentQuestion.options.map((option) => (
//               <Radio key={option.text} value={option.skinType}>
//                 {option.text}
//               </Radio>
//             ))}
//           </Radio.Group>
//           <Button
//             type="primary"
//             style={{ marginTop: 20, alignSelf: "center" }}
//             onClick={handleNext}
//           >
//             {currentQuestionIndex < quizData.length - 1 ? "Next" : "Submit"}
//           </Button>
//         </Card>
//       ) : (
//         <div style={{ textAlign: "center" }}>
//           <Title level={3}>
//             Recommended Skincare for {resultSkinType} Skin
//           </Title>
//           <Text style={{ fontSize: 16, color: "#555" }}>
//             {recommendedProcess?.description}
//           </Text>
//           <Divider />
//           <Title level={4}>Price: {recommendedProcess?.price}</Title>
//           <Divider />
//           <List
//             bordered
//             header={<Title level={5}>Steps:</Title>}
//             dataSource={recommendedProcess?.steps || []}
//             renderItem={(step) => (
//               <List.Item>
//                 <Text strong>{step.title}:</Text> {step.description}
//               </List.Item>
//             )}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizTest;
import { useState } from "react";
import { Card, Button, Radio, message, Typography, Divider, Table } from "antd";
import { Question, SkinCareProcess } from "../dto/quiz.dto";

const { Title, Text } = Typography;

const quizData: Question[] = [
  {
    id: 1,
    question: "How does your skin feel after washing your face?",
    options: [
      { text: "Tight and dry", skinType: "Dry" },
      { text: "Oily and shiny", skinType: "Oily" },
      { text: "Normal", skinType: "Normal" },
      { text: "Sensitive or red", skinType: "Sensitive" },
    ],
  },
  {
    id: 2,
    question: "How often do you notice acne or blackheads?",
    options: [
      { text: "Rarely", skinType: "Normal" },
      { text: "Often", skinType: "Oily" },
      { text: "Almost never", skinType: "Dry" },
      { text: "Sometimes, but it irritates easily", skinType: "Sensitive" },
    ],
  },
  {
    id: 3,
    question: "How does your skin feel at the end of the day?",
    options: [
      { text: "Very oily", skinType: "Oily" },
      { text: "Dry or flaky", skinType: "Dry" },
      { text: "Balanced", skinType: "Normal" },
      { text: "Irritated or itchy", skinType: "Sensitive" },
    ],
  },
];

const skinCareProcesses: SkinCareProcess[] = [
  {
    skinType: "Dry",
    description: "Hydrating and moisturizing routine for dry skin.",
    price: "$50/session",
    steps: [
      { title: "Cleanse", description: "Use a gentle, hydrating cleanser." },
      {
        title: "Moisturize",
        description: "Apply a rich moisturizer to lock in hydration.",
      },
      {
        title: "Protect",
        description: "Use SPF to protect against sun damage.",
      },
    ],
  },
  {
    skinType: "Oily",
    description: "Oil control and acne prevention routine.",
    price: "$40/session",
    steps: [
      { title: "Cleanse", description: "Use a foaming cleanser." },
      { title: "Tone", description: "Apply an oil-controlling toner." },
      {
        title: "Treat",
        description: "Use salicylic acid or other acne treatments.",
      },
    ],
  },
  {
    skinType: "Normal",
    description: "Balanced skincare routine for normal skin.",
    price: "$35/session",
    steps: [
      { title: "Cleanse", description: "Use a mild cleanser." },
      { title: "Hydrate", description: "Apply a light moisturizer." },
      { title: "Protect", description: "Use SPF daily." },
    ],
  },
  {
    skinType: "Sensitive",
    description: "Gentle routine for sensitive skin.",
    price: "$60/session",
    steps: [
      { title: "Cleanse", description: "Use a fragrance-free cleanser." },
      { title: "Soothe", description: "Apply a calming serum." },
      { title: "Protect", description: "Use SPF for sensitive skin." },
    ],
  },
];

const QuizTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [resultSkinType, setResultSkinType] = useState<string | null>(null);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleNext = () => {
    if (!selectedSkinTypes[currentQuestionIndex]) {
      message.warning("Please select an answer!");
      return;
    }

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const mostCommonSkinType = selectedSkinTypes.sort(
        (a, b) =>
          selectedSkinTypes.filter((type) => type === b).length -
          selectedSkinTypes.filter((type) => type === a).length
      )[0];
      setResultSkinType(mostCommonSkinType);
    }
  };

  const handleSelect = (skinType: string) => {
    const updated = [...selectedSkinTypes];
    updated[currentQuestionIndex] = skinType;
    setSelectedSkinTypes(updated);
  };

  const recommendedProcess = skinCareProcesses.find(
    (process) => process.skinType === resultSkinType
  );

  const columns = [
    {
      title: "Step",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <div style={{ maxWidth: 800, margin: "50px auto", padding: 20 }}>
      {!resultSkinType ? (
        <Card style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <Title level={4}>
            Question {currentQuestionIndex + 1}/{quizData.length}
          </Title>
          <Text style={{ fontSize: 16 }}>{currentQuestion.question}</Text>
          <Radio.Group
            onChange={(e) => handleSelect(e.target.value)}
            value={selectedSkinTypes[currentQuestionIndex]}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: 20,
            }}
          >
            {currentQuestion.options.map((option) => (
              <Radio key={option.text} value={option.skinType}>
                {option.text}
              </Radio>
            ))}
          </Radio.Group>
          <Button
            type="primary"
            style={{ marginTop: 20, alignSelf: "center" }}
            onClick={handleNext}
          >
            {currentQuestionIndex < quizData.length - 1 ? "Next" : "Submit"}
          </Button>
        </Card>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Title level={3}>
            Recommended Skincare for {resultSkinType} Skin
          </Title>
          <Text style={{ fontSize: 16, color: "#555" }}>
            {recommendedProcess?.description}
          </Text>
          <Divider />
          <Title level={4}>Price: {recommendedProcess?.price}</Title>
          <Divider />
          <Table
            dataSource={recommendedProcess?.steps || []}
            columns={columns}
            pagination={false}
            bordered
          />
        </div>
      )}
    </div>
  );
};

export default QuizTest;
