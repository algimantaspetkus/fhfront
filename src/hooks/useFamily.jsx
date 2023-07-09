import { useState } from "react";
import { useSnackbar } from "notistack";

export function useFamily() {
  const [defaultFamily, setDefaultFamily] = useState(
    localStorage.getItem("defaultFamilyId")
  );
  const [name, setName] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const server = process.env.REACT_APP_BASE_SERVER;

  async function createFamily(event, ref) {
    event.preventDefault();
    setLoading(true);
    fetch(`${server}/family/addfamily`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Family created", { variant: "success" });
          ref.value = "";
          ref.focus();
        } else {
          console.log(res.status);
          enqueueSnackbar("Couldn't create family", { variant: "error" });
        }
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Couldn't create family", { variant: "error" });
      })
      .finally(() => setLoading(false));
  }

  async function disableFamily(familyId) {
    setLoading(true);
    fetch(`${server}/family/disablefamily`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ familyId }),
    })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Family disabled", { variant: "success" });
        } else {
          console.log(res.status);
          enqueueSnackbar("Couldn't disable family", { variant: "error" });
        }
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Couldn't disable family", { variant: "error" });
      })
      .finally(() => setLoading(false));
  }

  async function leaveFamily(familyId) {
    setLoading(true);
    fetch(`${server}/family/leavefamily`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ familyId }),
    })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Family left", { variant: "success" });
        } else {
          console.log(res.status);
          enqueueSnackbar("Couldn't leave family", { variant: "error" });
        }
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Couldn't leave family", { variant: "error" });
      })
      .finally(() => setLoading(false));
  }

  async function updateDefaultFamily(id) {
    setLoading(true);
    fetch(`${server}/user/updatedefaultfamily`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ defaultFamilyId: id }),
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("defaultFamilyId", id);
          setDefaultFamily(id);
          enqueueSnackbar("Default family changed", { variant: "success" });
        } else {
          enqueueSnackbar("Couldn't change default family", {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar("Couldn't change default family", { variant: "error" });
      })
      .finally(() => setLoading(false));
  }

  async function getFamilySecret(familyId) {
    setLoading(true);
    fetch(`${server}/family/getfamilysecret/${familyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log(res.status);
          enqueueSnackbar("Couldn't get family secret", { variant: "error" });
        }
      })
      .then((data) => {
        if (data?.secret) {
          enqueueSnackbar("Invitation code copied to clipboard", {
            variant: "success",
          });
          navigator.clipboard.writeText(data.secret);
        } else {
          enqueueSnackbar("Couldn't get family secret", { variant: "error" });
        }
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Couldn't get family secret", { variant: "error" });
      })
      .finally(() => setLoading(false));
  }

  async function joinFamily(event, ref) {
    event.preventDefault();
    setLoading(true);
    fetch(`${server}/family/joinfamily`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ secret }),
    })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Family joined", { variant: "success" });
          ref.value = "";
          ref.focus();
        } else {
          enqueueSnackbar("Couldn't join family", { variant: "error" });
        }
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Couldn't join family", { variant: "error" });
      })
      .finally(() => setLoading(false));
  }

  const setFamilyNameHandler = (event) => {
    setName(event.target.value);
  };
  const setFamilySecretHandler = (event) => {
    setSecret(event.target.value);
  };

  return {
    createFamily,
    disableFamily,
    leaveFamily,
    setFamilyNameHandler,
    setFamilySecretHandler,
    updateDefaultFamily,
    getFamilySecret,
    joinFamily,
    loading,
    defaultFamily,
  };
}
