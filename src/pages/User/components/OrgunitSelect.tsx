import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export type OrgUnitNode = {
  id: string;
  name: string;
  children?: OrgUnitNode[];
};

type Props = {
  data: OrgUnitNode[];
  onSelect: (unit: OrgUnitNode) => void;
};

const MultiLevelMenu: React.FC<Props> = ({ data, onSelect }) => {
  const [menus, setMenus] = useState<
    { anchorEl: HTMLElement | null; items: OrgUnitNode[] }[]
  >([]);

  const openMenu = (level: number, anchorEl: HTMLElement, children: OrgUnitNode[]) => {
    const newMenus = menus.slice(0, level);
    newMenus.push({ anchorEl, items: children });
    setMenus(newMenus);
  };

  const closeMenusFromLevel = (level: number) => {
    setMenus((prev) => prev.slice(0, level));
  };

  const handleClickLabel = (item: OrgUnitNode) => {
    onSelect(item); // gửi request chọn đơn vị
    setMenus([]);   // đóng menu
  };

  const handleClickArrow = (
    e: React.MouseEvent<HTMLElement>,
    level: number,
    children?: OrgUnitNode[]
  ) => {
    e.stopPropagation(); // tránh click lan sang label
    if (children && children.length > 0) {
      openMenu(level + 1, e.currentTarget, children);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={(e) => openMenu(0, e.currentTarget, data)}
      >
        Chọn khu vực
      </Button>

      {menus.map((menu, level) => (
        <Menu
          key={level}
          anchorEl={menu.anchorEl}
          open={Boolean(menu.anchorEl)}
          onClose={() => closeMenusFromLevel(level)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          {menu.items.map((item) => (
            <MenuItem key={item.id} onClick={() => handleClickLabel(item)}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <ListItemText primary={item.name} />
                {item.children && item.children.length > 0 && (
                  <IconButton
                    size="small"
                    onClick={(e) => handleClickArrow(e, level, item.children)}
                  >
                    <ArrowRightIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </MenuItem>
          ))}
        </Menu>
      ))}
    </>
  );
};

export default MultiLevelMenu;
