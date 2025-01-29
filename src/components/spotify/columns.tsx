import { ColumnDef } from "@tanstack/react-table";

export type SpotifyTrack = {
  id: number,
  name: string,
  artist: string,
  album: string,
  image: string,
}

export const columns: ColumnDef<SpotifyTrack>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "artist",
    header: "Artist",
  },
]