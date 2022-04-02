const fontWeight = {
  Regular: 400,
  Medium: 500,
  Bold: 700,
};

const colors = {
  gray200: "#EAECEF",
  gray700: "#4A5056",
  gray900: "#222529",
};

const device = {
  mobile: `@media screen and (max-width: 767px)`,
  tablet: `@media screen and (max-width: 1024px)`,
};

const common = {
  is_flex: `
      display: flex;
      justify-contents: center;
    `,
  flexCenter: `
      display: flex;
      justify-contents: center;
      align-items: center;
    `,
  flexCenterColumn: `
      display: flex;
      flex-direction: column;
      justify-contents: center;
      align-items: center;
    `,
};

const theme = {
  device,
  colors,
  common,
};

export default theme;
// 사용법
// 스타일드 컴포넌트에서
// ${({ theme }) => theme.common.flexCenterColumn};
//  color: ${({ theme }) => theme.colors.grey};
