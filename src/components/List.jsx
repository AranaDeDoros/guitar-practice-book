import React, { useState, useEffect, useRef, memo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { SongService } from "../service/SongService";
import { TabService } from "../service/TabService";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Player } from "./Player";
import { classNames } from "primereact/utils";
import { ProgressEnum } from "../enums/ProgressEnum";
import { Progress } from "./Progress";
import { TabContent } from "./TabContent";
import { ScrollTop } from "primereact/scrolltop";
import { Dropdown } from "primereact/dropdown";
import { SongCreateDTO } from "../dtos/SongCreateDTO";
import { SongDeleteDTO } from "../dtos/SongDeleteDTO";
import { SongUpdateDTO } from "../dtos/SongUpdateDTO";

const List = memo(() => {
  const [songs, setSongs] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);
  const [url, setUrl] = useState("");
  let emptySong = {
    id: null,
    title: "",
    artist: "",
    video: "",
    tab: {},
    progress: 0,
  };
  const [isNew, setIsNew] = useState(true);
  const [song, setSong] = useState(emptySong);
  const [songDialog, setSongDialog] = useState(false);
  const [deleteSongDialog, setDeleteSongDialog] = useState(false);
  const [deleteSongsDialog, setDeleteSongsDialog] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  useEffect(() => {
    SongService.getSongs().then((data) => setSongs(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openNew = () => {
    setSong(emptySong);
    setSubmitted(false);
    setSongDialog(true);
    setIsNew(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setSongDialog(false);
  };

  const hideDeleteSongDialog = () => {
    setDeleteSongDialog(false);
  };

  const hideDeleteSongsDialog = () => {
    setDeleteSongsDialog(false);
  };

  const saveSong = async () => {
    setSubmitted(true);

    if (song.title) {
      let _songs = [...songs];
      let _song = { ...song };

      if (song.id) {
        const index = findIndexById(song.id);

        _songs[index] = _song;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Song Updated",
          life: 3000,
        });
        //update
        const dto = {
          id: _song.id,
          progress: _song.progress,
        };
        try {
          const serv = await SongService.updateSong(dto);
          if (serv) {
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "Song Created",
              life: 3000,
            });
          }
        } catch (error) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 3000,
          });
        }
      } else {
        _song.id = createId();
        _songs.push(_song);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Song Created",
          life: 3000,
        });
        //create
        try {
          const dto = {
            title: _song.title,
            artist: _song.artist,
            video: _song.video,
            tab: _song.tab,
            progress: _song.progress,
          };

          const serv = await SongService.createSong(dto);
          if (serv) {
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "Song Created",
              life: 3000,
            });
          }
        } catch (error) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 3000,
          });
        }
      }

      setSongs(_songs);
      setSongDialog(false);
      setSong(emptySong);
    }
  };

  const editSong = (songToEdit) => {
    setIsNew(false);
    // Normalize progress to a number (if it was an object before)
    const progressValue =
      typeof songToEdit.progress === "number"
        ? songToEdit.progress
        : songToEdit.progress?.level?.value || 0;

    setSong({
      ...songToEdit,
      progress: progressValue,
    });

    setSongDialog(true);
  };

  const confirmDeleteSong = (song) => {
    setSong(song);
    setDeleteSongDialog(true);
  };

  const deleteSong = () => {
    let _songs = songs.filter((val) => val.id !== song.id);

    setSongs(_songs);
    setDeleteSongDialog(false);
    setSong(emptySong);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Song Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < songs.length; i++) {
      if (songs[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const confirmDeleteSelected = () => {
    setDeleteSongsDialog(true);
  };

  const deleteSelectedSongs = () => {
    let _songs = songs.filter((val) => !selectedSongs.includes(val));

    setSongs(_songs);
    setDeleteSongsDialog(false);
    setSelectedSongs(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Songs Deleted",
      life: 3000,
    });
  };

  const onartistChange = (e) => {
    let _song = { ...song };

    _song["artist"] = e.value;
    setSong(_song);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _song = { ...song };

    _song[`${name}`] = val;

    setSong(_song);
  };

  const onProgressChange = (e) => {
    setSong({
      ...song,
      progress: {
        level: e.value, // e.value is one of the ProgressEnum values
      },
    });
  };

  const onRowExpand = (event) => {
    toast.current.show({
      severity: "info",
      summary: "Song Expanded",
      detail: event.data.title,
      life: 3000,
    });
  };

  const onRowCollapse = (event) => {
    setUrl("");
    toast.current.show({
      severity: "success",
      summary: "Song Collapsed",
      detail: event.data.title,
      life: 3000,
    });
  };

  const expandAll = () => {
    let _expandedRows = {};

    songs.forEach((p) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editSong(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteSong(rowData)}
        />
      </React.Fragment>
    );
  };

  const songDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveSong} />
    </React.Fragment>
  );

  const deleteSongDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteSongDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSong}
      />
    </React.Fragment>
  );
  const deleteSongsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteSongsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedSongs}
      />
    </React.Fragment>
  );

  const [selectedProgress, setselectedProgress] = useState(null);
  const progresses = Object.values(ProgressEnum); // {value, label, color}

  const progressBodyTemplate = (rowData) => {
    console.log(rowData, "<rowdata");
    return <Progress level={rowData.progress} />;
  };

  const searchBodyTemplate = () => {
    return <Button icon="pi pi-search" />;
  };

  const artistBodyTemplate = (rowData) => {
    return rowData.artist;
  };

  const allowExpansion = (rowData) => {
    return rowData.tabs.length > 0;
  };

  const rowExpansionTemplate = (data) => {
    //tab endpoint
    const tabData = TabService.getTabData(data.tabUrl);
    return (
      <TabContent
        tabUrl={data.tabUrl}
        name={data.title}
        comment={data.comment}
        tabService={TabService}
      />
    );
  };
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
          className="btn"
          style={{ ...stylesheet.btn, ...stylesheet.new }}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          className="btn"
          style={{ ...stylesheet.btn, ...stylesheet.delete }}
          disabled={!selectedSongs || !selectedSongs.length}
        />
      </div>
    );
  };
  const header = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
      <Button
        icon="pi pi-minus"
        label="Collapse All"
        onClick={collapseAll}
        text
      />
    </div>
  );

  const onRowClick = (ev) => {
    setUrl("https://www.youtube.com/embed/R5MOaLXie2k?si=Z09jQzTiTKHuHT_w");
  };

  const onRowUnselect = (ev) => {
    setUrl("");
  };

  return (
    <>
      <ScrollTop />
      <div className="">
        {!!url ? <Player url={url} /> : <p>no video loaded</p>}
      </div>

      <div className="">
        <Toast ref={toast} />
        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

        <DataTable
          value={songs}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          onRowExpand={onRowExpand}
          onRowCollapse={onRowCollapse}
          onRowClick={onRowClick}
          onRowUnselect={onRowUnselect}
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="id"
          header={header}
          tableStyle={{ minWidth: "60rem" }}
          selection={selectedSongs}
          onSelectionChange={(e) => setSelectedSongs(e.value)}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} songs"
          globalFilter={globalFilter}
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column expander={true} />
          <Column field="title" header="Title" sortable />
          <Column
            field="artist"
            header="Artist"
            sortable
            body={artistBodyTemplate}
          />
          <Column
            field="progress"
            header="Progress"
            sortable
            body={progressBodyTemplate}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
        <Dialog
          visible={songDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Song Details"
          modal
          className="p-fluid"
          footer={songDialogFooter}
          onHide={hideDialog}
        >
          <div className="field">
            <label htmlFor="name" className="font-bold">
              Title
            </label>
            <InputText
              id="name"
              value={song.title}
              onChange={(e) => onInputChange(e, "name")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !song.title,
              })}
            />
            {submitted && !song.title && (
              <small className="p-error">Name is required.</small>
            )}
          </div>

          <div className="field">
            <label className="mb-3 font-bold">Artist</label>
            <InputText
              id="artist"
              value={song.artist}
              onChange={(e) => onInputChange(e, "name")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !song.artist,
              })}
            />
          </div>

          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="progress" className="font-bold">
                Progress
              </label>
              <div>
                <Dropdown
                  disabled={isNew}
                  value={song.progress}
                  onChange={(e) => setSong({ ...song, progress: e.value })}
                  options={progresses}
                  optionLabel="label"
                  optionValue="value" // 👈 makes it easier to bind to a number
                  placeholder="Select a level"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
          </div>
        </Dialog>

        <Dialog
          visible={deleteSongDialog}
          style={{ width: "24rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirm"
          modal
          footer={deleteSongDialogFooter}
          onHide={hideDeleteSongDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {song && (
              <span>
                Are you sure you want to delete <b>{song.title}</b>?
              </span>
            )}
          </div>
        </Dialog>

        <Dialog
          visible={deleteSongsDialog}
          style={{ width: "24rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirm"
          modal
          footer={deleteSongsDialogFooter}
          onHide={hideDeleteSongsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {song && (
              <span>Are you sure you want to delete the selected songs?</span>
            )}
          </div>
        </Dialog>
      </div>
    </>
  );
});

const stylesheet = {
  btn: {
    padding: "10px",
    fontSize: "1rem",
  },
  new: {
    backgroundColor: "#25788f",
    border: "1px solid #25788f",
  },
  delete: {
    backgroundColor: "#ef4444",
  },
};
export default List;
