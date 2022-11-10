import React from "react"
import config from "../config.json"
import styled from "styled-components"
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/Timeline"

function HomePage() {
  // console.log(config.playlist)

  const estilosDaHomePage = {}
  const [valorDoFiltro, setvalorDoFiltro] = React.useState("")

  return (
    <>
      <div style={estilosDaHomePage}>
        {/* Prop Driling */}
        <Menu
          valorDoFiltro={valorDoFiltro}
          setvalorDoFiltro={setvalorDoFiltro}
        />
        <Header></Header>
        <Timeline
          searchValue={valorDoFiltro}
          playlist={config.playlist}
        ></Timeline>
      </div>
    </>
  )
}

export default HomePage

// function Menu() {
//   return <div>Menu</div>
// }

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`

const StyledBanner = styled.div`
  background-image: url(${config.bg});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 230px;
`
function Header() {
  return (
    <StyledHeader>
      <StyledBanner />
      <section className="user-info">
        <img src={`https://github.com/${config.gihub}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({ searchValue, ...propriedades }) {
  // console.log('Dentro do componente', propriedades)

  const playlistName = Object.keys(propriedades.playlist)
  // statement
  // retorno pro expressão
  return (
    <StyledTimeline>
      {playlistName.map(playlistName => {
        const videos = propriedades.playlist[playlistName]
        // console.log(playlistName)
        // console.log(videos)
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter(video => {
                  const titleNormalized = video.title.toLowerCase()
                  const searchValueNormalized = searchValue.toLowerCase()
                  return titleNormalized.includes(searchValueNormalized)
                })
                .map(video => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  )
                })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}
