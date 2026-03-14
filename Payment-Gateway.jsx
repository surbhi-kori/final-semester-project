import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography
} from "@mui/material"

import AppButton from "../UI/ButtonUI"

type Props = {
  open: boolean
  message: string
  onConfirm: () => void
  onClose: () => void
  confirmLabel?: string
  cancelLabel?: string
}

export default function ConfirmActionDialog({
  open,
  message,
  onConfirm,
  onClose,
  confirmLabel = "Yes",
  cancelLabel = "No"
}: Props) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >

      <DialogContent sx={{ py: 1.5 }}>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            textAlign:"justify",
            lineHeight: 1.4
          }}
        >
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Box sx={{ display: "flex", gap: 2, ml: "auto" }}>

          <AppButton
            variant="outlined"
            onClick={onClose}
            sx={{ height: "30px" }}
          >
            {cancelLabel}
          </AppButton>

          <AppButton
            variant="filled"
            onClick={onConfirm}
            sx={{ height: "30px" }}
          >
            {confirmLabel}
          </AppButton>

        </Box>
      </DialogActions>

    </Dialog>
  )
}
