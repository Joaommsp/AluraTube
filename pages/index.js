import config from '../config.json'
import styled from 'styled-components'
import { CSSReset } from '../src/components/CSSReset'
import Menu from '../src/components/Menu'
import { StyledTimeline } from '../src/components/Timeline'

function HomePage() {
  // console.log(config.playlist)

  const estilosDaHomePage = {}
  return (
    <>
      <CSSReset />
      <div style={estilosDaHomePage}>
        <Menu />
        <Header></Header>
        <Timeline playlist={config.playlist}></Timeline>
      </div>
    </>
  )
}

export default HomePage

// function Menu() {
//   return <div>Menu</div>
// }

const StyledHeader = styled.div`
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

function Header() {
  return (
    <StyledHeader>
      {/* <img src="banner" /> */}
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

function Timeline(propriedades) {
  // console.log('Dentro do componente', propriedades)

  const playlistName = Object.keys(propriedades.playlist)
  // statement
  // retorno pro expressão
  return (
    <StyledTimeline>
      {playlistName.map(playlistName => {
        const videos = propriedades.playlist[playlistName]
        console.log(playlistName)
        console.log(videos)
        return (
          <section>
            <h2>{playlistName}</h2>
            <div>
              {videos.map(video => {
                return (
                  <a href={video.url}>
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
