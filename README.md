
## โปรเจค ระบบบริหารจัดการคลังอะไหล่ (เป็นโปรเจคจบมหาวิทยาลัย)

Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## git repo นี้เป็นในส่วนของ Frontend

- ใช้ Javascript, Next.js, Tailwind, Recoil ในการพัฒนาระบบ
- เป็นโปรเจคเเรกที่ทำครั้งเเรก ซึ่งจะมีข้อผิดพลาดหรือองค์ประกอบที่ไม่ครบถ้วน ได้เเก่
  1. ไม่มี login session
  2. ในการทำ responsive ของเว็บมีบางจุดที่มีข้อบกพร่อง
  3. UI ของเว็บไม่ค่อยสวยเเละอาจใช้งานลำบาก
  4. เรื่องของบัค
  5. เรื่องของการเขียนโค้ด จะเห็นว่ามี code smell หลายจุด
  6. ข้อมูลไม่ realtime

## Username เเละ Password สำหรับเข้าสู่ระบบ 
ผู้ใช้ที่เป็นพนักงานคลัง
```bash
  Username : admin
  Password : adminpassword
```
ผู้ใช้ที่เป็นพนักงานทั่วไป
```bash
  Username : test
  Password : 1234
```
## ส่วนประกอบต่างๆของระบบ/หน้าเว็บ
เข้าเว็บมาจะเข้าสู่หน้า Login ก่อน โดยจะเเบ่งออกเป็น 2 ตำเเหห่ง คือ 1.ผู้ใช้ที่เป็นพนักงานคลัง 2.ผู้ใช้ที่เป็นพนักงานทั่วไป

`หน้าหลัก` 

  - เเสดง ชื่อ, จำนวน, ตำเเหน่งจัดเก็บ

`หน้าหมวดหมู่พาร์ท`

  - ให้เลือกหมวดหมู่ที่ต้องการจาก sidebar จะเเบ่งออกเป็น 9 หมวดหมู่
  
`หน้า Dashboard`

  - เป็นหน้ารายงานข้อมูล เช่น จำนวนพนักงานงาน, จำนวนอะไหล่, จำนวนการเบิกอะไหล่
  
`หน้าข้อมูลอะไหล่`

  - สามารถจัดการข้อมูลอะไหล่ได้ เช่น เพิ่ม, เเก้ไข, ลบ ข้อมูลอะไหล่ เบิกอะไหล่ เเละเเจ้งเตือนจำนวนอะไหล่ที่ใกล้หมดหรือหมด 
  
  (เมื่อมีเเจ้งเตือน icon ระฆังจะเปลี่ยน สามารถคลิกเพื่อเข้าไปสู่หน้าเเจ้งเตือน เพื่อดูเเจ้งเตือนเเละเพิ่มอะไหล่ได้)
  
`หน้าข้อมูลพนักงาน`

  - เเสดงข้อมูลพนักงานทั้ง 2 ตำเเหน่ง เเละจัดการข้อมูลพนักงานได้ เช่น เพิ่ม, เเก้ไข, ลบ ข้อมูลพนักงาน
  
`หน้าเบิกอะไหล่ด้วยบาร์โค้ด`

  - ต้องเลือกผู้เบิก เเละต้องใช้เครื่องสเเกนบาร์โค้ด ถึงจะทำรายการเบิกอะไหล่ได้
  
`หน้าทำรายการคืนอะไหล่`

  - จะคืนอะไหล่ได้จะต้องเบิกอะไหล่ก่อน โดยการจะคืนจะเอาข้อมูลจากการเบิกของการทำรายการนั้นๆมาเเสดงเพื่อใช้สำหรับการจะคืนอะไหล่
  
`หน้าประวัติการเบิกเเละคืนอะไหล่`

  - จะเเสดงรายการการเบิก/คืนอะไหล่ เช่น ชื่อผู้เบิก/คืน, ชื่ออะไหล่ที่เบิก/คืน, เวลาเบิก/คืน, จำนวนเบิก/คืน, วัน-เวลาเบิก/คืน
  
`หน้าข้อมูลบัญชี`

  - จะสามารถเเก้ไขข้อมูลของผู้ใช้ที่ทำการเข้าสู่ระบบได้
  
## git repo ของ Backend
link : https://github.com/prameZ/DB-SpareParts-Vercel

## Deployment on vercel
link : https://spare-parts-management-zymy.vercel.app/

