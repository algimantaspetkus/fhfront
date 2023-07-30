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
