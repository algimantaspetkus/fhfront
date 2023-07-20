import { useEffect, useState, useCallback } from "react";
import SingleActionFab from "../components/Fab/SingleActionFab";
import Dialog from "../components/Dialog/Dialog";
import { Box, Typography, Container, Drawer } from "@mui/material";
import { useUserFamilies } from "../hooks/useUserFamilies";
import { useFamily } from "../hooks/useFamily";
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
        title: "Delete",
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
  } = useFamily();

  const handleClick = useCallback((event, familyId) => {
    event.stopPropagation();
    setActiveFamilyId(familyId);
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const familyListProps = {
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
      {dialogDeleteProps.open && <Dialog dialogProps={dialogDeleteProps} />}
      {dialogLeaveProps.open && <Dialog dialogProps={dialogLeaveProps} />}
      <Container>
        <Box sx={{ marginTop: "5rem" }}>
          <Typography variant="h4" component="h2">
            Family Settings
          </Typography>
        </Box>
        {families && <FamilyList {...familyListProps} />}
      </Container>
      <SingleActionFab onClick={openDrawer} />
      <Drawer
        anchor={"right"}
        open={drawerOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
      >
        <CreateFamilyForm drawerClose={closeDrawer} />
      </Drawer>
    </>
  );
}
