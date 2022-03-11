import React from "react";
import styled from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";

const Dropdown = (props) => {
  // props로 리스트목록을 받아오고, useState로 모달 및 클릭 관리
  const { dropdownList } = props;
  const [isDropdown, setIsDropdown] = React.useState();
  const [clickedDropdown, setClickedDropdown] = React.useState();

  // 드롭다운 바깥쪽 클릭시 창닫기 구현
  const handleClose = (e) => {
    if (isDropdown) {
      setIsDropdown(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });

  return (
    <>
      <DropdownBtn
        onClick={() => {
          setIsDropdown(!isDropdown);
        }}
      >
        <DropdownInput>
          <div>
            {dropdownList[clickedDropdown]
              ? dropdownList[clickedDropdown]
              : props.children}
          </div>
          <IoMdArrowDropdown style={{ color: "#4a5056" }}></IoMdArrowDropdown>
        </DropdownInput>
        <DropdownModal isDropdown={isDropdown}>
          {dropdownList.map((e, i) => (
            <DdEl
              key={i}
              i={i}
              length={dropdownList.length}
              onClick={() => {
                setClickedDropdown(i);
                props.getCategory(i);
              }}
            >
              {e}
            </DdEl>
          ))}
        </DropdownModal>
      </DropdownBtn>
    </>
  );
};

const DropdownBtn = styled.div`
  display: flex;
  align-items: center;
  width: 285px;
  // height: 34px;
  height: 40px;
  border-radius: 8px;
  background-color: #eaecef;
  color: #878e95;
  position: relative;
  cursor: pointer;
  padding: 0 20px;
`;

const DropdownInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
const DropdownModal = styled.div`
  position: absolute;
  width: 285px;
  height: 240px;
  background: #f8f9fa;
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  top: 38px;
  right: 0px;
  z-index: 2;
  display: ${(props) => (props.isDropdown ? null : "none")};
`;

const DdEl = styled.div`
  height: ${(props) => 240 / props.length + "px"};
  display: flex;
  align-items: center;
  padding-left: 16px;
  border-bottom: ${(props) =>
    props.i === props.length - 1 ? "" : "1px solid #f1f3f5"};
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
`;
export default Dropdown;