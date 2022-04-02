import React from "react";
import styled from "styled-components";

import ArrowIcon from "./Images/Dropdown_ArrowIcon.svg";
const Dropdown = (props) => {
  // props로 리스트목록을 받아오고, useState로 모달 및 클릭 관리
  const { dropdownList, myDropdownList, width, background, fontcolor } = props;

  const [isDropdown, setIsDropdown] = React.useState();
  const [clickedDropdown, setClickedDropdown] = React.useState();

  const styles = { width, background, fontcolor };

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
        width={width}
        onClick={() => {
          setIsDropdown(!isDropdown);
        }}
      >
        {dropdownList ? (
          <>
            <DropdownInput>
              <div>
                {dropdownList[clickedDropdown]
                  ? dropdownList[clickedDropdown]
                  : props.children}
              </div>
              <img src={ArrowIcon} alt="드롭다운화살표"></img>
            </DropdownInput>
            <DropdownModal
              {...styles}
              isDropdown={isDropdown}
              clickedDropdown={clickedDropdown}
            >
              {dropdownList.map((e, i) => (
                <DdEl
                  key={i}
                  i={i}
                  length={dropdownList.length}
                  onClick={() => {
                    setClickedDropdown(i);
                    props.getCategory(i);
                  }}
                  {...styles}
                >
                  {e}
                </DdEl>
              ))}
            </DropdownModal>
          </>
        ) : (
          <>
            {/* 회원정보 드롭다운일 떄 */}
            <DropdownInput>
              <div>
                {myDropdownList[clickedDropdown]
                  ? myDropdownList[clickedDropdown]
                  : props.children}
              </div>
              <img src={ArrowIcon} alt="드롭다운화살표"></img>
            </DropdownInput>
            <DropdownModal {...styles} isDropdown={isDropdown}>
              {myDropdownList.map((e, i) => (
                <DdEl
                  key={i}
                  i={i + 1}
                  length={myDropdownList.length}
                  onClick={() => {
                    setClickedDropdown(i);
                    props.changeGoal(i);
                  }}
                  {...styles}
                >
                  {e}
                </DdEl>
              ))}
            </DropdownModal>
          </>
        )}
      </DropdownBtn>
    </>
  );
};

Dropdown.defaultProps = {
  width: "285px",
  background: "",
  fontcolor: "",
};

const DropdownBtn = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => (props.width ? props.width : "285px")};
  // height: 34px;
  height: 40px;
  border-radius: 8px;
  background-color: #eaecef;
  color: #878e95;
  position: relative;
  cursor: pointer;
  padding: 0 12px;
`;

const DropdownInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  font-size: 16px;
`;
const DropdownModal = styled.div`
  position: absolute;
  width: ${(props) => props.width};
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
  font-size: 16px;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.background};
    color: ${(props) => props.fontcolor};
    border-radius: 8px;
    /* //처음
    border-top-left-radius: ${(props) => props.topleft};
    border-top-right-radius: ${(props) => props.topright};
    // 마지막
    border-bottom-left-radius: ${(props) => props.bottomleft};
    border-bottom-right-radius: ${(props) => props.bottomright}; */
  }
`;

export default Dropdown;
