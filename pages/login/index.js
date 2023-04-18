import Image from "next/image";
import logo from "../../asset/ptwlogo.png";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { LoginAtom } from "../../recoil/RecoilForData";
import { Button } from "@material-tailwind/react";

const Login = () => {
  const [Login, setLogin] = useRecoilState(LoginAtom);

  // Password Hide and Show
  const [PasswordHideShow, setPasswordHideShow] = useState("password");

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  // AlartUsernamePassword
  const [AlartUsernamePassword, setAlartUsernamePassword] = useState(true);

  // Loading
  const [AlartLoading, setAlartLoading] = useState(true);

  // btnSubmitHide
  const [BtnSubmit, setBtnSubmit] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (Username !== "") {
      setAlartUsernamePassword(true);
    }
    if (Password !== "") {
      setAlartUsernamePassword(true);
    }
  }, [Username, Password]);

  const LoginSubmit = async (e) => {
    e.preventDefault();
    setAlartLoading(false);
    setBtnSubmit(true);

    try {
      await axios.post("https://db-spare-parts-vercel.vercel.app/login", {
        Username,
        Password,
      });

      if (res.data == "exist") {
        router.push("/");
        setLogin(Username);
      } else if (res.data == "notexist") {
        // alert("Username and Password not correct");
        setAlartUsernamePassword(false);
        setAlartLoading(true);
        setBtnSubmit(false);
      }
    } catch (error) {
      console.log("Login error", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 px-6 sm-px-0">
      <Head>
        <title>ล็อคอิน | Spareparts warehouse management </title>
      </Head>

      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <Image
                src={logo}
                alt="PtwLogo"
                width="350px"
                height="300px"
                layout="fixed"
                className="pb-4"
              />
            </div>

            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="username"
                    name="username"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    ชื่อผู้ใช้งาน
                  </label>
                </div>

                <div className="relative flex flex-row">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type={PasswordHideShow}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {PasswordHideShow !== "text" ? (
                    <EyeSlashIcon
                      className="w-5 h-5 opacity-75 ml-2 mt-2"
                      onClick={() => setPasswordHideShow("text")}
                    />
                  ) : (
                    <EyeIcon
                      className="w-5 h-5 opacity-75 ml-2 mt-2"
                      onClick={() => setPasswordHideShow("password")}
                    />
                  )}
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    รหัสผ่าน
                  </label>
                </div>

                <div className="relative">
                  <p
                    className="text-md text-center text-gray-600 aria-hidden:hidden"
                    aria-hidden={AlartLoading}
                  >
                    Loading...
                  </p>
                </div>

                <div className="relative">
                  <p
                    className="text-sm text-red-600 aria-hidden:hidden"
                    aria-hidden={AlartUsernamePassword}
                  >
                    ชื่อผู้ใช้งาน หรือ รหัสผ่าน ไม่ถูกต้อง
                  </p>
                </div>

                <div
                  className="relative aria-hidden:hidden"
                  aria-hidden={BtnSubmit}
                >
                  <Button fullWidth onClick={LoginSubmit}>
                    ล็อคอิน
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
