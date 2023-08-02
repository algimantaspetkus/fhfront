import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import { resetState } from "../redux/userSettingsSlice";

export default function Auth({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getUser } = useGetUser();
  const dispatch = useDispatch();
  const defaultGroupId = useSelector(
    (state) => state.userSettings.defaultGroupId
  );

  useEffect(() => {
    const jwt = localStorage.getItem("token");

    if (jwt) {
      getUser();
    }

    if (!jwt && pathname !== "/signin" && pathname !== "/signup") {
      dispatch(resetState());
      navigate("/signin");
    } else if (jwt && pathname === "/signin") {
      navigate("/");
    } else if (jwt && pathname !== "/group" && !defaultGroupId) {
      navigate("/group");
    }
  }, [defaultGroupId, pathname, navigate, getUser, dispatch]);
  return <>{children}</>;
}
