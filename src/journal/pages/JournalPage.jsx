import { IconButton, Typography } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"

import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView, NoteView } from "../views"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal"

export const JournalPage = () => {

  const dispath = useDispatch();
  const {isSaving, activeNote} = useSelector(state => state.journal);

  const onClickNewNote = () => {
    dispath(startNewNote());
  }

  return (
    <JournalLayout>

      {/* NothinSelected cuando no hay nada seleccionado*/}
      {/* <NothingSelectedView /> */}

      {!!activeNote ? <NoteView /> : <NothingSelectedView />}

      {/* Noteview pagina cuando hay una nota*/}
      {/* <NoteView /> */}

      <IconButton
        onClick={onClickNewNote}
        disabled = {isSaving} 
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.8 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 35 }} />

      </IconButton>
    </JournalLayout>
  )
}


