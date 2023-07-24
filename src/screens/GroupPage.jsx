import { useEffect, useState, useCallback } from "react";
import SingleActionFab from "../components/Fab/SingleActionFab";
import Dialog from "../components/Dialog/Dialog";
import { Box, Typography, Container, Drawer } from "@mui/material";
import { useUserGroups } from "../hooks/useUserGroups";
import { useGroup } from "../hooks/useGroup";
import { useDialog } from "../hooks/useDialog";
import { useDrawer } from "../hooks/useDrawer";
import CreateGroupForm from "../components/Forms/CreateGroupForm";
import GroupList from "../components/Lists/GroupList";

export default function GroupPage() {
  const { groups } = useUserGroups();
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();

  const {
    dialogProps: dialogDeleteProps,
    handleClickOpen: setDialogDeleteOpen,
  } = useDialog({
    content:
      "Are you sure you want to delete this group? This action cannot be undone.",
    title: "Delete Group",
    buttons: [
      { title: "Cancel" },
      {
        autofocus: true,
        title: "Delete",
        callback: () => disableGroup(activeGroupId),
      },
    ],
  });

  const { dialogProps: dialogLeaveProps, handleClickOpen: setDialogLeaveOpen } =
    useDialog({
      content: "Are you sure you want to leave this group?",
      title: "Leave Group",
      buttons: [
        { title: "Cancel" },
        {
          autofocus: true,
          title: "Leave",
          callback: () => leaveGroup(activeGroupId),
        },
      ],
    });

  const {
    defaultGroup,
    updateDefaultGroup,
    disableGroup,
    leaveGroup,
    getGroupSecret,
  } = useGroup();

  const handleClick = useCallback((event, groupId) => {
    event.stopPropagation();
    setActiveGroupId(groupId);
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const groupListProps = {
    groups,
    defaultGroup,
    handleClick,
    anchorEl,
    activeGroupId,
    handleClose,
    updateDefaultGroup,
    setDialogDeleteOpen,
    setDialogLeaveOpen,
    getGroupSecret,
  };

  useEffect(() => {
    setActiveGroupId(defaultGroup);
  }, [defaultGroup]);

  return (
    <>
      {dialogDeleteProps.open && <Dialog dialogProps={dialogDeleteProps} />}
      {dialogLeaveProps.open && <Dialog dialogProps={dialogLeaveProps} />}
      <Container>
        <Box sx={{ marginTop: "5rem" }}>
          <Typography variant="h4" component="h2">
            Group Settings
          </Typography>
        </Box>
        {groups && <GroupList {...groupListProps} />}
      </Container>
      <SingleActionFab onClick={openDrawer} />
      <Drawer
        anchor={"right"}
        open={drawerOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
      >
        <CreateGroupForm drawerClose={closeDrawer} />
      </Drawer>
    </>
  );
}
