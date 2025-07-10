import styled from "@emotion/styled";
import { Button, css } from "@mui/material";
import { ReactElement } from "react";
import { AppProps, FuncItemProps } from "./ButtonPropsType";
import { EllipsisCase } from "../../layouts/Layouts";
import { Theme, useTheme } from "@emotion/react";

export function AppItem(props: AppProps) {
  const { className, icon, label, caseWidth, func, ...other } = props;
  const theme = useTheme();

  return (
    <AppCase theme={theme} caseWidth={caseWidth} onClick={func}>
      <IconBox theme={theme} className={className} {...other}>
        {icon}
      </IconBox>
      <AppName theme={theme} text={label} testAlign="center" width={60} />
    </AppCase>
  );
}

const AppCase = styled.div<{ theme: Theme; caseWidth?: string }>(
  ({ theme, caseWidth = "100%" }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: ${caseWidth};
    height: 100%;

    color: ${theme.mode.textPrimary};
  `,
);

const IconBox = styled.div<{ theme: Theme; width?: number; height?: number }>(
  ({ theme, width = 50, height = 50 }) => css`
    width: ${width}px;
    height: ${height}px;
    flex-shrink: 0;
    margin-bottom: 10px;
    border-radius: 14px;

    svg {
      width: ${width}px;
      height: ${width}px;
      fill: ${theme.mode.textPrimary};
      transition: fill 0.2s;

      &:hover {
        fill: ${theme.mode.textAccent};
      }
    }
  `,
);

const AppName = styled(EllipsisCase)<{ theme: Theme }>(
  ({ theme }) => css`
    font-family: ${theme.mode.font.button};
    font-size: 15px;
  `,
);

export function FuncItem(props: FuncItemProps): ReactElement {
  const { className, label, func, ...other } = props;
  const theme = useTheme();

  return (
    <StyledFuncButton
      theme={theme}
      className={className}
      onClick={func}
      {...other}
    >
      {label}
    </StyledFuncButton>
  );
}

export const StyledFuncButton = styled(Button)<{
  theme: Theme;
}>(
  ({ theme }) => css`
    font-family: ${theme.mode.font.button};
    font-weight: 800;
    background-color: ${theme.mode.buttonBackground};

    color: ${theme.mode.textPrimary};

    &:hover {
      background-color: ${theme.mode.buttonActiveBackground};
    }

    &:focus {
      outline: none;
    }

    transition: background 0.8s;
  `,
);
