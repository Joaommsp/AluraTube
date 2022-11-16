import React from "react"
import { StyledRegisterVideo } from "./styles"
import { createClient } from "@supabase/supabase-js"

function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues)
  return {
    values,
    handleChange: evento => {
      const value = evento.target.value
      const name = evento.target.name
      setValues({ ...values, [name]: value })
    },
    clearForm() {
      setValues({})
    }
  }
}

const PROJECT_URL = "https://hhleqygxeugufybvqzwn.supabase.co"
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhobGVxeWd4ZXVndWZ5YnZxenduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg1NTc0MzAsImV4cCI6MTk4NDEzMzQzMH0.CD8yXPcMxhaKpVKaMnAKkENFbAMmBQcu_r6xlesXn1U"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)
console.log()

// get youtube thumb
function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: {
      titulo: "Forza Horizon 5 Launcher Trailer",
      url: "https://www.youtube.com/watch?v=Rv7xLt5yNsM"
    }
  })
  const [formVisivel, setFormVisivel] = React.useState(false)

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {/* Ternário */}
      {/* Operadores de curto-circuito*/}
      {formVisivel ? (
        <form
          onSubmit={evento => {
            evento.preventDefault()
            console.log(formCadastro.values)

            // contato entre o front e o back end
            supabase
              .from("video")
              .insert({
                title: formCadastro.values.titulo,
                url: formCadastro.values.url,
                thumb: getThumbnail(formCadastro.values.url),
                playlist: "jogos"
              })
              .then(oqueveio => {
                console.log(oqueveio)
              })
              .catch(err => {
                console.log(err)
              })

            setFormVisivel(false)
            formCadastro.clearForm()
          }}
        >
          <div>
            <button
              className="close-modal"
              onClick={() => setFormVisivel(false)}
            >
              X
            </button>
            <input
              placeholder="Titulo do Video"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />
            <input
              placeholder="URL"
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : null}
    </StyledRegisterVideo>
  )
}
