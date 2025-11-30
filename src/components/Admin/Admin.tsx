import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import { Outlet, useNavigate } from "react-router";
import { useLoginContext } from "../../@context/loginContext";

const Admin = () => {
  const { user, loginFn, loginLoading, loginError } = useLoginContext();
  const nav = useNavigate();

  const [{ login, password }, setAdminData] = useState({
    login: "",
    password: "",
  });

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value, error: false }));
  };

  useEffect(() => {
    if (user) {
      nav("panel");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmitLogin = async (e: FormEvent) => {
    e.preventDefault();
    loginFn({ login, password });
    nav("panel");
  };

  return (
    <section data-testid="admin">
      <h1>Strona administratora</h1>
      {!user && (
        <AdminLogin
          onSubmitLogin={handleSubmitLogin}
          onChangeInput={handleChangeData}
          loading={loginLoading}
          error={loginError}
        />
      )}
      <Outlet />
    </section>
  );
};

export default Admin;
