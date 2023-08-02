import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { usePeople } from "../../hooks/usePeople";

const server = process.env.REACT_APP_BASE_SERVER;

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
      renderOption={(props, option) => (
        <Box {...props}>
          <Avatar
            sx={{ marginRight: "1rem" }}
            src={`${server}${option.avatar}`}
            alt={option.displayName}
          />
          {option.displayName}
        </Box>
      )}
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
