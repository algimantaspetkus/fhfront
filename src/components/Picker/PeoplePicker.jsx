import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { usePeople } from "../../hooks/usePeople";

export default function PeoplePicker({ taskListId, setTaskData }) {
  const [open, setOpen] = React.useState(false);
  const { people, getByTaskList, loading } = usePeople(taskListId);

  React.useEffect(() => {
    if (open) {
      getByTaskList();
    }
  }, [open, getByTaskList, taskListId]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      open={open}
      onChange={(e, value) => setTaskData("assignedToUser", value?._id)}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) =>
        option.displayName === value.displayName
      }
      getOptionLabel={(option) => option.displayName}
      options={people}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Assign To User"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
