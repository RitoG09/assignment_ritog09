import { Download, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { exportPdf, getAssignmentById } from "@/lib/api/assignments";
import { useState } from "react";

interface OutputHeaderProps {
  assignmentId: string;
}

export function OutputHeader({ assignmentId }: OutputHeaderProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      toast.loading("Generating PDF...", {
        id: "pdf",
      });
      await exportPdf(assignmentId);

      let finalPdfUrl = "";
      for (let i = 0; i < 15; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await getAssignmentById(assignmentId);
        if (response.assignment?.pdfUrl) {
          finalPdfUrl = response.assignment.pdfUrl;
          break;
        }
      }
      if (!finalPdfUrl) {
        throw new Error("PDF generation timeout");
      }

      toast.success("PDF ready", {
        id: "pdf",
      });

      const response = await fetch(finalPdfUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `assignment-${assignmentId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);

    } catch (error) {
      toast.error("Failed to generate PDF", {
        id: "pdf",
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="rounded-[32px] bg-[#262626] px-8 py-7 text-white shadow-sm">
      <div className="max-w-4xl">
        <h2 className="text-[30px] font-semibold leading-[1.4] tracking-[-0.03em]">
          Certainly! Here are your customized AI generated question papers.
        </h2>

        <button
          className="mt-6 flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-medium text-black transition hover:bg-neutral-100"
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {downloading ? "Generating..." : "Download as PDF"}
        </button>
      </div>
    </div>
  );
}
