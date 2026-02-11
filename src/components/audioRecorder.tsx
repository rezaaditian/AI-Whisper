"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import {
  Mic,
  Square,
  Play,
  Pause,
  Trash2,
  AlertCircle,
  Volume2,
} from "lucide-react";

interface AudioRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  disabled?: boolean;
}

export function AudioRecorder({
  onRecordingComplete,
  disabled = false,
}: AudioRecorderProps) {
  const {
    recordingState,
    duration,
    audioBlob,
    error,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    clearRecording,
  } = useAudioRecorder();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartRecording = async () => {
    await startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleUseRecording = () => {
    if (audioBlob) {
      onRecordingComplete(audioBlob);
      clearRecording();
    }
  };

  const getRecordingStateText = () => {
    switch (recordingState) {
      case "recording":
        return "Recording in progress...";
      case "paused":
        return "Recording paused";
      case "stopped":
        return "Recording complete";
      default:
        return "Ready to record";
    }
  };

  const getRecordingStateColor = () => {
    switch (recordingState) {
      case "recording":
        return "text-red-600";
      case "paused":
        return "text-yellow-600";
      case "stopped":
        return "text-green-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Mic className="h-5 w-5" />
          Record Audio Note
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}

        {/* Recording Status */}
        <div className="text-center space-y-3">
          <div
            className={`text-base sm:text-lg font-medium ${getRecordingStateColor()}`}
          >
            {getRecordingStateText()}
          </div>
          {(recordingState === "recording" || recordingState === "paused") && (
            <>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-foreground">
                {formatDuration(duration)}
              </div>
              {recordingState === "recording" && (
                <div className="flex justify-center">
                  <div className="flex items-end gap-1 h-8">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-red-500 rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 24 + 8}px`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: "0.8s",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Recording Controls */}
        <div className="flex justify-center gap-3 sm:gap-4">
          {recordingState === "idle" && (
            <Button
              size="lg"
              onClick={handleStartRecording}
              disabled={disabled}
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              aria-label="Start recording"
            >
              <Mic className="h-6 w-6 sm:h-8 sm:w-8" />
            </Button>
          )}

          {recordingState === "recording" && (
            <>
              <Button
                size="lg"
                variant="outline"
                onClick={pauseRecording}
                className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-transparent"
                aria-label="Pause recording"
              >
                <Pause className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
              <Button
                size="lg"
                variant="destructive"
                onClick={handleStopRecording}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                aria-label="Stop recording"
              >
                <Square className="h-6 w-6 sm:h-8 sm:w-8" />
              </Button>
            </>
          )}

          {recordingState === "paused" && (
            <>
              <Button
                size="lg"
                onClick={resumeRecording}
                className="h-12 w-12 sm:h-14 sm:w-14 rounded-full"
                aria-label="Resume recording"
              >
                <Play className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
              <Button
                size="lg"
                variant="destructive"
                onClick={handleStopRecording}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                aria-label="Stop recording"
              >
                <Square className="h-6 w-6 sm:h-8 sm:w-8" />
              </Button>
            </>
          )}
        </div>

        {/* Recording Actions */}
        {recordingState === "stopped" && audioBlob && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-full">
                <Volume2 className="h-4 w-4" />
                Duration: {formatDuration(duration)}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleUseRecording}
                className="flex-1 shadow-sm hover:shadow-md transition-shadow"
              >
                Use This Recording
              </Button>
              <Button
                variant="outline"
                onClick={clearRecording}
                className="sm:w-auto bg-transparent"
                aria-label="Discard recording"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Discard
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
