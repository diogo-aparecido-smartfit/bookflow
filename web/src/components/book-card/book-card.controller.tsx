import type { Book } from "@/types/models";
import { STATUS_BADGE_MAP } from "@/utils/utils";

export function useBookCard(book: Book) {
  const statusBadge = STATUS_BADGE_MAP[book.status];

  return {
    statusBadge,
  };
}
