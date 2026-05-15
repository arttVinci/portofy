import { useState } from "react";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PiCertificate } from "react-icons/pi";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { CustomPagination } from "@/components/dashboard/common/Pagination";

import { Skeleton } from "@/components/ui/skeleton";
import type { AchievementResponse } from "@/@types";
import ShowcaseCard from "@/components/dashboard/common/ShowcaseCard";

interface AchievementListSectionProps {
  achievements: AchievementResponse[];
  isLoading: boolean;
  onAdd: () => void;
  onEdit: (achievement: AchievementResponse) => void;
  onDelete: (id: string) => void;
  onViewDetail: (achievement: AchievementResponse) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function CardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border bg-card overflow-hidden">
      <Skeleton className="aspect-[16/9] w-full" />
      <div className="p-4 flex flex-col gap-2.5">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
        <div className="border-t pt-2.5">
          <Skeleton className="h-6 w-16 ml-auto" />
        </div>
      </div>
    </div>
  );
}

export function AchievementListSection({
  achievements,
  isLoading,
  onAdd,
  onEdit,
  onDelete,
  onViewDetail,
  currentPage,
  totalPages,
  onPageChange,
}: AchievementListSectionProps) {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = achievements.filter(
    (a) =>
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.organization.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Cari achievement..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-9 text-sm"
          />
        </div>
        <Button
          size="sm"
          onClick={onAdd}
          className="gap-1.5 ml-auto shrink-0 cursor-pointer"
        >
          <PlusIcon className="size-3.5" />
          Tambah Achievement
        </Button>
      </div>

      {/* Count */}
      {!isLoading && (
        <p className="text-xs text-muted-foreground">
          {search
            ? `${filtered.length} dari ${achievements.length} achievement`
            : `${achievements.length} achievement`}
        </p>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((achievement, index) => (
            <ShowcaseCard
              i={index}
              key={achievement.id}
              data={achievement}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              onEdit={(data) => {
                onEdit(data as AchievementResponse);
              }}
              onDelete={(id) => setDeleteId(id)}
              onViewDetail={(data) => {
                onViewDetail(data as AchievementResponse);
              }}
            />
          ))}
        </div>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PiCertificate />
            </EmptyMedia>
            <EmptyTitle>No Achievements Yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created any achievements yet. Get started by
              creating your first achievement.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button className="cursor-pointer" onClick={onAdd}>
              Create Project
            </Button>
          </EmptyContent>
        </Empty>
      )}
      {achievements?.length > 0 && (
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}

      {/* Delete confirm */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus achievement ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak bisa dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
              onClick={() => {
                if (deleteId) onDelete(deleteId);
                setDeleteId(null);
              }}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
