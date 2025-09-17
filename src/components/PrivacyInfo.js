import React, { useState } from "react";
import { Modal, Box, Typography, Button, Link } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PrivacyInfo = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Link
        href="#"
        onClick={handleOpen}
        sx={{ ml: 2, verticalAlign: "middle" }}
      >
        <LockIcon fontSize="small" /> Privacy & Security
      </Link>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            100% User Privacy
          </Typography>
          <Typography sx={{ mt: 2 }}>
            This application never sends your data over the internet. All the
            financial information you enter is stored only on your own computer,
            inside your own web browser's local storage.
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Note that some web browsers may have a sync feature that you
            control, which could back up this data to your personal cloud
            account.
          </Typography>
          <Button onClick={handleClose} sx={{ mt: 3 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default PrivacyInfo;
