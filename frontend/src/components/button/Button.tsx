import { BsArrowDown } from "react-icons/bs";

import "./button.scss";

interface ChildrenType {
  className?: string;
}

export default function Button({ className }: ChildrenType) {
  return (
    <button className={"arrow-btn " + (className ? className : "")}>
      <BsArrowDown />
    </button>
  );
}
