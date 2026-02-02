import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Transition } from "@headlessui/react";
import { MusicalNoteIcon, SlashIcon } from "@heroicons/react/24/solid";
import { JSX } from "react";
import CatalogueSelect from "../components/CatalogueSelect";
import { Song, SongOption } from "../types/Session";
export default function SessionForm(): JSX.Element {
  const [sessionName, setSessionName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const sessionNameRef = useRef<HTMLInputElement>(null);
  const { data: songs, isLoading } = { data: [], isLoading: false }; //useSongs(token);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const defaultObj = {
    name: "",
    description: "",
    songs: [],
  };
  const [formData, setFormData] = useState(defaultObj);
  useEffect(() => {
    if (sessionNameRef.current) {
      sessionNameRef.current.focus();
    }
  }, []);

  const songSelectMapper: (song: Song) => SongOption = useCallback(
    (song: Song) => ({
      value: song.id,
      label: song.title,
    }),
    [],
  );

  const songOptions = useMemo(() => {
    if (!songs) return [];
    return songs.map(songSelectMapper);
  }, [songs, songSelectMapper]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <form
        className="
          bg-slate-200 shadow-md rounded-lg
          p-6 w-80 max-w-md max-h-md overflow-y-auto
          flex flex-col items-center justify-between

        "
      >
        <div className="mb-4 flex justify-center">
          <strong className="text-lg font-semibold text-gray-700">
            Create New Session
          </strong>
        </div>
        {/* sessionName */}
        <div className="mb-3 w-full">
          <div className="relative">
            <MusicalNoteIcon className="size-6 text-sky-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={sessionNameRef}
              type="text"
              autoComplete="sessionName"
              placeholder="sessionName"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              className="
                  w-full border border-gray-400 rounded-md
                  p-2 pl-12
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                "
              required
            />
          </div>
        </div>

        {/* description */}
        <div className="mb-4 w-full">
          <div className="relative">
            <SlashIcon className="size-6 text-sky-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <textarea
              autoComplete="current-description"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="
                w-full min-h-[140px] resize-y
                border border-gray-400 rounded-md
                p-2 pl-12
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              "
              required
            />
          </div>
        </div>

        <div className="mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Songs
          </label>
          <CatalogueSelect
            catalog={songOptions}
            isLoading={isLoading}
            value={selectedSongs}
            onChange={(values) => {
              setSelectedSongs(values);
              setFormData((prev) => ({
                ...prev,
                songs: values.map((v: SongOption) => v.value),
              }));
            }}
            placeholder="Add songs..."
            isMulti={true}
          />
        </div>

        {/* Error message */}
        <Transition
          show={!!error}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="mb-3 text-sm text-red-600 text-center">{error}</div>
        </Transition>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full py-2 rounded-md font-semibold text-white
            bg-gradient-to-r from-green-500 to-cyan-500
            hover:from-green-600 hover:to-cyan-600
            transition-all shadow-md hover:shadow-lg
            active:scale-[0.98]
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
