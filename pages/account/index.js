import {
  Input,
  Dialog,
  Button,
  DialogBody,
  Typography,
  Radio,
} from "@material-tailwind/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Head from "next/head";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { EditEmployeeAtom, LoginAtom } from "../../recoil/RecoilForData";

const Account = () => {
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const [NickName, setNickName] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Role, setRole] = useState("");

  const [CheckNickname, setCheckNickname] = useState();

  // SubID
  const [SubID, setSubID] = useState();

  const [RequireName, setRequireName] = useState(false);
  const [RequireSurname, setRequireSurname] = useState(false);
  const [RequireNickName, setRequireNickName] = useState(false);
  const [RequireUsername, setRequireUsername] = useState(false);
  const [RequirePassword, setRequirePassword] = useState(false);

  // Recoil
  const [EditEmployee, setEditEmployee] = useRecoilState(EditEmployeeAtom);
  const [Login, setLogin] = useRecoilState(LoginAtom);

  // Dialog
  const [EditEmployeeDialog, setEditEmployeeDialog] = useState(true);

  // Password Hide and Show
  const [PasswordHideShow, setPasswordHideShow] = useState("password");

  // Alart Nickname
  const [AlartNickName, setAlartNickName] = useState(true);

  const [Employees, setEmployees] = useState();
  // const [EmployeesRole, setEmployeesRole] = useState("");

  // Disable Edit Data Employees
  const [DisableEdit, setDisableEdit] = useState(true);
  const [DisableTitle, setDisableTitle] = useState(false);

  useEffect(() => {
    if (Login === "") {
      router.push("/login");
    }
  }, [LoginAtom]);

  useEffect(() => {
    axios
      .get("https://db-spare-parts-vercel.vercel.app/getEmployees")
      .then(function (response) {
        // handle success
        setCheckNickname(response.data);
        setEmployees(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  // useEffect(() => {
  //   if (Employees !== undefined) {
  //     let obj = Employees.filter((x) => x.Username === Login);
  //     let obj2 = obj.map((x) => x.Role);
  //     let convertObj2 = String(obj2);
  //     setEmployeesRole(convertObj2);
  //   }
  // }, [Employees]);

  useEffect(() => {
    if (EditEmployeeDialog === true) {
      setName(EditEmployee.Name);
      setSurname(EditEmployee.Surname);
      setNickName(EditEmployee.NickName);
      setUsername(EditEmployee.Username);
      setPassword(EditEmployee.Password);
      setRole(EditEmployee.Role);
      // setid(EditEmployee._id);

      // SubID
      setSubID(EditEmployee.SubID);
    }
  }, [EditEmployeeDialog]);

  useEffect(() => {
    if (Name !== "") {
      setRequireName(false);
    }
    if (Surname !== "") {
      setRequireSurname(false);
    }
    if (Username !== "") {
      setRequireUsername(false);
    }
    if (Password !== "") {
      setRequirePassword(false);
    }
    if (NickName !== "") {
      setRequireNickName(false);
    }
  }, [Name, Surname, Username, Password, NickName]);

  const InputNickname = (e) => {
    const { value } = e.target;
    setNickName(value);

    let arr = _.cloneDeep([...CheckNickname]);
    var filteredArray = arr.filter((x) => x.NickName !== EditEmployee.NickName);
    let obj = filteredArray.map((x) => x.NickName);

    let CheckSameData = obj.includes(value);

    if (CheckSameData === true) {
      setAlartNickName(false);
    } else {
      setAlartNickName(true);
    }
  };

  const router = useRouter();

  const DisableEditData = () => {
    setDisableEdit(false);
    setDisableTitle(true);
  };

  const EditData = async (e) => {
    e.preventDefault();
    let DataSubID = EditEmployee.SubID;
    let ObjectDataSubID = { DataSubID };
    const EditData = {
      Name,
      Surname,
      NickName,
      Username,
      Password,
      // Role,
      // SubID,
    };

    if (Name === "") {
      setRequireName(true);
    } else if (Surname === "") {
      setRequireSurname(true);
    } else if (NickName === "") {
      setRequireNickName(true);
    } else if (Username === "") {
      setRequireUsername(true);
    } else if (Password === "") {
      setRequirePassword(true);
    } else {
      try {
        // Find SubID
        await axios.post("https://db-spare-parts-vercel.vercel.app/findIDEmployees", ObjectDataSubID);

        // Update Data
        await axios.post("https://db-spare-parts-vercel.vercel.app/updateEmployees", EditData);
        console.log("UpdateData to Employees Success");
        // if (EmployeesRole !== "พนักงานทั่วไป") {
        //   router.push("/employees/");
        // } else {
        //   router.push("/");
        // }
        // router.push("/");
        setDisableEdit(true);
        setDisableTitle(false);
      } catch (error) {
        console.log("UpdateData Employees Error", error);
      }
    }
  };

  return (
    <>
      <Head>
        <title>บัญชี | Spareparts warehouse management </title>
      </Head>

      <Dialog open={true} size="xxl" className="bg-white">
        <nav className="sticky top-0 z-50 bg-[#424242] py-2 shadow-xl">
          {/* {EmployeesRole !== "พนักงานทั่วไป" ? (
              <Link href="/employees/">
                <Button className="float-left ml-4 bg-gray-300 text-black">
                  X
                </Button>
              </Link>
            ) : (
              <Link href="/">
                <Button className="float-left ml-4 bg-gray-300 text-black">
                  X
                </Button>
              </Link>
            )} */}
          <Link href="/">
            <Button className="float-left ml-4 bg-gray-300 text-black">
              X
            </Button>
          </Link>

          {DisableEdit !== true ? (
            <Button
              color="blue"
              className="float-right mr-4"
              onClick={EditData}
            >
              บันทึกข้อมูล
            </Button>
          ) : (
            <Button
              color="green"
              className="float-right mr-4"
              onClick={DisableEditData}
            >
              เเก้ไขข้อมูล
            </Button>
          )}
        </nav>

        <DialogBody className="flex justify-center overflow-x-auto bg-[#eceff1]">
          <div className="w-[55rem]">
            <Typography variant="h4" className="pb-2 text-black">
              บัญชีของคุณ
            </Typography>
            <Typography variant="h6" className="pb-2">
              รายละเอียด
            </Typography>

            <div className="pt-4">
              <p
                className="text-xs pl-2 aria-hidden:hidden"
                aria-hidden={DisableTitle}
              >
                ชื่อ
              </p>
              <Input
                label="ชื่อ"
                onChange={(e) => setName(e.target.value)}
                className="required:bg-red-100 disabled:bg-gray-300"
                required={RequireName}
                defaultValue={EditEmployee.Name}
                maxLength={20}
                disabled={DisableEdit}
              />
            </div>

            <div className="pt-4">
              <p
                className="text-xs pl-2 aria-hidden:hidden"
                aria-hidden={DisableTitle}
              >
                นามสกุล
              </p>
              <Input
                label="นามสกุล"
                onChange={(e) => setSurname(e.target.value)}
                className="required:bg-red-100 disabled:bg-gray-300"
                required={RequireSurname}
                defaultValue={EditEmployee.Surname}
                maxLength={20}
                disabled={DisableEdit}
              />
            </div>

            <div className="pt-4">
              <p
                className="text-xs pl-2 aria-hidden:hidden"
                aria-hidden={DisableTitle}
              >
                ชื่อเล่น
              </p>
              <Input
                label="ชื่อเล่น"
                onChange={InputNickname}
                className="required:bg-red-100 disabled:bg-gray-300"
                required={RequireNickName}
                defaultValue={EditEmployee.NickName}
                maxLength={20}
                disabled={DisableEdit}
              />
              <p
                className="text-sm pt-2 pl-3 text-red-600 aria-hidden:hidden"
                aria-hidden={AlartNickName}
              >
                ชื่อเล่นนี้ถูกใช้เเล้ว
              </p>
            </div>

            <div className="pt-4">
              <p className="text-xs pl-2">ชื่อผู้ใช้งาน</p>
              <Input
                label="ชื่อผู้ใช้งาน"
                onChange={(e) => InputUsername(e)}
                className="required:bg-red-100 disabled:bg-gray-300"
                required={RequireUsername}
                defaultValue={EditEmployee.Username}
                disabled
                maxLength={20}
              />
            </div>

            <div className="pt-4">
              <p
                className="text-xs pl-2 aria-hidden:hidden"
                aria-hidden={DisableTitle}
              >
                รหัสผ่าน
              </p>
              <div className="flex flex-row">
                <Input
                  label="รหัสผ่าน"
                  type={PasswordHideShow}
                  onChange={(e) => setPassword(e.target.value)}
                  className="required:bg-red-100 disabled:bg-gray-300"
                  required={RequirePassword}
                  defaultValue={EditEmployee.Password}
                  maxLength={20}
                  disabled={DisableEdit}
                />
                {PasswordHideShow !== "" ? (
                  <EyeSlashIcon
                    className="w-5 h-5 opacity-75 ml-2 mt-2"
                    onClick={() => setPasswordHideShow("")}
                  />
                ) : (
                  <EyeIcon
                    className="w-5 h-5 opacity-75 ml-2 mt-2"
                    onClick={() => setPasswordHideShow("password")}
                  />
                )}
              </div>
            </div>

            <header className="border-b border-gray-300 rounded-md pt-4"></header>

            <Typography variant="h6" className="pt-4">
              ตำเเหน่ง
            </Typography>
            <p className="pl-2">{EditEmployee.Role}</p>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};
export default Account;
