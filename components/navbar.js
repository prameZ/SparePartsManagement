import { Bars3Icon, CheckCircleIcon } from "@heroicons/react/24/solid";
import logo from "../asset/ptwlogo.png";
import Image from "next/image";
import { useRecoilState } from "recoil";
import {
  BtnSidebarAtom,
  AddEmpSuccesAtom,
  EditEmpSuccesAtom,
  DeleteEmpSuccesAtom,
  AddPartSuccesAtom,
  EditPartSuccesAtom,
  DeletePartSuccesAtom,
  RequisitionPartSuccesAtom,
  AddAmountPartSuccesAtom,
  ReturnPartSuccesAtom,
} from "../recoil/RecoilForData";
import { Alert } from "@material-tailwind/react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [BtnSidebar, setBtnSidebar] = useRecoilState(BtnSidebarAtom);

  // Emp page Alart
  const [AddEmpSucces, setAddEmpSucces] = useRecoilState(AddEmpSuccesAtom);
  const [EditEmpSucces, setEditEmpSucces] = useRecoilState(EditEmpSuccesAtom);
  const [DeleteEmpSucces, setDeleteEmpSucces] =
    useRecoilState(DeleteEmpSuccesAtom);

  // Parts Page Alart
  const [AddPartSucces, setAddPartSucces] = useRecoilState(AddPartSuccesAtom);
  const [EditPartSucces, setEditPartSucces] =
    useRecoilState(EditPartSuccesAtom);
  const [DeletePartSucces, setDeletePartSucces] =
    useRecoilState(DeletePartSuccesAtom);
  const [RequisitionPartSucces, setRequisitionPartSucces] = useRecoilState(
    RequisitionPartSuccesAtom
  );

  // notifications page Alart
  const [AddAmountPartSucces, setAddAmountPartSucces] = useRecoilState(
    AddAmountPartSuccesAtom
  );

  // ReturnParts page Alart
  const [ReturnPartSucces, setReturnPartSucces] =
    useRecoilState(ReturnPartSuccesAtom);

  const SidebarFN = () => {
    setBtnSidebar(true);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setAddEmpSucces(false);
  //   }, "2000");
  // }, [AddEmpSucces]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setEditEmpSucces(false);
  //   }, "2000");
  // }, [EditEmpSucces]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setDeleteEmpSucces(false);
  //   }, "2000");
  // }, [DeleteEmpSucces]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setAddPartSucces(false);
  //   }, "2000");
  // }, [AddPartSucces]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setEditPartSucces(false);
  //   }, "2000");
  // }, [EditPartSucces]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setDeletePartSucces(false);
  //   }, "2000");
  // }, [DeletePartSucces]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setRequisitionPartSucces(false);
  //   }, "2000");
  // }, [RequisitionPartSucces]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setAddAmountPartSucces(false);
  //   }, "2000");
  // }, [AddAmountPartSucces]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setReturnPartSucces(false);
  //   }, "2000");
  // }, [ReturnPartSucces]);

  return (
    <>
      <nav className="absolute px-4 py-4 visible md:invisible">
        <div className="flex flex-row">
          <Bars3Icon
            className="w-10 h-10 opacity-75 mr-1 mt-4 text-gray-800"
            onClick={SidebarFN}
          />
          <Image
            src={logo}
            alt="UserPicture"
            layout="fixed"
            className="object-cover w-28 h-16 mr-4"
          />
        </div>
      </nav>

      <div className="visible md:invisible">
        <Alert
          color="blue"
          icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
          className="fixed w-full top-2"
          show={AddEmpSucces}
        >
          เพื่มข้อมูลพนักงานสำเร็จ
        </Alert>

        <Alert
          color="blue"
          icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
          className="fixed w-full top-2"
          show={EditEmpSucces}
        >
          เเก้ไขข้อมูลพนักงานสำเร็จ
        </Alert>

        <Alert
          color="blue"
          icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
          className="fixed w-full top-2"
          show={DeleteEmpSucces}
        >
          ลบข้อมูลพนักงานสำเร็จ
        </Alert>

        <Alert
          color="blue"
          icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
          className="fixed w-full top-2"
          show={AddPartSucces}
        >
          เพื่มข้อมูลพาร์ทสำเร็จ
        </Alert>

        <Alert
          color="blue"
          icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
          className="fixed w-full top-2"
          show={EditPartSucces}
        >
          เเก้ไขข้อมูลพาร์ทสำเร็จ
        </Alert>

        <Alert
          color="blue"
          icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
          className="fixed w-full top-2"
          show={DeletePartSucces}
        >
          ลบข้อมูลพาร์ทสำเร็จ
        </Alert>

        <Alert
          color="blue"
          icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
          className="fixed w-full top-2"
          show={RequisitionPartSucces}
        >
          เบิกพาร์ทสำเร็จ
        </Alert>

        <Alert
          color="blue"
          icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
          className="fixed w-full top-2"
          show={AddAmountPartSucces}
        >
          เพิ่มจำนวนพาร์ทสำเร็จ
        </Alert>

        <Alert
          color="blue"
          icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
          className="fixed w-full top-2"
          show={ReturnPartSucces}
        >
          คืนพาร์ทสำเร็จ
        </Alert>
      </div>
    </>
  );
};
export default Navbar;
