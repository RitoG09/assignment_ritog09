"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assignmentSchema } from "./schemas";
import {
  defaultAssignmentValues,
  newQuestionTypeDefaults,
  QUESTION_TYPE_MAP,
} from "./constants";
import { AssignmentHeader } from "./assignment-header";
import { AssignmentProgress } from "./assignment-progress";
import { AssignmentDetailsCard } from "./assignment-details-card";
import { UploadDropzone } from "./upload-dropzone";
import { TitleField } from "./title-field";
import { DueDateField } from "./due-date-field";
import { QuestionTypesSection } from "./question-types-section";
import { AdditionalInfoField } from "./additional-info-field";
import { AssignmentFooterActions } from "./assignment-footer-actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAssignment } from "@/lib/api/assignments";
import toast from "react-hot-toast";

export function AssignmentCreateForm() {
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const {
    control,
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(assignmentSchema),
    defaultValues: defaultAssignmentValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questionTypes",
  });

  const questionTypes = watch("questionTypes");

  const totalQuestions = questionTypes.reduce(
    (acc, curr) => acc + curr.count,
    0,
  );

  const totalMarks = questionTypes.reduce(
    (acc, curr) => acc + curr.count * curr.marks,
    0,
  );

  const router = useRouter();

  const onSubmit = async (values: any) => {
    if (!file) {
      toast.error("Please upload a PDF document file to process");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();

      formData.append("file", file);
      formData.append("sourceType", "pdf");

      if (values.title) {
        formData.append("title", values.title);
      }

      formData.append("dueDate", values.dueDate || "");

      formData.append(
        "additionalInstructions",
        values.additionalInfo || "",
      );

      const transformedQuestionTypes = values.questionTypes.map((q: any) => ({
        type: QUESTION_TYPE_MAP[q.type as keyof typeof QUESTION_TYPE_MAP],
        count: q.count,
        marks: q.marks,
      }));

      formData.append(
        "questionTypes",
        JSON.stringify(transformedQuestionTypes),
      );

      const response = await createAssignment(formData);
      const assignmentId = response.assignment._id;
      router.push(`/assignments/output?id=${assignmentId}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit assignment form");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full pt-6 pb-10">
        <div className="px-2">
          <AssignmentHeader />
        </div>

        <div className="mx-auto w-full max-w-[1080px] px-2">
          <AssignmentProgress />

          <AssignmentDetailsCard>
            <UploadDropzone value={file} onChange={setFile} />
            <TitleField register={register} error={errors.title?.message} />
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

          <AssignmentFooterActions loading={submitting} />
        </div>
      </div>
    </form>
  );
}

