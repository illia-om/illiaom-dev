import "server-only";
import content from "@/lib/cms/static-content.json";
import { type CvContent, cvContent } from "./content.scheme";

export function loadStaticContent(): CvContent {
  const parsedContent = cvContent.parse(content);

  return parsedContent;
}
