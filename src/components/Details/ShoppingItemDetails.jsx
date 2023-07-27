import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Chip,
} from "@mui/material";
import dayjs from "dayjs";
import { DrawerSkeleton } from "../DrawerSkeleton";

export default function ItemDetails({
  itemId,
  deleteItem,
  getItem,
  toggleComplete,
}) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (id) => {
      setLoading(true);
      const fetchedItem = await getItem(id);
      await setItem(fetchedItem?.shoppingItem);
      setLoading(false);
    };
    if (itemId) {
      fetchData(itemId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  return (
    <Container sx={{ padding: "2rem" }}>
      {loading ? (
        <DrawerSkeleton />
      ) : (
        <Box sx={{ marginBottom: "3rem" }}>
          {item && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              {item.required && (
                <Typography
                  variant="p"
                  sx={{ textAlign: "center", backgroundColor: "#FF5733" }}
                >
                  Required
                </Typography>
              )}
              <Typography sx={{ marginBottom: "1rem" }} variant="h5">
                {item.itemTitle}
              </Typography>
              {item.type && (
                <Box>
                  <Chip label={item.type} color="primary" />
                </Box>
              )}
              {item.quantity && (
                <TextField label="Quantity" value={item.quantity} readOnly />
              )}
              {item.itemDescription && (
                <TextField
                  label="Description"
                  value={item.itemDescription}
                  multiline
                  rows={4}
                  readOnly
                />
              )}
              <TextField
                label="Created By"
                value={item?.createdByUser?.displayName}
                readOnly
              />
              <TextField
                label="Created At"
                value={dayjs(item.createdAt).format("YYYY-MM-DD HH:mm")}
                readOnly
              />
              {item.completed && (
                <TextField
                  label="Completed At"
                  value={dayjs(item.completedAt).format("YYYY-MM-DD HH:mm")}
                  readOnly
                />
              )}
              {item.url && (
                <Link
                  underline="none"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.itemTitle}
                </Link>
              )}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="text"
                  onClick={() => toggleComplete(item._id, !item.completed)}
                >
                  {item.completed ? "Un-Complete" : "Complete"}
                </Button>
                <Button variant="text" color="error" onClick={deleteItem}>
                  Delete
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
}
