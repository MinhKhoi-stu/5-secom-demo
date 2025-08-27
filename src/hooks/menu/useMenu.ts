import { useEffect, useMemo, useState } from "react";
import { menuAPI } from "api/menu"; // <-- chỉnh path nếu bạn export menuAPI ở nơi khác

export type RawMenu = {
  id: string;
  code: string;
  name: string;
  url?: string | null;
  icon?: string | null;
  orderNo?: string | null;
  parentId?: string | null;
};

export type MenuNode = RawMenu & {
  children?: MenuNode[];
};

const dedupeMenus = (items: RawMenu[] = []): RawMenu[] => {
  const seenById = new Set<string>();
  const seenByKey = new Set<string>();
  const out: RawMenu[] = [];

  for (const it of items) {
    if (!it) continue;
    const id = it.id;
    if (id) {
      if (seenById.has(id)) {
        continue;
      }
      seenById.add(id);
      out.push(it);
      continue;
    }

    const key = `${it.code ?? ""}::${it.url ?? ""}::${it.parentId ?? ""}`;
    if (seenByKey.has(key)) {
      continue;
    }
    seenByKey.add(key);
    out.push(it);
  }

  return out;
};

export function useMenu() {
  const [raw, setRaw] = useState<RawMenu[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    menuAPI
      .menuLogin()
      .then((res: any) => {
        // menuAPI.menuLogin() có thể trả data trực tiếp hoặc { data: [...] }
        const items: RawMenu[] = res?.data ?? res;
        const arr = Array.isArray(items) ? items : [];
        // dedupe before setting to state
        const unique = dedupeMenus(arr);
        if (mounted) setRaw(unique);
      })
      .catch((e) => {
        if (mounted) setError(e);
        console.error("menu login error", e);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const tree: MenuNode[] = useMemo(() => {
    if (!raw || raw.length === 0) return [];

    const map = new Map<string | undefined, MenuNode>();
    raw.forEach((r) => {
      map.set(r.id, { ...r, children: [] });
    });

    const roots: MenuNode[] = [];
    map.forEach((node) => {
      if (node.parentId && map.has(node.parentId)) {
        map.get(node.parentId)!.children!.push(node);
      } else {
        roots.push(node);
      }
    });

    const sortNodes = (arr: MenuNode[]) => {
      arr.sort((a, b) => {
        const ao = parseInt(a.orderNo ?? "0", 10);
        const bo = parseInt(b.orderNo ?? "0", 10);
        if (!isNaN(ao) || !isNaN(bo)) {
          if (ao !== bo) return ao - bo;
        }
        return (a.name ?? "").localeCompare(b.name ?? "");
      });
      arr.forEach((n) => n.children && sortNodes(n.children));
    };

    sortNodes(roots);
    return roots;
  }, [raw]);

  const findByCode = (code?: string | null) => {
    if (!code) return null;
    return raw.find((r) => r.code === code) ?? null;
  };

  const getChildrenOfParentCode = (code?: string | null) => {
    if (!code) return [];
    const parent = findByCode(code);
    if (!parent) return [];
    return raw.filter((r) => r.parentId === parent.id);
  };

  return {
    raw,
    tree,
    loading,
    error,
    findByCode,
    getChildrenOfParentCode,
  };
}

export default useMenu;
