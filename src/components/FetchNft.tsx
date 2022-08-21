import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js"
import { FC, useEffect, useState } from "react"
import { DisplayNft } from "components/DisplayNft"
import styles from "../styles/custom.module.css"

export const FetchNft: FC = () => {
  const [nftData, setNftData] = useState(null)

  const { connection } = useConnection()
  const wallet = useWallet()

  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet))

  const fetchNfts = async () => {
    if (!wallet.connected) {
      return
    }

    const nfts = await metaplex
      .nfts()
      .findAllByOwner({ owner: wallet.publicKey })
      .run()

    setNftData(nfts)
    console.log(nfts[0])
  }

  useEffect(() => {
    fetchNfts()
  }, [wallet])

  return (
    <div>
      {nftData && (
        <div className={styles.gridNFT}>
          {Object.keys(nftData).map((key) => {
            return <DisplayNft key={key} nft={nftData[key]} />
          })}
        </div>
      )}
    </div>
  )
}
