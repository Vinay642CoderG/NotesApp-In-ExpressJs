import { useEffect, useState, createContext } from "react";
import AddNoteForm from "./components/AddNoteForm";
import NoteCard from "./components/NoteCard";
import { IoReload } from "react-icons/io5";
import {AppContextProvider} from "./globalContext"


function App() {
  const [allnotes, setAllNotes] = useState([])
  const [refreshNotes, setRefreshNotes] = useState(Math.random())
  const getAllNotes = async ()=>{
    const apibase = "http://localhost:3000";
    fetch(`${apibase}/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((v)=>{
      return v.json();
    }).then((v)=>{
      setAllNotes(v)
    }).catch((e)=>{
      console.log("something went wrong.")
    })

  }

  useEffect(()=>{
    getAllNotes();
  }, [refreshNotes])

  return (
    <>
    <AppContextProvider value={{refreshNotes, setRefreshNotes}}>
      <div className="p-2">
        <h1 className="text-center border border-dark py-2 bg-primary text-white">Welcome to notes App</h1>
        <div className="container-fluid">
          <div className="row gap-md-0 gap-4">
            <div className="col-md-4 col-12 shadow">
              <AddNoteForm />
            </div>
            <div className="col-md-8 col-12 shadow">
              <h3>Your Notes:</h3>
              <div className="d-flex gap-2 flex-wrap w-100 justify-content-center justify-content-md-start">
                {
                  allnotes.map((v,i)=>{
                    return (
                      <NoteCard noteId={v.id} title={v.title} description={v.description} key={"noteskdk"+i} />
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContextProvider>
    </>
  );
}

export default App;
