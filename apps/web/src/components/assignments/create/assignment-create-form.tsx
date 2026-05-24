"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { assignmentSchema } from "./schemas";
import { defaultAssignmentValues, newQuestionTypeDefaults } from "./constants";
import { AssignmentHeader } from "./assignment-header";
import { AssignmentProgress } from "./assignment-progress";
import { AssignmentDetailsCard } from "./assignment-details-card";
import { UploadDropzone } from "./upload-dropzone";
import { DueDateField } from "./due-date-field";
import { QuestionTypesSection } from "./question-types-section";
import { AdditionalInfoField } from "./additional-info-field";
import { AssignmentFooterActions } from "./assignment-footer-actions";
import { useState } from "react";

export function AssignmentCreateForm() {
  const [file, setFile] = useState<File | null>(null);
  const { control, register, watch, setValue } = useForm({
    resolver: zodResolver(assignmentSchema),
    defaultValues: defaultAssignmentValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questionTypes",
  });

  const questionTypes = watch("questionTypes");

  const totalQuestions = questionTypes.reduce(
    (acc, curr) => acc + curr.questions,
    0,
  );

  const totalMarks = questionTypes.reduce(
    (acc, curr) => acc + curr.questions * curr.marks,
    0,
  );

  return (
    <div className="w-full pt-6 pb-10">
      <div className="px-2">
        <AssignmentHeader />
      </div>

      <div className="mx-auto w-full max-w-[1080px] px-2">
        <AssignmentProgress />

        <AssignmentDetailsCard>
          <UploadDropzone value={file} onChange={setFile} />
          <DueDateField setValue={setValue} watch={watch} />

          <QuestionTypesSection
            fields={fields}
            questionTypes={questionTypes}
            totalQuestions={totalQuestions}
            totalMarks={totalMarks}
            register={register}
            setValue={setValue}
            onAdd={() => append({ ...newQuestionTypeDefaults })}
            onRemove={remove}
          />

          <AdditionalInfoField register={register} />
        </AssignmentDetailsCard>

        <AssignmentFooterActions />
      </div>
    </div>
  );
}
