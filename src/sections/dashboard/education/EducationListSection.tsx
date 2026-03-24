import { useState } from "react";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Skeleton } from "@/components/ui/skeleton";
import type { EducationResponse } from "@/@types";
import Card from "@/components/dashboard/Card";

interface EducationListSectionProps {
  educations: EducationResponse[];
  isLoading: boolean;
  onAdd: () => void;
  onEdit: (education: EducationResponse) => void;
  onDelete: (id: string) => void;
  onViewDetail: (education: EducationResponse) => void;
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

export function EducationListSection({
  educations,
  isLoading,
  onAdd,
  onEdit,
  onDelete,
  onViewDetail,
}: EducationListSectionProps) {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = educations.filter(
    (e) =>
      !search ||
      e.institution.toLowerCase().includes(search.toLowerCase()) ||
      e.degree.toLowerCase().includes(search.toLowerCase()) ||
      e.field_of_study.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Cari education..."
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
          Tambah Education
        </Button>
      </div>

      {/* Count */}
      {!isLoading && (
        <p className="text-xs text-muted-foreground">
          {search
            ? `${filtered.length} dari ${educations.length} education`
            : `${educations.length} education`}
        </p>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((education, index) => (
            <Card
              i={index}
              key={education.id}
              data={{
                id: education.id,
                title: education.institution,
                description: `${education.degree} - ${education.field_of_study}`,
                image_url: education.image_url,
              }}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              onEdit={() => onEdit(education)}
              onDelete={(id) => setDeleteId(id)}
              onViewDetail={() => onViewDetail(education)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            {search
              ? "Tidak ada education yang cocok"
              : "Belum ada education"}
          </p>
          {!search && (
            <Button
              size="sm"
              variant="outline"
              className="mt-3 gap-1.5 cursor-pointer"
              onClick={onAdd}
            >
              <PlusIcon className="size-3.5" />
              Tambah Education Pertama
            </Button>
          )}
        </div>
      )}

      {/* Delete confirm */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus education ini?</AlertDialogTitle>
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
