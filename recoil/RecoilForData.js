import { atom } from "recoil";
import { v1 } from "uuid";

// /////////////////////////////// Login ///////////////////////////////
export const LoginAtom = atom({
  key: `LoginAtom/${v1()}`,
  default: "",
});

// /////////////////////////////// Barcode ///////////////////////////////
export const BarcodeAtom = atom({
  key: `BarcodeAtom/${v1()}`,
  default: {
    PartName: "",
    PartCode: "DataBarcode",
  },
});

// /////////////////////////////// Employees Edit Delete ///////////////////////////////
export const EditEmployeeAtom = atom({
  key: `EditEmployeeAtom/${v1()}`,
  default: {},
});

export const DeleteEmployeeAtom = atom({
  key: `DeleteEmployeeAtom/${v1()}`,
  default: {},
});

// /////////////////////////////// Parts Edit Delete ///////////////////////////////
export const EditPartAtom = atom({
  key: `EditPartAtom/${v1()}`,
  default: {},
});

export const DeletePartAtom = atom({
  key: `DeletePartAtom/${v1()}`,
  default: {},
});

// /////////////////////////////// Parts Requisition ///////////////////////////////
export const RequisitionAtom = atom({
  key: `RequisitionAtom/${v1()}`,
  default: {},
});

// /////////////////////////////// Parts Return ///////////////////////////////
export const ReturnPartsAtom = atom({
  key: `ReturnPartsAtom/${v1()}`,
  default: {},
});

// /////////////////////////////// AddAmountParts Modal ///////////////////////////////
export const AddAmountAtom = atom({
  key: `AddAmountAtom/${v1()}`,
  default: {},
});

// /////////////////////////////// Sidebar ///////////////////////////////
export const BtnSidebarAtom = atom({
  key: `BtnSidebareAtom/${v1()}`,
  default: false,
});

// /////////////////////////////// DataRequisituinAtom ///////////////////////////////
export const testDataRequisituinAtom = atom({
  key: `testDataRequisituinAtom/${v1()}`,
  default: [],
});
