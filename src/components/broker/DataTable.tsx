"use client";

import { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Column definition
export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  render?: (row: T, index: number) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  isLoading?: boolean;
  // Pagination
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onRowClick,
  emptyMessage = "No data available",
  isLoading = false,
  currentPage = 1,
  totalPages = 1,
  totalItems,
  onPageChange,
  showPagination = true,
}: DataTableProps<T>) {
  return (
    <div className="flex flex-col h-full">
      {/* Table Container */}
      <div className="flex-1 overflow-auto">
        <table className="w-full min-w-[600px]">
          {/* Header */}
          <thead className="sticky top-0 bg-[var(--bg-surface)]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className="px-4 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider border-b border-[var(--bg-border)]"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="bg-white divide-y divide-[var(--bg-border)]">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center">
                  <div className="flex items-center justify-center gap-2 text-[var(--text-secondary)]">
                    <span className="w-5 h-5 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-[var(--text-secondary)]">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={`h-[var(--table-row-height)] ${
                    onRowClick
                      ? "cursor-pointer hover:bg-[var(--bg-surface)] transition-colors"
                      : ""
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-3 text-sm text-[var(--text-primary)]"
                    >
                      {col.render
                        ? col.render(row, rowIndex)
                        : (row as Record<string, unknown>)[col.key] as ReactNode}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--bg-border)] bg-white">
          <p className="text-sm text-[var(--text-secondary)]">
            {totalItems !== undefined && `${totalItems} items total`}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage <= 1}
              className="p-2 rounded-md border border-[var(--bg-border)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--bg-surface)] transition-colors"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="text-sm text-[var(--text-primary)]">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="p-2 rounded-md border border-[var(--bg-border)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--bg-surface)] transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
