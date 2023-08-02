import { Skeleton, Stack } from "@mui/material";

export function DrawerSkeleton() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rounded" animation="wave" height="4rem" />
      <Skeleton variant="rounded" animation="wave" height="7rem" />
      <Skeleton variant="rounded" animation="wave" height="3rem" />
      <Skeleton variant="rounded" animation="wave" height="3rem" />
      <Skeleton variant="rounded" animation="wave" height="3rem" />
      <Skeleton variant="rounded" animation="wave" height="3rem" />
      <Skeleton variant="rounded" animation="wave" height="3rem" />
    </Stack>
  );
}

export function ListSkeleton() {
  return (
    <Stack spacing={1}>
      <Skeleton
        variant="rounded"
        animation="wave"
        height="3rem"
        width="200px"
        sx={{ margin: "1rem 0" }}
      />
      <Skeleton variant="rounded" animation="wave" height="3rem" />
      <Skeleton variant="rounded" animation="wave" height="3rem" />
      <Skeleton variant="rounded" animation="wave" height="3rem" />
      <Skeleton variant="rounded" animation="wave" height="3rem" />
    </Stack>
  );
}
