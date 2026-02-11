"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AudioRecorder } from "@/components/audioRecorder";
import { TranscriptionEditor } from "@/components/transcriptionEditor";
import { NoteEditor } from "@/components/noteEditor";
import { useNotesStorage } from "@/hooks/useNotesStorage";
import {
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  Loader2,
  FileText,
} from "lucide-react";

// Mock client data with required structure
const mockClients = [
  {
    id: "user-001",
    firstName: "Sarah",
    lastName: "Johnson",
    dateOfBirth: "1985-03-15",
    phone: "(555) 123-4567",
    email: "sarah.johnson@email.com",
  },
  {
    id: "user-002",
    firstName: "Michael",
    lastName: "Chen",
    dateOfBirth: "1978-11-22",
    phone: "(555) 234-5678",
    email: "michael.chen@email.com",
  },
  {
    id: "user-003",
    firstName: "Emily",
    lastName: "Rodriguez",
    dateOfBirth: "1992-07-08",
    phone: "(555) 345-6789",
    email: "emily.rodriguez@email.com",
  },
  {
    id: "user-004",
    firstName: "David",
    lastName: "Thompson",
    dateOfBirth: "1980-12-03",
    phone: "(555) 456-7890",
    email: "david.thompson@email.com",
  },
  {
    id: "user-005",
    firstName: "Lisa",
    lastName: "Anderson",
    dateOfBirth: "1975-09-18",
    phone: "(555) 567-8901",
    email: "lisa.anderson@email.com",
  },
  {
    id: "user-006",
    firstName: "Mahina",
    lastName: "HANA",
    dateOfBirth: "1999-09-18",
    phone: "(555) 567-8999",
    email: "mahina@hanabrave.com",
  },
];

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
}

export default function ClientListPage() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (selectedClient) {
    return (
      <ClientDetailPage
        client={selectedClient}
        onBack={() => setSelectedClient(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                DocNotes
              </h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Professional note-taking for therapists
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                <FileText className="h-3 w-3 mr-1" />
                {mockClients.length} Clients
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Client List */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
            Your Clients
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Select a client to view or add notes
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockClients.map((client) => (
            <Card
              key={client.id}
              className="hover:shadow-lg transition-all duration-200 cursor-pointer group hover:scale-[1.02] focus-within:ring-2 focus-within:ring-ring"
              role="button"
              tabIndex={0}
              onClick={() => setSelectedClient(client)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedClient(client);
                }
              }}
              aria-label={`View notes for ${client.firstName} ${client.lastName}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 ring-2 ring-background group-hover:ring-primary/20 transition-all">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                      {getInitials(client.firstName, client.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base sm:text-lg truncate">
                      {client.firstName} {client.lastName}
                    </CardTitle>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                      ID: {client.id}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">
                      DOB: {formatDate(client.dateOfBirth)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{client.email}</span>
                  </div>
                </div>
                <Button
                  className="w-full text-sm group-hover:bg-primary/90 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedClient(client);
                  }}
                  aria-label={`View notes for ${client.firstName} ${client.lastName}`}
                >
                  View Notes
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

// Client Detail Page Component
function ClientDetailPage({
  client,
  onBack,
}: {
  client: Client;
  onBack: () => void;
}) {
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const { notes, isLoading, addNote, updateNote, deleteNote } = useNotesStorage(
    client.id
  );

  const handleRecordingComplete = (audioBlob: Blob) => {
    setRecordedAudio(audioBlob);
  };

  const handleSaveNote = (text: string) => {
    addNote(text);
    setRecordedAudio(null);
  };

  const handleClearRecording = () => {
    setRecordedAudio(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex-shrink-0 bg-transparent"
              aria-label="Go back to client list"
            >
              ← Back
            </Button>
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                  {client.firstName.charAt(0)}
                  {client.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">
                  {client.firstName} {client.lastName}
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm truncate">
                  Client ID: {client.id}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  <FileText className="h-3 w-3 mr-1" />
                  {notes.length} Notes
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Notes Section */}
          <div className="order-2 lg:order-1">
            <Card className="h-fit">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Previous Notes
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {notes.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground text-sm">
                        Loading notes...
                      </p>
                    </div>
                  </div>
                ) : notes.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <div className="mb-6">
                      <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-lg font-medium mb-2">No notes yet</p>
                    <p className="text-sm max-w-sm mx-auto leading-relaxed">
                      Start recording to create your first note for this client
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto pr-2">
                    {notes.map((note) => (
                      <NoteEditor
                        key={note.id}
                        note={note}
                        onUpdate={updateNote}
                        onDelete={deleteNote}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recording Section */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="lg:sticky lg:top-24">
              <AudioRecorder onRecordingComplete={handleRecordingComplete} />

              <div className="mt-6">
                <TranscriptionEditor
                  audioBlob={recordedAudio}
                  onSaveNote={handleSaveNote}
                  onClear={handleClearRecording}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
