import Typography from '@mui/material/Typography'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTheme } from '@mui/material/styles'

type Props = {
  title?: string
  items: string[]
  setExpanded: React.Dispatch<React.SetStateAction<number | undefined>>
  idForExpand: number
  expanded?: number
}

export const HomeCard = ({
  title,
  items,
  idForExpand,
  expanded,
  setExpanded,
}: Props) => {
  const theme = useTheme()

  const titleBlock = (
    <Typography
      variant="subtitle1"
      sx={{
        mb: '0',
        color: theme.palette.warning.main,
      }}
      gutterBottom>
      {title}
    </Typography>
  )

  const renderItem = (text: string, index: number) => {
    return <Typography key={index}>{text}</Typography>
  }

  const isExpanded = idForExpand === expanded

  return (
    <>
      <Accordion
        sx={{ margin: '0 !important' }}
        expanded={isExpanded}
        onChange={() => setExpanded(isExpanded ? undefined : idForExpand)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          {title && titleBlock}
        </AccordionSummary>
        <AccordionDetails>{items.map(renderItem)}</AccordionDetails>
      </Accordion>
    </>
  )
}
