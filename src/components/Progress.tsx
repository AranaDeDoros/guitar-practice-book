import { MeterGroup } from "primereact/metergroup";
import { ProgressEnum } from "../enums/ProgressEnum";
import { JSX } from "react";

interface ProgressProps {
  level: number;
}

export function Progress({ level }: ProgressProps): JSX.Element {
  const selectedValue = Object.values(ProgressEnum).find(
    (p) => p.value === level,
  );

  const meterValues = selectedValue ? [selectedValue] : [];

  return (
    <div className="card flex justify-content-center">
      <MeterGroup values={meterValues} max={100} />
    </div>
  );
}
