import { FaTrash } from "react-icons/fa";
import { useAppContext } from "../globalContext";

const NoteCard = ({title="demo", description="demo", noteId = 0}) => {
  const {setRefreshNotes} = useAppContext();
  const deleteNote = async ()=>{
    const apibase = "http://localhost:3000";
    fetch(`${apibase}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((v)=>{
      alert("note is deleted.")
      setRefreshNotes(Math.random());
    }).catch((e)=>{
      console.log("something went wrong.")
    })

  }
  return (
    <div className="card shadow" style={{ width: "18rem", background: "#d9d942" }}>
      <div className="card-body">
        <h5 className="card-title d-flex gap-2 justify-content-between align-items-center">
          {title} <FaTrash onClick={deleteNote} type="button" className="text-danger" values={`${noteId}`} />
        </h5>
        <p className="card-text">
          {description}
        </p>
      </div>
    </div>
  );
};

export default NoteCard;
