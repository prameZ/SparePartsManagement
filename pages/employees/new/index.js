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
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Head from "next/head";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { LoginAtom, AddEmpSuccesAtom } from "../../../recoil/RecoilForData";

const CreateDataOfTheEmployees = () => {
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const [NickName, setNickName] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Role, setRole] = useState("พนักงานทั่วไป");

  const [RequireName, setRequireName] = useState(false);
  const [RequireSurname, setRequireSurname] = useState(false);
  const [RequireNickName, setRequireNickName] = useState(false);
  const [RequireUsername, setRequireUsername] = useState(false);
  const [RequirePassword, setRequirePassword] = useState(false);

  // For Check Username
  const [UsernameGeneralClerk, setUsernameGeneralClerk] = useState();
  const [UsernameWarehouseClerk, setUsernameWarehouseClerk] = useState();
  const [CheckEmployeesUsername, setCheckEmployeesUsername] = useState();

  // Hidden Alart Same Username NickName
  const [AlartUsername, setAlartUsername] = useState(true);
  const [AlartNickName, setAlartNickName] = useState(true);

  // Password Hide and Show
  const [PasswordHideShow, setPasswordHideShow] = useState("password");

  // Recoil
  const [Login, setLogin] = useRecoilState(LoginAtom);

  // Emp page Alart
  const [AddEmpSucces, setAddEmpSucces] = useRecoilState(AddEmpSuccesAtom);

  // SaveBtn
  const [SaveBtn, setSaveBtn] = useState(false);

  useEffect(() => {
    if (Login === "") {
      router.push("/login");
    }
  }, [LoginAtom]);

  useEffect(() => {
    // axios get Data GeneralClerk
    axios
      .get("https://db-spare-parts-vercel.vercel.app/getEmployees")
      .then(function (response) {
        // handle success
        setCheckEmployeesUsername(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

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

  const WarehousingStaffToggle = (e) => {
    const { checked } = e.target;
    if (checked === true) {
      setRole("พนักงานคลัง");
    }
  };
  const UserToggle = (e) => {
    const { checked } = e.target;
    if (checked === true) {
      setRole("พนักงานทั่วไป");
    }
  };

  const InputUsername = (e) => {
    const { value } = e.target;
    setUsername(value);
    let arr = _.cloneDeep([...CheckEmployeesUsername]);
    let obj = arr.map((x) => x.Username);

    let CheckSameData = obj.includes(value);

    if (CheckSameData === true) {
      setAlartUsername(false);
    } else {
      setAlartUsername(true);
    }
  };

  const InputNickname = (e) => {
    const { value } = e.target;
    setNickName(value);
    let arr = _.cloneDeep([...CheckEmployeesUsername]);
    let obj = arr.map((x) => x.NickName);

    let CheckSameData = obj.includes(value);

    if (CheckSameData === true) {
      setAlartNickName(false);
    } else {
      setAlartNickName(true);
    }
  };

  const router = useRouter();

  const SaveData = async (e) => {
    e.preventDefault();
    const DataEmployees = {
      Name,
      Surname,
      NickName,
      Username,
      Password,
      Role,
      EmpSubID: uuidv4(),
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
    } else if (AlartUsername === false) {
    } else {
      try {
        await axios.post(
          "https://db-spare-parts-vercel.vercel.app/addEmployees",
          DataEmployees
        );
        console.log("SaveData to Employees Success");
        router.push("/employees/");
        setSaveBtn(true);
        setAddEmpSucces(true);
      } catch (error) {
        console.log("SaveData Employees Error", error);
      }
    }
  };

  return (
    <>
      <Head>
        <title>เพิ่มข้อมูลพนักงาน | Spareparts warehouse management </title>
      </Head>

      <Dialog open={true} size="xxl" className="bg-white">
        <nav className="sticky top-0 z-50 bg-[#424242] py-2 shadow-xl">
          <Link href="/employees/">
            <Button className="float-left ml-4 bg-gray-300 text-black">
              X
            </Button>
          </Link>
          <Button
            color="blue"
            className="float-right mr-4"
            onClick={SaveData}
            disabled={SaveBtn}
          >
            บันทึกข้อมูล
          </Button>
        </nav>

        <DialogBody className="flex justify-center overflow-x-auto bg-[#eceff1]">
          <div className="w-[55rem]">
            <Typography variant="h4" className="pb-2 text-black">
              เพิ่มข้อมูลพนักงาน
            </Typography>
            <Typography variant="h6" className="pb-2">
              รายละเอียดพนักงาน
            </Typography>

            <div className="pt-4">
              <Input
                label="ชื่อ"
                onChange={(e) => setName(e.target.value)}
                className="required:bg-red-100"
                required={RequireName}
                maxLength={20}
              />
            </div>

            <div className="pt-4">
              <Input
                label="นามสกุล"
                onChange={(e) => setSurname(e.target.value)}
                className="required:bg-red-100"
                required={RequireSurname}
                maxLength={20}
              />
            </div>

            <div className="pt-4">
              <Input
                label="ชื่อเล่น"
                onChange={InputNickname}
                className="required:bg-red-100"
                required={RequireNickName}
                maxLength={20}
              />
            </div>

            <div>
              <p
                className="text-sm pt-2 pl-3 text-red-600 aria-hidden:hidden"
                aria-hidden={AlartNickName}
              >
                ชื่อเล่นนี้ถูกใช้เเล้ว
              </p>
            </div>

            <div className="pt-4">
              <Input
                label="ชื่อผู้ใช้งาน"
                onChange={(e) => InputUsername(e)}
                className="required:bg-red-100"
                required={RequireUsername}
                maxLength={20}
              />
            </div>

            <div>
              <p
                className="text-sm pt-2 pl-3 text-red-600 aria-hidden:hidden"
                aria-hidden={AlartUsername}
              >
                ชื่อผู้ใช้งานนี้ถูกใช้เเล้ว
              </p>
            </div>

            <div className="pt-4 flex flex-row">
              <Input
                label="รหัสผ่าน"
                type={PasswordHideShow}
                onChange={(e) => setPassword(e.target.value)}
                className="required:bg-red-100"
                required={RequirePassword}
                maxLength={20}
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

            <header className="border-b border-gray-300 rounded-md pt-4"></header>

            <Typography variant="h6" className="pt-4">
              ตำเเหน่ง
            </Typography>
            <div className="flex gap-10">
              <Radio
                id="on"
                name="type"
                label="พนักงานคลัง"
                onClick={(e) => WarehousingStaffToggle(e)}
              />
              <Radio
                id="off"
                name="type"
                label="พนักงานทั่วไป"
                onClick={(e) => UserToggle(e)}
                defaultChecked
              />
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};
export default CreateDataOfTheEmployees;
