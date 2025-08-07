import {OrgunitDto} from "dto/orgunit/orgunit.dto";

type OrgUnitNode = OrgunitDto & {
  children?: OrgUnitNode[];
};

export const OrgunitTree = (orgUnits: OrgunitDto[]): OrgUnitNode[] => {
  const map = new Map<string, OrgUnitNode>();
  const roots: OrgUnitNode[] = [];

  orgUnits.forEach((unit) => {
    map.set(unit.id, { ...unit, children: [] });
  });

  orgUnits.forEach((unit) => {
    const currentNode = map.get(unit.id)!;
    const path = unit.namePath;

    if (path.length > 1) {
      const parentName = path[1]; 
      const parentNode = [...map.values()].find((node) => node.name === parentName);
      if (parentNode) {
        parentNode.children?.push(currentNode);
      }
    } else {
      roots.push(currentNode);
    }
  });

  return roots;
};

export default OrgunitTree;
