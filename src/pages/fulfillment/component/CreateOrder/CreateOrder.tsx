import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useMemo, useState } from "react";
import OriginLabel from "../../../../components/OriginLabel";
import { useNavigate } from "react-router-dom";
import { FacilityDto } from "dto/facility/facility.dto";
import { FormField } from "pages/User/components/FormField";
import CreateOrderDetails from "./CreateOrderDetails";
import SavingTable from "./SavingTable";
import { toast } from "react-toastify";
import { useCreateFacility } from "hooks/facility/useCreateFacility";
import { CreateFacilityDto } from "dto/facility/create-facility.dto";
import { useOrgunitTree } from "hooks/orgunit/useOrgunitTree";
import { TreeOrgunitDto } from "dto/orgunit/tree-orgunit.dto";

type OrgUnit = {
  id: string;
  name: string;
  lvl?: number;
  code?: string;
  namePath?: string[];
};

interface CreateOrderDialogProps {
  open: boolean;
  onClose: () => void;
  level1Options?: OrgUnit[];
  level2Options?: OrgUnit[];
  level3Options?: OrgUnit[];
  initialValues?: Partial<FacilityDto>;
  orgUnitId?: string;
  onSaved?: () => Promise<void>;
}

const initialFormState: FacilityDto = {
  version: 0,
  createdBy: "",
  updatedBy: null,
  createdDate: "",
  updatedDate: null,

  id: "",
  code: "",
  name: "",

  address: "",
  phone: "",
  email: null,

  area: 0,
  areaAdmin: null,

  idNumber: "",
  issueDate: null,
  issuePlace: "unassigned",

  ownerName: null,
  ownerPhoneNumber: null,

  facilityType: {
    id: "",
    code: "",
    name: "",
    description: null,
  },

  attr1: null,
  attr2: null,
  attr3: null,
  attr4: null,
  attr5: null,

  skuOpt: {
    id: "",
    code: "",
    name: "",
  },

  stateOpt: {
    id: "",
    code: "",
    name: "",
  },
  isException: false,

  orgUnit: null,
  note: null,

  establishmentDate: null,
  idIssueDate: null,

  sampleSource: null,
  labelingStandard: null,
};

const CreateOrder = ({
  open,
  onClose,
  level1Options = [],
  level2Options = [],
  level3Options = [],
  initialValues = {},
  orgUnitId,
  onSaved,
}: CreateOrderDialogProps) => {
  const [fileName, setFileName] = useState("hinhanh.png");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // selects hold IDs when using orgunit tree; fall back to names or ids when tree not available
  const [selectedLevel1, setSelectedLevel1] = useState<string>("");
  const [selectedLevel2, setSelectedLevel2] = useState<string>("");
  const [selectedLevel3, setSelectedLevel3] = useState<string>("");

  // main form (single source of truth for customer/general info)
  const [formData, setFormData] = useState<FacilityDto>(initialFormState);

  const [savedOrders, setSavedOrders] = useState<FacilityDto[]>([]);

  const navigate = useNavigate();

  const { mutateAsync: createFacilityAsync, isLoading: isCreating } =
    useCreateFacility();

  const orgunitQuery = useOrgunitTree();

  useEffect(() => {
    if (open) {
      orgunitQuery.refetch().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const usingOrgunitTree = Boolean(
    orgunitQuery.data &&
      Array.isArray(orgunitQuery.data) &&
      orgunitQuery.data.length > 0
  );

  // helper: recursively find a node by id in the tree
  const findNodeById = (
    nodes: TreeOrgunitDto[] | undefined,
    id: string | undefined
  ): TreeOrgunitDto | undefined => {
    if (!nodes || !id) return undefined;
    for (const n of nodes) {
      if (n.id === id) return n;
      if (n.children && (n.children as any).length) {
        const found = findNodeById(n.children as any, id);
        if (found) return found;
      }
    }
    return undefined;
  };

  // helper: recursively find a node by name in the tree
  const findNodeByName = (
    nodes: TreeOrgunitDto[] | undefined,
    name: string | undefined
  ): TreeOrgunitDto | undefined => {
    if (!nodes || !name) return undefined;
    for (const n of nodes) {
      if (n.name === name) return n;
      if (n.children && (n.children as any).length) {
        const found = findNodeByName(n.children as any, name);
        if (found) return found;
      }
    }
    return undefined;
  };

  // helper: resolve current selected orgUnit (deepest level) to {id,name}
  const resolveSelectedOrgUnitFromSelections = (): {
    id?: string;
    name?: string;
  } => {
    // using tree: selectedLevel values are ids
    if (usingOrgunitTree) {
      const id =
        selectedLevel3 || selectedLevel2 || selectedLevel1 || undefined;
      if (!id) return {};
      const node = findNodeById(orgunitQuery.data as TreeOrgunitDto[], id);
      return { id: node?.id, name: node?.name };
    }

    // fallback: selectedLevel values may be names or ids; try to resolve by checking options arrays
    const tryResolve = (val: string | undefined, arr?: OrgUnit[]) => {
      if (!val || !arr || arr.length === 0) return undefined;
      return arr.find((o) => o.id === val) || arr.find((o) => o.name === val);
    };

    // try deepest first
    if (selectedLevel3) {
      const found = tryResolve(selectedLevel3, level3Options);
      if (found) return { id: found.id, name: found.name };
    }
    if (selectedLevel2) {
      const found = tryResolve(selectedLevel2, level2Options);
      if (found) return { id: found.id, name: found.name };
    }
    if (selectedLevel1) {
      const found = tryResolve(selectedLevel1, level1Options);
      if (found) return { id: found.id, name: found.name };
    }

    // last fallback: if parent provided a single orgUnitId prop
    if (orgUnitId) {
      return { id: orgUnitId };
    }

    return {};
  };

  // level options derived from tree based on selection
  const level1Nodes: TreeOrgunitDto[] = useMemo(() => {
    if (!usingOrgunitTree) return [];
    // top-level nodes from API
    return orgunitQuery.data as TreeOrgunitDto[];
  }, [orgunitQuery.data, usingOrgunitTree]);

  const level2Nodes: TreeOrgunitDto[] = useMemo(() => {
    if (!usingOrgunitTree || !selectedLevel1) return [];
    const node = findNodeById(
      orgunitQuery.data as TreeOrgunitDto[],
      selectedLevel1
    );
    return (node?.children as unknown as TreeOrgunitDto[]) || [];
  }, [orgunitQuery.data, usingOrgunitTree, selectedLevel1]);

  const level3Nodes: TreeOrgunitDto[] = useMemo(() => {
    if (!usingOrgunitTree || !selectedLevel2) return [];
    const node = findNodeById(level2Nodes, selectedLevel2);
    return (node?.children as unknown as TreeOrgunitDto[]) || [];
  }, [level2Nodes, usingOrgunitTree, selectedLevel2]);

  // the final selected orgUnit id should be the deepest selected level's id (or undefined)
  const finalSelectedOrgUnitId = useMemo(() => {
    // if using tree we expect selectedLevelX to be ids
    if (selectedLevel3) return selectedLevel3;
    if (selectedLevel2) return selectedLevel2;
    if (selectedLevel1) return selectedLevel1;
    return "";
  }, [selectedLevel1, selectedLevel2, selectedLevel3]);

  const finalSelectedOrgUnitName = useMemo(() => {
    if (usingOrgunitTree && finalSelectedOrgUnitId) {
      const node = findNodeById(
        orgunitQuery.data as TreeOrgunitDto[],
        finalSelectedOrgUnitId
      );
      return node?.name || "";
    }
    // fallback (when not using tree): use selected values which may be names
    return selectedLevel3 || selectedLevel2 || selectedLevel1 || "";
  }, [
    usingOrgunitTree,
    finalSelectedOrgUnitId,
    selectedLevel1,
    selectedLevel2,
    selectedLevel3,
  ]);

  // --- rest of original handlers ---
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isException: e.target.checked }));
  };

  useEffect(() => {
    if (!open) return;

    setSelectedLevel1("");
    setSelectedLevel2("");
    setSelectedLevel3("");

    setFormData({
      ...initialFormState,
      code: initialValues.code ?? "",
      id: initialValues.id ?? "",
      issuePlace: initialValues.issuePlace ?? initialFormState.issuePlace,
    });

    setSavedOrders([]);
  }, [open, initialValues]);

  const isFormDirty = () => {
    const formDirty =
      JSON.stringify(formData) !== JSON.stringify(initialFormState);
    const selectsDirty =
      selectedLevel1 !== "" || selectedLevel2 !== "" || selectedLevel3 !== "";
    const tableDirty = savedOrders.length > 0;
    return formDirty || selectsDirty || tableDirty;
  };

  const handleDialogClose = (event: any, reason?: string) => {
    if (!isFormDirty()) {
      resetAllAndClose();
      return;
    }

    const confirmClose = window.confirm(
      "Bạn muốn tắt? Điều này sẽ xóa toàn bộ thông tin đã nhập trước đó?"
    );
    if (confirmClose) {
      resetAllAndClose();
    }
  };

  const resetAllAndClose = () => {
    setFormData(initialFormState);
    setSelectedLevel1("");
    setSelectedLevel2("");
    setSelectedLevel3("");
    setSavedOrders([]);
    onClose();
  };

  // receive snapshot from details
  const handleAddOrderFromDetails = (details: Partial<FacilityDto>) => {
    const snapshot: FacilityDto = JSON.parse(
      JSON.stringify({
        ...formData,
        ...details,
      })
    );
    const hasOrgUnitInDetails = !!(
      snapshot.orgUnit &&
      (snapshot.orgUnit.id || snapshot.orgUnit.name)
    );

    if (
      !hasOrgUnitInDetails &&
      (selectedLevel1 || selectedLevel2 || selectedLevel3 || orgUnitId)
    ) {
      // resolve selection into id + name by checking tree first, then fallback options
      const resolved = resolveSelectedOrgUnitFromSelections();

      if (resolved.id) {
        snapshot.orgUnit = {
          id: resolved.id,
          name: resolved.name || "",
        } as any;
      } else if (resolved.name) {
        // name-only fallback
        snapshot.orgUnit = { id: "", name: resolved.name } as any;
      } else {
        // last fallback: use prop orgUnitId if provided
        if (orgUnitId) {
          snapshot.orgUnit = { id: orgUnitId, name: "" } as any;
        }
      }
    }

    if ((!snapshot.skuOpt || !snapshot.skuOpt.id) && snapshot.code) {
      snapshot.skuOpt = snapshot.skuOpt?.id
        ? snapshot.skuOpt
        : ({
            id: "",
            code: snapshot.skuOpt?.code || snapshot.code,
            name: "",
          } as any);
    }

    snapshot.issuePlace = snapshot.issuePlace ?? "unassigned";

    setSavedOrders((prev) => [snapshot, ...prev]);
  };

  const handleRemoveFromTable = (index: number) => {
    setSavedOrders((prev) => prev.filter((_, i) => i !== index));
  };

  // validation
  const validateRow = (row: FacilityDto) => {
    const errs: string[] = [];
    const code = row.code || row.skuOpt?.code || "";
    if (!code) errs.push("SKU Fulfill (code) là bắt buộc");
    if (!row.name) errs.push("Tên khách hàng (name) là bắt buộc");
    if (!row.idNumber) errs.push("Order ID (idNumber) là bắt buộc");
    return errs;
  };

  // resolve an orgUnit id for a given row using available sources (tree -> props -> current selection -> orgUnitId prop)
  const getEffectiveOrgUnitIdForRow = (
    row: FacilityDto
  ): string | undefined => {
    // 1) if row already has id, use it
    if (row.orgUnit && (row.orgUnit as any).id) return (row.orgUnit as any).id;

    // 2) if row has a name, try to resolve it against tree first
    if (row.orgUnit && (row.orgUnit as any).name) {
      const name = (row.orgUnit as any).name;
      if (usingOrgunitTree) {
        const found = findNodeByName(
          orgunitQuery.data as TreeOrgunitDto[],
          name
        );
        if (found) return found.id;
      } else {
        // try fallback options arrays
        const found1 = level1Options.find(
          (o) => o.id === name || o.name === name
        );
        if (found1) return found1.id;
        const found2 = level2Options.find(
          (o) => o.id === name || o.name === name
        );
        if (found2) return found2.id;
        const found3 = level3Options.find(
          (o) => o.id === name || o.name === name
        );
        if (found3) return found3.id;
      }
    }

    // 3) try the current selects (deepest selected)
    const resolved = resolveSelectedOrgUnitFromSelections();
    if (resolved.id) return resolved.id;

    // 4) try the prop orgUnitId
    if (orgUnitId) return orgUnitId;

    // unable to determine
    return undefined;
  };

  const mapToCreateFacilityDto = (row: FacilityDto): CreateFacilityDto => {
    const effectiveOrgUnitId = getEffectiveOrgUnitIdForRow(row);

    const dto: any = {
      page: 0,
      size: 10,
      code: row.code || row.skuOpt?.code || "",
      skuCode: row.code || row.skuOpt?.code || "",
      orgUnitId: effectiveOrgUnitId,
      name: row.name || "",
      idNumber: row.idNumber || "",
      area: row.area ?? 0,
      isException: !!row.isException,
      phone: row.phone || "",
      address: row.address || "",
      labelingStandard: row.labelingStandard || "",
      // REQUIREMENT: ensure issuePlace is explicitly "unassigned" when creating.
      // This overrides any value that might come from initialValues or the logged-in user.
      issuePlace: "unassigned",
    };

    if (row.skuOpt?.id) {
      dto.skuOpt = { id: row.skuOpt.id };
      dto.skuId = row.skuOpt.id;
    } else if (row.skuOpt?.code) {
      dto.skuOpt = { code: row.skuOpt.code };
    }

    if (row.facilityType?.id) dto.facilityType = { id: row.facilityType.id };
    else if (row.facilityType?.code)
      dto.facilityType = { code: row.facilityType.code };

    if (row.stateOpt?.id) dto.stateOpt = { id: row.stateOpt.id };

    // Ensure orgUnit field exists (backend expects it). Prefer id.
    if (effectiveOrgUnitId) {
      dto.orgUnit = { id: effectiveOrgUnitId };
    } else if (row.orgUnit && (row.orgUnit as any).name) {
      // As last resort, include name only (backend may accept it)
      dto.orgUnit = { id: "", name: (row.orgUnit as any).name };
    } else {
      dto.orgUnit = { id: "" };
    }

    return dto as CreateFacilityDto;
  };

  const handleSaveAll = async () => {
    if (savedOrders.length === 0) {
      toast.warn("Chưa có đơn nào trong danh sách để lưu.");
      return;
    }

    // validate each row required fields first
    for (const row of savedOrders) {
      const errs = validateRow(row);
      if (errs.length) {
        toast.error(`Thiếu dữ liệu: ${errs.join(", ")} — dừng lưu.`);
        return;
      }
    }

    // ensure we can determine orgUnit.id for every row
    const unresolved: number[] = [];
    const preparedRows = savedOrders.map((row, idx) => {
      const effId = getEffectiveOrgUnitIdForRow(row);
      if (!effId) unresolved.push(idx);

      const resolvedName = effId
        ? (usingOrgunitTree
            ? findNodeById(orgunitQuery.data as TreeOrgunitDto[], effId)?.name
            : (
                level1Options.find((o) => o.id === effId) ||
                level2Options.find((o) => o.id === effId) ||
                level3Options.find((o) => o.id === effId)
              )?.name) ||
          (row.orgUnit as any)?.name ||
          ""
        : (row.orgUnit as any)?.name || "";

      return {
        ...row,
        orgUnit: { id: effId || "", name: resolvedName } as any,
      } as FacilityDto;
    });

    if (unresolved.length > 0) {
      toast.error(
        "Không thể xác định orgUnit.id cho một hoặc nhiều đơn. Vui lòng chọn OrgUnit (cấp phù hợp) trước khi lưu."
      );
      return;
    }

    // update savedOrders state to include resolved orgUnit ids
    setSavedOrders(preparedRows);

    try {
      for (const [idx, row] of preparedRows.entries()) {
        const dto = mapToCreateFacilityDto(row);
        const created = await createFacilityAsync(dto);
        console.debug(`Created facility ${idx}:`, created);
      }

      try {
        if (typeof onSaved === "function") {
          await onSaved();
        } else {
          console.warn(
            "CreateOrder: onSaved callback not provided — performing minimal stat refresh only."
          );
        }
      } catch (e) {
        console.warn("Error during onSaved callback:", e);
      }

      toast.success(`Đã lưu ${preparedRows.length} đơn hàng.`);
      resetAllAndClose();
    } catch (err: any) {
      console.error("Lỗi khi lưu đơn:", err);
      const msg =
        (err?.response?.data?.message as string) ||
        (err?.message as string) ||
        "Lưu đơn thất bại";
      toast.error(msg);
    }
  };

  // --- select handlers which reset deeper levels when parent changes ---
  const handleLevel1Change = (e: SelectChangeEvent<string>) => {
    const val = e.target.value as string;
    setSelectedLevel1(val);
    setSelectedLevel2("");
    setSelectedLevel3("");
  };

  const handleLevel2Change = (e: SelectChangeEvent<string>) => {
    const val = e.target.value as string;
    setSelectedLevel2(val);
    setSelectedLevel3("");
  };

  const handleLevel3Change = (e: SelectChangeEvent<string>) => {
    const val = e.target.value as string;
    setSelectedLevel3(val);
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          padding: 2,
          overflowX: "hidden",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        },
      }}
    >
      <Typography
        sx={{
          display: "flex",
          color: "black",
          fontWeight: "bold",
          fontSize: "20px",
          mb: 2,
        }}
      >
        THÊM ORDER MỚI
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", px: 1 }}>
        <Grid
          container
          spacing={3}
          sx={{
            width: "100%",
            maxWidth: 1300,
            margin: "0 auto",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                backgroundColor: "white",
                padding: 3,
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
              }}
            >
              {/* LEVEL 1 */}
              <FormControl size="small" fullWidth>
                <InputLabel id="level1-label">Loại cửa hàng</InputLabel>
                <Select
                  labelId="level1-label"
                  value={selectedLevel1}
                  label="Loại cửa hàng"
                  onChange={handleLevel1Change}
                >
                  {usingOrgunitTree ? (
                    level1Nodes.length > 0 ? (
                      level1Nodes.map((opt) => (
                        <MenuItem key={opt.id} value={opt.id}>
                          {opt.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="" disabled>
                        Không có dữ liệu
                      </MenuItem>
                    )
                  ) : level1Options.length > 0 ? (
                    level1Options.map((opt) => (
                      // fallback keeps old behavior of showing name but stores id/value where possible
                      <MenuItem key={opt.id} value={opt.id || opt.name}>
                        {opt.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      Không có dữ liệu
                    </MenuItem>
                  )}
                </Select>
              </FormControl>

              {/* LEVEL 2 - disabled until level1 selected */}
              <FormControl size="small" fullWidth>
                <InputLabel id="level2-label">Quốc gia</InputLabel>
                <Select
                  labelId="level2-label"
                  value={selectedLevel2}
                  label="Quốc gia"
                  onChange={handleLevel2Change}
                  disabled={!selectedLevel1}
                >
                  {usingOrgunitTree ? (
                    selectedLevel1 ? (
                      level2Nodes.length > 0 ? (
                        level2Nodes.map((opt) => (
                          <MenuItem key={opt.id} value={opt.id}>
                            {opt.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>
                          Không có dữ liệu
                        </MenuItem>
                      )
                    ) : (
                      <MenuItem value="" disabled>
                        Vui lòng chọn Loại cửa hàng trước
                      </MenuItem>
                    )
                  ) : level2Options.length > 0 ? (
                    level2Options.map((opt) => (
                      <MenuItem key={opt.id} value={opt.id || opt.name}>
                        {opt.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      Không có dữ liệu
                    </MenuItem>
                  )}
                </Select>
              </FormControl>

              {/* LEVEL 3 - disabled until level2 selected */}
              <FormControl size="small" fullWidth>
                <InputLabel id="level3-label">Cửa hàng</InputLabel>
                <Select
                  labelId="level3-label"
                  value={selectedLevel3}
                  label="Cửa hàng"
                  onChange={handleLevel3Change}
                  disabled={!selectedLevel2}
                >
                  {usingOrgunitTree ? (
                    selectedLevel2 ? (
                      level3Nodes.length > 0 ? (
                        level3Nodes.map((opt) => (
                          <MenuItem key={opt.id} value={opt.id}>
                            {opt.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>
                          Không có dữ liệu
                        </MenuItem>
                      )
                    ) : (
                      <MenuItem value="" disabled>
                        Vui lòng chọn Quốc gia trước
                      </MenuItem>
                    )
                  ) : level3Options.length > 0 ? (
                    level3Options.map((opt) => (
                      <MenuItem key={opt.id} value={opt.id || opt.name}>
                        {opt.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      Không có dữ liệu
                    </MenuItem>
                  )}
                </Select>
              </FormControl>

              <FormField
                label="SKU Fulfill"
                name="code"
                type="text"
                value={formData.code || ""}
                onChange={handleChange}
              />

              <FormField
                label="Nhập Order ID"
                name="idNumber"
                type="text"
                value={formData.idNumber || ""}
                onChange={handleChange}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isException || false}
                    onChange={handleCheckboxChange}
                  />
                }
                label={
                  <Typography
                    sx={{ fontSize: 16, fontWeight: "bold", color: "black" }}
                  >
                    Ưu tiên làm đơn này
                  </Typography>
                }
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                backgroundColor: "white",
                padding: 3,
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, my: 2 }}
              >
                <Link
                  target="_blank"
                  underline="hover"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "black",
                    fontWeight: 500,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      color: "red",
                      transform: "translateY(-1px)",
                      textDecoration: "underline",
                    },
                    cursor: "pointer",
                  }}
                >
                  <OriginLabel
                    label="Hàng sản xuất tại Việt Nam"
                    icon="/img/flag/VietNamflag.jpg"
                  />
                </Link>
              </Box>

              <Divider sx={{ backgroundColor: "#ccc", my: 1 }} />

              <Typography sx={{ color: "black", fontWeight: "bold" }}>
                THÔNG TIN KHÁCH HÀNG
              </Typography>

              <FormField
                label="Tên khách hàng"
                name="name"
                type="text"
                value={formData.name || ""}
                onChange={handleChange}
              />
              <FormField
                label="Địa chỉ khách hàng"
                name="address"
                type="text"
                value={formData.address || ""}
                onChange={handleChange}
              />
              <FormField
                label="Số điện thoại"
                name="phone"
                type="text"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <CreateOrderDetails
              facility={formData}
              open={open}
              onAddOrder={handleAddOrderFromDetails}
            />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ backgroundColor: "#ccc", my: 3, mt: 10 }} />

      <Box sx={{ px: 2, pb: 3 }}>
        <SavingTable items={savedOrders} onRemove={handleRemoveFromTable} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <Button
          onClick={handleSaveAll}
          disabled={isCreating}
          sx={{
            borderRadius: "50px",
            width: "20%",
            backgroundColor: isCreating ? "#ef9a9a" : "orangered",
            color: "white",
            ":hover": { backgroundColor: "tomato" },
          }}
        >
          {isCreating ? "ĐANG LƯU..." : "LƯU"}
        </Button>
      </Box>
    </Dialog>
  );
};

export default CreateOrder;
