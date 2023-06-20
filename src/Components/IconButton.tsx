import { Button } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

type ButtonIconType = {
  onClick?: () => void;
  Icon: IconType;
  isActive?: boolean;
  color?: string;
  children?: React.ReactNode;
};

const activeButtonStyle = {
  padding: "5px",
  bg: "transparent",
  margin: "5px",
  border: "none",
  cursor: "pointer",
  fontSize: "0.7rem",
  fontWeight: "bold",
  fontFamily: "sans-serif",
  color: "red",
  transition: "all 0.2s ease-in-out",
  ":hover": {
    transform: "scale(1.05)",
    boxShadow: "0 0 10px #66ccff",
  },
};

const inactiveButtonStyle = {
  padding: "5px",
  margin: "5px",
  bg: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "0.7rem",
  fontFamily: "sans-serif",
  transition: "all 0.2s ease-in-out",
  ":hover": {
    transform: "scale(1.05)",
  },
};

export const IconButton = ({
  Icon,
  isActive,
  color,
  children,
  onClick,
}: ButtonIconType) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      sx={isActive ? activeButtonStyle : inactiveButtonStyle}
      color={color ?? "#66ccff"}
      onClick={handleClick}
    >
      <Icon />
      {children}
    </Button>
  );
};
