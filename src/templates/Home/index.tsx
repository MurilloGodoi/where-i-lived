import { NextSeo } from 'next-seo'

import dynamic from 'next/dynamic'
import { InfoOutline } from '@styled-icons/evaicons-outline/InfoOutline'

import LinkWrapper from 'components/LinkWrapper'
import { MapProps } from 'components/Map'

const Map = dynamic(() => import('components/Map'), {
  ssr: false
})

export default function HomeTemplate({ places }: MapProps) {
  return (
    <>
      <NextSeo
        title="Cities Where I`ve Lived"
        description="A simple project to show cities where i've lived."
        canonical=""
        openGraph={{
          url: '',
          title: 'Cities Where I`ve Lived',
          description: 'Cities Where I`ve Lived',
          images: [
            {
              url: 'https://my-trips.willianjusten.com.br/img/cover.png',
              width: 1280,
              height: 720,
              alt: 'Cities Where I`ve Lived'
            }
          ],
          site_name: 'Cities Where I`ve Lived'
        }}
      />
      <LinkWrapper href="/about">
        <InfoOutline size={32} aria-label="About" />
      </LinkWrapper>
      <Map places={places} />
    </>
  )
}
