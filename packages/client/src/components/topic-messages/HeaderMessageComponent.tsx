import { IconButton, Stack } from '@mui/material'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete'
import ReplyIcon from '@mui/icons-material/Reply'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

export declare type HeaderMessageProps = {
  showExpanded?: boolean
  showReply?: boolean
  fullPermission: boolean
  userName?: string
  expandedReplies?: boolean
  setExpandedReplies?: (res: boolean) => void
  onDelete: () => void
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
 * @param clickOnReply
 * @param onDelete
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
  onDelete,
}: HeaderMessageProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" justifyContent="space-start" alignItems="center">
        <Typography>{userName || 'Anonimus'}</Typography>
      </Stack>
      <Box>
        {fullPermission ? (
          <>
            <IconButton
              color="secondary"
              size={'small'}
              onClick={() => onDelete()}>
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
