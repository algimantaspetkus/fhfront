import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";

import AppBar from "../components/AppBar/AppBar";
import Auth from "../utils/Auth";

import SignIn from "./SignIn";
import ProfileSettings from "./ProfileSettings";
import SignUp from "./SignUp";
import TaskLists from "./TaskLists";
import ShoppingLists from "./ShoppingLists";
import GroupSettings from "./GroupsSettings";
import Tasks from "./Tasks";
import ShoppingItems from "./ShoppingItems";
import Calendar from "./Calendar";

export default function MainLayout() {
  const userId = useSelector((state) => state.userSettings.userId);

  return (
    <>
      <Router>
        <Auth>
          {userId ? (
            <header>
              <AppBar />
            </header>
          ) : null}
          <Box component={"main"}>
            <Routes>
              <Route path="/" element={<TaskLists />} />
              <Route path="/tasklists" element={<TaskLists />} exact />
              <Route path="/shoppinglists" element={<ShoppingLists />} exact />
              <Route path="/tasklists/:itemListId/tasks" element={<Tasks />} />
              <Route
                path="/shoppinglists/:itemListId/shoppingitems"
                element={<ShoppingItems />}
              />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<ProfileSettings />} />
              <Route path="/group" element={<GroupSettings />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </Box>
        </Auth>
      </Router>
    </>
  );
}
