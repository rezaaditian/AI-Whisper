"use client";

import { useState, useEffect } from "react";

export interface Note {
  id: string;
  text: string;
  timestamp: Date;
  clientId: string;
}

export function useNotesStorage(clientId: string) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const storageKey = `docnotes-client-${clientId}`;

  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsedNotes = JSON.parse(stored).map((note: any) => ({
          ...note,
          timestamp: new Date(note.timestamp),
        }));
        setNotes(parsedNotes);
      }
    } catch (error) {
      console.error("Error loading notes from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, [storageKey]);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(notes));
      } catch (error) {
        console.error("Error saving notes to localStorage:", error);
      }
    }
  }, [notes, storageKey, isLoading]);

  const addNote = (text: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      text: text.trim(),
      timestamp: new Date(),
      clientId,
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  };

  const updateNote = (noteId: string, newText: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId
          ? { ...note, text: newText.trim(), timestamp: new Date() }
          : note
      )
    );
  };

  const deleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  const getNoteById = (noteId: string) => {
    return notes.find((note) => note.id === noteId);
  };

  return {
    notes,
    isLoading,
    addNote,
    updateNote,
    deleteNote,
    getNoteById,
  };
}
