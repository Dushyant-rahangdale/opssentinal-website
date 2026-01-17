export type DocsVersion = {
  id: string;
  label: string;
  isDefault?: boolean;
};

export const DOC_VERSIONS: DocsVersion[] = [
  { id: "v1", label: "v1", isDefault: true },
];

export const DEFAULT_DOC_VERSION = DOC_VERSIONS.find(v => v.isDefault)?.id || "v1";
