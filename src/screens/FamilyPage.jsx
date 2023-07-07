import React, { useEffect, useState, useCallback, memo } from "react";
import SingleActionFab from "../components/Fab/SingleActionFab";
import Dialog from "../components/Dialog/Dialog";
import { Box, Typography, Container, SwipeableDrawer } from "@mui/material";
import { useUserFamilies } from "../hooks/useUserFamilies";
import { useFamilyControl } from "../hooks/useFamilyControl";
import { useDialog } from "../hooks/useDialog";
import { useDrawer } from "../hooks/useDrawer";
import CreateFamilyForm from "../components/Forms/CreateFamilyForm";
import FamilyList from "../components/Lists/FamilyList";

export default function FamilyPage() {
  const { families } = useUserFamilies();
  const [activeFamilyId, setActiveFamilyId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();

  const {
    dialogProps: dialogDeleteProps,
    handleClickOpen: setDialogDeleteOpen,
  } = useDialog({
    content:
      "Are you sure you want to delete this family? This action cannot be undone.",
    title: "Delete Family",
    buttons: [
      { title: "Cancel" },
      {
        autofocus: true,
        title: "Disable",
        callback: () => disableFamily(activeFamilyId),
      },
    ],
  });

  const { dialogProps: dialogLeaveProps, handleClickOpen: setDialogLeaveOpen } =
    useDialog({
      content: "Are you sure you want to leave this family?",
      title: "Leave Family",
      buttons: [
        { title: "Cancel" },
        {
          autofocus: true,
          title: "Leave",
          callback: () => leaveFamily(activeFamilyId),
        },
      ],
    });

  const {
    defaultFamily,
    updateDefaultFamily,
    disableFamily,
    leaveFamily,
    getFamilySecret,
  } = useFamilyControl();

  const handleClick = useCallback((event, familyId) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setActiveFamilyId(familyId);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const MemorizedFamilyList = memo(FamilyList);
  const familyListPorps = {
    families,
    defaultFamily,
    handleClick,
    anchorEl,
    activeFamilyId,
    handleClose,
    updateDefaultFamily,
    setDialogDeleteOpen,
    setDialogLeaveOpen,
    getFamilySecret,
  };

  useEffect(() => {
    setActiveFamilyId(defaultFamily);
  }, [defaultFamily]);

  return (
    <>
      {dialogDeleteProps.isOpen && <Dialog dialogProps={dialogDeleteProps} />}
      {dialogLeaveProps.isOpen && <Dialog dialogProps={dialogLeaveProps} />}
      <Container>
        <Box sx={{ marginTop: "5rem" }}>
          <Typography variant="h4" component="h2">
            Family Settings
          </Typography>
        </Box>
        <MemorizedFamilyList {...familyListPorps} />
      </Container>
      <SingleActionFab onClick={openDrawer} />
      <SwipeableDrawer
        anchor={"right"}
        open={drawerOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
      >
        <CreateFamilyForm drawerClose={closeDrawer} />
      </SwipeableDrawer>
    </>
  );
}
