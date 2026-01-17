import { redirect } from "next/navigation";
import { DEFAULT_DOC_VERSION } from "@/lib/docs/versions";

export default function DocsRedirectPage() {
  redirect(`/docs/${DEFAULT_DOC_VERSION}`);
}
