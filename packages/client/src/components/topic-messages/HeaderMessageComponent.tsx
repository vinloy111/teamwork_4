import { Message } from 'types/Forum'
import { ReactNode, useEffect, useRef, useState } from 'react'
import {
  Accordion,
  AccordionSummary,
  Avatar,
  IconButton,
  MenuItem,
  Stack,
} from '@mui/material'
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from 'mui-tiptap'
import Button from '@mui/material/Button'
import { StarterKit } from '@tiptap/starter-kit'
import Box from '@mui/material/Box'
import { TopicReactionsButtons } from 'components/topic-reactions-buttons'
import DeleteIcon from '@mui/icons-material/Delete'
import ReplyIcon from '@mui/icons-material/Reply'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector } from 'react-redux'
import { Store } from '../../store'
import { NavLink } from 'react-router-dom'
import { theme } from 'theme/index'
import Typography from '@mui/material/Typography'
import { getUserName } from 'utils/adaptUserData'
import backendService from 'services/backend-service'

export declare type HeaderMessageProps = {
  showExpanded?: boolean
  showReply?: boolean
  fullPermission: boolean
  userName?: string
  expandedReplies?: boolean
  setExpandedReplies?: (res: boolean) => void
  editing?: boolean
  setEditing?: (res: boolean) => void
  clickOnReply?: () => void
}

/**
 * Компонент хедер для любых сообщений форума
 * @param expandedReplies
 * @param fullPermission
 * @param userName
 * @param setExpandedReplies
 * @param showExpanded
 * @param showReply
 * @param setEditing
 * @param editing
 * @constructor
 */
export const HeaderMessageComponent = ({
  expandedReplies,
  fullPermission,
  userName,
  setExpandedReplies,
  showExpanded,
  showReply,
  setEditing,
  editing,
  clickOnReply,
}: HeaderMessageProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" justifyContent="space-start" alignItems="center">
        <Typography>{userName || 'Anonimus'}</Typography>
      </Stack>
      <Box>
        {fullPermission ? (
          <>
            <IconButton color="secondary" size={'small'}>
              <DeleteIcon />
            </IconButton>
            {setEditing && (
              <IconButton
                color="secondary"
                size={'small'}
                onClick={() => setEditing(!editing)}>
                {editing ? <CloseIcon /> : <EditIcon />}
              </IconButton>
            )}
          </>
        ) : null}
        {showReply && clickOnReply && (
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => clickOnReply()}>
            <ReplyIcon />
          </IconButton>
        )}
        {showExpanded && setExpandedReplies && (
          <IconButton
            color="secondary"
            size={'medium'}
            onClick={() => setExpandedReplies(!expandedReplies)}>
            {expandedReplies ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        )}
      </Box>
    </Stack>
  )
}
