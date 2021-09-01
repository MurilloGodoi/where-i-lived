import { MapContainer, TileLayer, Marker, MapConsumer } from 'react-leaflet'
import { useRouter } from 'next/router'

import * as S from './styles'

type Place = {
  id: string
  name: string
  slug: string
  location: {
    latitude: number
    longitude: number
  }
}

export type MapProps = {
  places?: Place[]
}

const CustomTileLayer = () => {
  return (
    <TileLayer
      attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      url={`https://api.mapbox.com/styles/v1/willianjusten/ckljudsv419nq17p6n72fbz4l.html?fresh=true&title=copy&access_token=pk.eyJ1Ijoid2lsbGlhbmp1c3RlbiIsImEiOiJja2xqdWFrYWEwYnMzMnhxZmhiZnFuY2JpIn0.Pq9kgfH3VMzdWdT-KAXXYw#1.91/40.81/4.92`}
    />
  )
}

const Map = ({ places }: MapProps) => {
  const router = useRouter()

  return (
    <S.MapWrapper>
      <MapContainer
        center={[0, 0]}
        zoom={3}
        minZoom={3}
        maxBounds={[
          [-180, 180],
          [180, -180]
        ]}
        style={{ height: '100%', width: '100%' }}
      >
        <MapConsumer>
          {(map) => {
            const width =
              window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth

            if (width < 768) {
              map.setMinZoom(2)
            }

            return null
          }}
        </MapConsumer>
        <CustomTileLayer />

        {places?.map(({ id, name, slug, location }) => {
          const { latitude, longitude } = location

          return (
            <Marker
              key={`place-${id}`}
              position={[latitude, longitude]}
              title={name}
              eventHandlers={{
                click: () => {
                  router.push(`place/${slug}`)
                }
              }}
            />
          )
        })}
      </MapContainer>
    </S.MapWrapper>
  )
}

export default Map
