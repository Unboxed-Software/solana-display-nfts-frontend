import { FC, useState, useEffect, useRef } from "react"

export interface Props {
  nft: any
}

export const DisplayNft: FC<Props> = (props) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      let fetchResult = await fetch(props.nft.uri)
      let json = await fetchResult.json()
      setData(json)
    }
    fetchData()
  }, [props])

  return (
    <div>
      {data && (
        <div className="flex flex-col items-center justify-center p-5">
          <img src={data.image} />
          <ul>{data.name}</ul>
        </div>
      )}
    </div>
  )
}
