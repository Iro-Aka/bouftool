import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { Box, type SxProps, type Theme } from "@mui/material";
import type React from "react";
import { useState } from "react";
import { StackRow } from "../Layout/StackRow";

export interface TreeNode {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  indicatorColor?: string;
  children?: TreeNode[];
  defaultExpanded?: boolean;
  onClick?: () => void;
  actions?: React.ReactNode;
}

interface TreeItemProps {
  node: TreeNode;
  isLast: boolean;
  depth: number;
  disableCollapse?: boolean;
}

interface TreeViewProps {
  nodes: TreeNode[];
  sx?: SxProps<Theme>;
}

export const TreeItem: React.FC<TreeItemProps> = ({ node, isLast, depth, disableCollapse }) => {
  const [expanded, setExpanded] = useState(node.defaultExpanded ?? false);
  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    if (disableCollapse) {
      return;
    }
    if (hasChildren) {
      setExpanded(!expanded);
    }
    node.onClick?.();
  };

  const isRoot = depth === 0;

  return (
    <Box
      component="li"
      sx={{
        position: "relative",
        listStyle: "none",
      }}
    >
      {!isRoot && (
        <>
          <Box
            sx={{
              position: "absolute",
              left: -15,
              top: -8,
              width: 2,
              height: isLast ? 30 : "calc(100% + 8px)",
              bgcolor: "divider",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              left: isLast ? -15 : -13,
              top: hasChildren ? 26 : 22,
              width: 24,
              height: 2,
              bgcolor: "divider",
            }}
          />
        </>
      )}

      <Box
        onClick={handleToggle}
        sx={{
          position: "relative",
          borderRadius: 1,
          m: 1,
          cursor: "pointer",
          transition: "background-color 0.2s ease",
          "&:hover": {
            bgcolor: "action.hover",
          },
          ...(node.indicatorColor && {
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 3,
              borderRadius: "8px 0 0 8px",
              bgcolor: node.indicatorColor,
            },
          }),
        }}
      >
        <Box
          sx={{
            p: 1,
            bgcolor: hasChildren ? "surface.150" : "surface.250",
            borderRadius: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <StackRow sx={{ "&&": { gap: 0 } }}>
            {hasChildren && !disableCollapse ? (
              expanded ? (
                <ExpandMore sx={{ color: "text.secondary", fontSize: 20 }} />
              ) : (
                <ChevronRight sx={{ color: "text.secondary", fontSize: 20 }} />
              )
            ) : null}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
                flexShrink: 0,
              }}
            >
              {node.icon}
            </Box>

            <Box
              sx={{
                flex: 1,
                fontSize: 15,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              {node.label}
            </Box>
          </StackRow>

          {node.actions && node.actions}
        </Box>
      </Box>

      {hasChildren && expanded && (
        <Box
          component="ul"
          sx={{
            position: "relative",
            listStyle: "none",
            m: 0,
            p: 0,
            pl: 5,
          }}
        >
          {node.children?.map((child, index) => (
            <TreeItem
              key={child.id}
              node={child}
              isLast={index === (node.children?.length ?? 0) - 1}
              depth={depth + 1}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export const TreeView: React.FC<TreeViewProps> = ({ nodes, sx }) => {
  return (
    <Box
      sx={{
        ...sx,
      }}
    >
      <Box
        component="ul"
        sx={{
          listStyle: "none",
          m: 0,
          p: 0,
        }}
      >
        {nodes.map((node, index) => (
          <TreeItem key={node.id} node={node} isLast={index === nodes.length - 1} depth={0} />
        ))}
      </Box>
    </Box>
  );
};
