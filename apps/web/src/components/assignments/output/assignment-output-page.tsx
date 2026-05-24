"use client";

import { Download } from "lucide-react";

export function AssignmentOutputPage() {
  return (
    <div className="w-full">
      {/* Document Viewer */}
      <div className="mt-2 rounded-[38px] bg-[#5e5e5e] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        {/* AI Banner */}
        <div className="rounded-[30px] bg-[#202020] px-8 py-7 text-white">
          <h2 className="max-w-[900px] text-[20px] leading-[1.55] font-semibold tracking-[-0.03em]">
            Certainly, Lakshya! Here are customized Question Paper for your CBSE
            Grade 8 Science classes on the NCERT chapters:
          </h2>

          <button className="mt-6 flex h-[48px] items-center gap-3 rounded-full bg-white px-6 text-[15px] font-semibold text-[#1F1F1F] transition-all hover:scale-[0.98]">
            <Download className="h-4 w-4" />
            Download as PDF
          </button>
        </div>

        {/* Paper */}
        <div className="mt-4 rounded-[30px] bg-[#FAFAFA] px-[72px] py-[68px]">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-[38px] font-bold tracking-[-0.04em] text-[#222222]">
              Delhi Public School, Sector-4, Bokaro
            </h1>

            <p className="mt-3 text-[28px] font-semibold text-[#2D2D2D]">
              Subject: English
            </p>

            <p className="mt-2 text-[28px] font-semibold text-[#2D2D2D]">
              Class: 5th
            </p>
          </div>

          {/* Meta */}
          <div className="mt-14 flex items-center justify-between">
            <p className="text-[22px] font-semibold text-[#2B2B2B]">
              Time Allowed: 45 minutes
            </p>

            <p className="text-[22px] font-semibold text-[#2B2B2B]">
              Maximum Marks: 20
            </p>
          </div>

          {/* Instructions */}
          <div className="mt-10">
            <p className="text-[21px] font-semibold text-[#2B2B2B]">
              All questions are compulsory unless stated otherwise.
            </p>
          </div>

          {/* Student Info */}
          <div className="mt-12 space-y-3">
            <p className="text-[21px]">
              <span className="font-semibold">Name:</span> __________________
            </p>

            <p className="text-[21px]">
              <span className="font-semibold">Roll Number:</span>{" "}
              __________________
            </p>

            <p className="text-[21px]">
              <span className="font-semibold">Class:</span> 5th Section: _______
            </p>
          </div>

          {/* Section */}
          <div className="mt-20 text-center">
            <h2 className="text-[40px] font-bold tracking-[-0.04em] text-[#2A2A2A]">
              Section A
            </h2>
          </div>

          {/* Questions */}
          <div className="mt-14">
            <h3 className="text-[28px] font-bold text-[#2A2A2A]">
              Short Answer Questions
            </h3>

            <p className="mt-2 text-[18px] italic text-[#666666]">
              Attempt all questions. Each question carries 2 marks
            </p>

            <ol className="mt-10 space-y-6 pl-8">
              {questions.map((question, index) => (
                <li
                  key={index}
                  className="text-[21px] leading-[1.8] text-[#2A2A2A]"
                >
                  {question}
                </li>
              ))}
            </ol>

            <p className="mt-10 text-[22px] font-bold text-[#2A2A2A]">
              End of Question Paper
            </p>
          </div>

          {/* Answers */}
          <div className="mt-20">
            <h2 className="text-[34px] font-bold text-[#2A2A2A]">
              Answer Key:
            </h2>

            <ol className="mt-8 space-y-7 pl-8">
              {answers.map((answer, index) => (
                <li
                  key={index}
                  className="text-[20px] leading-[1.9] text-[#2A2A2A]"
                >
                  {answer}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

const questions = [
  "[Easy] Define electroplating. Explain its purpose. [2 Marks]",
  "[Moderate] What is the role of a conductor in the process of electrolysis? [2 Marks]",
  "[Easy] Why does a solution of copper sulfate conduct electricity? [2 Marks]",
  "[Moderate] Describe one example of the chemical effect of current in daily life. [2 Marks]",
  "[Moderate] Explain why electric current is said to have chemical effects. [2 Marks]",
  "[Challenging] How is sodium hydroxide prepared during the electrolysis of brine? [2 Marks]",
  "[Challenging] What happens at the cathode and anode during electrolysis of water? [2 Marks]",
  "[Easy] Mention the type of current used in electroplating and justify why it is used. [2 Marks]",
  "[Moderate] What is the importance of electric current in metallurgy? [2 Marks]",
  "[Challenging] Explain with a chemical equation how copper is deposited during electroplating. [2 Marks]",
];

const answers = [
  "Electroplating is the process of depositing a thin layer of metal on the surface of another metal using electric current. Its purpose is to prevent corrosion, improve appearance, or increase thickness.",
  "A conductor allows the flow of electric current, causing ions in the electrolyte to move and enabling chemical changes at electrodes.",
  "Copper sulfate solution contains free copper and sulfate ions which carry electric charge, thus conducting electricity.",
  "An example is the electroplating of silver on jewelry to prevent tarnishing.",
  "Electric current causes the movement of ions leading to chemical changes at the electrodes, hence it shows chemical effects.",
];
