import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { theme } from '../../theme'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'

type Props = {
  title?: string
  items: string[]
  isExpanded?: boolean
}

export const HomeCard = ({ title, items, isExpanded }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(isExpanded || false)
  const titleBlock = (
    <Typography
      variant="h5"
      sx={{
        mb: '20px',
        color: theme.palette.warning.main,
      }}
      gutterBottom>
      {title}
    </Typography>
  )

  const renderItem = (text: string, index: number) => {
    return <div key={index}>{text}</div>
  }

  return (
    <>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography>{title && titleBlock}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography> {items.map(renderItem)}</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
