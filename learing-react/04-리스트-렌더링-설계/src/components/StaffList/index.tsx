import S from "./style.module.css";
import staffData from "./data/staff.json";
import type { Staff } from "./type/staff";
import { useState } from "react";

const INITIAL_STAFF: Staff[] = staffData;

export default function StaffList() {
  const [staff] = useState(INITIAL_STAFF);

  return (
    <section className={S.container}>
      <header className={S.header}>
        <h2>알바생 관리 명부</h2>
        <span className={S.count}>총원 {staff.length}명</span>
      </header>

      <ul className={S.grid}>
        {staff.map((person) => {
          const { id, name, phone, role, status, wage } = person;
          const isActiveStatus = status === "active";
          const staffClassname = `${S.statusBadge} ${isActiveStatus ? S.active : ""}`;

          return (
            <li key={id} className={S.card}>
              <span
                role="status"
                aria-label="출근 중"
                title="출근 중"
                className={staffClassname.trim()}
              />
              <strong className={S.name}>{name}</strong>
              <span className={S.role}>{role}</span>

              <div className={S.infoGroup}>
                <div className={S.infoRow}>
                  <span className={S.label}>시급</span>
                  <span className={S.value}>{wage.toLocaleString()}원</span>
                </div>
                <div className={S.infoRow}>
                  <span className={S.label}>연락처</span>
                  <span className={S.value}>{phone}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
