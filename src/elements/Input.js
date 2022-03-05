import React from "react";
import styled from "styled-components";
import { Text } from ".";

const Input = (props) => {
  const {
    _onChange,
    placeholder,
    type,
    value,
    label,
    width,
    disable,
    bg,
    _onKeyDown,
    _ref,
    _onFocus,
    border,
    height,
    margin,
  } = props;

  const styles = {
    width,
    bg,
    height,
    margin,
    border,
  };

  return (
    <>
      {label && <Text margin="0px">{label}</Text>}
      <ElInput
        {...styles}
        type={type}
        onChange={_onChange}
        placeholder={placeholder}
        value={value}
        disabled={disable}
        onKeyDown={_onKeyDown}
        ref={_ref}
        onFocus={_onFocus}
        border-radius
      />
    </>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  width: "100%",
  _onChange: () => {},
  _onClick: () => {},
  disable: false,
  bg: "white",
  _onKeyDown: () => {},
  _ref: () => {},
  _onFocus: () => {},
  padding: "12px 4px",
  border: false,
  Radius: "5px",
  height: "40px",
  margin: false,
};
const ElInput = styled.input`
  border: ${(props) => props.border};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: ${(props) => props.border};
  border-radius: ${(props) => props.Radius};
  background-color: ${(props) => props.bg};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
`;
export default Input;

// ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
