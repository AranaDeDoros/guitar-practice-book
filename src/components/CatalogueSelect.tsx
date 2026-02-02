import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { JSX } from "react";

interface CatalogueSelectProps {
  catalog: Array<{ label: string; value: string }>;
  value: Array<{ label: string; value: string }> | null;
  onChange: (value: any) => void;
  isLoading?: boolean;
  isMulti?: boolean;
  placeholder?: string;
  isCreateTable?: boolean;
}

export default function CatalogueSelect({
  catalog,
  value,
  onChange,
  isLoading,
  isMulti,
  placeholder,
  isCreateTable = false,
}: CatalogueSelectProps): JSX.Element {
  const Component = isCreateTable ? CreatableSelect : Select;
  return (
    <Component
      options={catalog}
      value={value}
      onChange={onChange}
      isLoading={isLoading}
      isMulti={isMulti}
      isClearable
      placeholder={placeholder}
      className="text-black"
    />
  );
}
