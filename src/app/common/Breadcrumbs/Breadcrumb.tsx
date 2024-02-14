"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface BreadcrumbProps {
  pageName: string;
  totalCount?: number;
  pageUrl?: any;
  subHead?: any;
  urls?: { title: string; url: string }[];
}
const Breadcrumb = ({
  pageName,
  totalCount,
  pageUrl,
  subHead,
}: BreadcrumbProps) => {
  const router = useRouter();

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
        {(totalCount || totalCount == 0) && ` (${totalCount})`}
      </h2>
      <nav>
        <ol className="flex items-center gap-2"></ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
