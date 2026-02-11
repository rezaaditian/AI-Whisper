"use client";

import { useState } from "react";

export function useTranscription() {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(
    null
  );

  const transcribeAudio = async (audioBlob: Blob): Promise<string | null> => {
    setIsTranscribing(true);
    setTranscriptionError(null);

    try {
      // Create form data with the audio file
      const formData = new FormData();

      // Convert blob to file with proper extension
      const audioFile = new File([audioBlob], "recording.webm", {
        type: audioBlob.type || "audio/webm",
      });

      formData.append("audio", audioFile);

      // Send to our API route
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to transcribe audio");
      }

      if (data.success && data.text) {
        return data.text;
      } else {
        throw new Error("No transcription text received");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setTranscriptionError(errorMessage);
      console.error("Transcription error:", error);
      return null;
    } finally {
      setIsTranscribing(false);
    }
  };

  return {
    transcribeAudio,
    isTranscribing,
    transcriptionError,
  };
}
