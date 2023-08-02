import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { usePeople } from "../../hooks/usePeople";

export default function PeoplePicker({ itemListId, setItemData }) {
  const [open, setOpen] = useState(false);
  const { people, getByListId, loading } = usePeople(itemListId);

  useEffect(() => {
    if (open) {
      getByListId();
    }
  }, [open, getByListId, itemListId]);

  return (
    <Autocomplete
      open={open}
      onChange={(e, value) => setItemData("assignedToUser", value?._id)}
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
