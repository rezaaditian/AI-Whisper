"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, FileText, Save, AlertCircle } from "lucide-react";
import { useTranscription } from "@/hooks/useTranscription";

interface TranscriptionEditorProps {
  audioBlob: Blob | null;
  onSaveNote: (text: string) => void;
  onClear: () => void;
}

export function TranscriptionEditor({
  audioBlob,
  onSaveNote,
  onClear,
}: TranscriptionEditorProps) {
  const [transcriptionText, setTranscriptionText] = useState("");
  const [hasTranscribed, setHasTranscribed] = useState(false);
  const { transcribeAudio, isTranscribing, transcriptionError } =
    useTranscription();

  const handleTranscribe = async () => {
    if (!audioBlob) return;

    const result = await transcribeAudio(audioBlob);
    if (result) {
      setTranscriptionText(result);
      setHasTranscribed(true);
    }
  };

  const handleSave = () => {
    if (transcriptionText.trim()) {
      onSaveNote(transcriptionText.trim());
      setTranscriptionText("");
      setHasTranscribed(false);
      onClear();
    }
  };

  const handleClear = () => {
    setTranscriptionText("");
    setHasTranscribed(false);
    onClear();
  };

  if (!audioBlob) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Transcription & Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Audio Player */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Recorded Audio
          </label>
          <audio controls className="w-full">
            <source
              src={URL.createObjectURL(audioBlob)}
              type={audioBlob.type}
            />
            Your browser does not support the audio element.
          </audio>
        </div>

        {/* Transcription Error */}
        {transcriptionError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{transcriptionError}</AlertDescription>
          </Alert>
        )}

        {/* Transcribe Button */}
        {!hasTranscribed && (
          <Button
            onClick={handleTranscribe}
            disabled={isTranscribing}
            className="w-full"
          >
            {isTranscribing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Transcribing Audio...
              </>
            ) : (
              "Transcribe Audio"
            )}
          </Button>
        )}

        {/* Transcription Text Editor */}
        {(hasTranscribed || transcriptionText) && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Transcribed Text (Editable)
            </label>
            <Textarea
              value={transcriptionText}
              onChange={(e) => setTranscriptionText(e.target.value)}
              placeholder="Transcribed text will appear here. You can edit it before saving."
              className="min-h-[200px] resize-none"
              disabled={isTranscribing}
            />

            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={!transcriptionText.trim()}>
                <Save className="mr-2 h-4 w-4" />
                Save Note
              </Button>
              <Button variant="outline" onClick={handleClear}>
                Clear & Start Over
              </Button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isTranscribing && (
          <div className="text-center py-4">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing audio with OpenAI Whisper...</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
